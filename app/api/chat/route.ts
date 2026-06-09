import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, tool, UIMessage, convertToModelMessages, stepCountIs } from "ai";

const anthropic = createAnthropic({
  apiKey: "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",
});
import { z } from "zod";

const consultationTool = tool({
  description:
    "Set up a consultation booking for a StretchWorks session. Call this when the person is ready to book or wants to lock in a time.",
  inputSchema: z.object({
    name: z.string().describe("Full name of the client"),
    email: z.string().email().describe("Email address"),
    phone: z.string().optional().describe("Phone number (optional)"),
    concern: z
      .string()
      .describe("Primary area or concern — e.g. hip tightness, post-surgery, morning stiffness"),
    preferredTime: z
      .enum(["morning", "midday", "afternoon", "flexible"])
      .describe("Preferred time of day"),
    sessionType: z
      .enum(["athletic", "recovery", "healthy-ageing", "general"])
      .describe("Which type of session best fits the client"),
  }),
  execute: async ({ name, email, concern, preferredTime, sessionType }) => {
    // Dummy — in production this would hit a CRM / booking system
    const refCode = `SW-${Date.now().toString(36).toUpperCase()}`;
    return {
      success: true,
      refCode,
      name,
      email,
      concern,
      preferredTime,
      sessionType,
      message: `Consultation locked in for ${name}. A team member will reach out to ${email} within 24 hours to confirm your time.`,
    };
  },
});

export async function POST(req: Request) {
  const body = await req.json();
  const messages: UIMessage[] = Array.isArray(body.messages) ? body.messages : [];
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: `You are a session advisor for StretchWorks, a boutique assisted stretching studio in Black Rock, Melbourne.

Your job is to have a warm, natural conversation that helps people figure out which session is right for them — and, when they're ready, collect their details to set up a consultation.

StretchWorks offers three main session types:
- Athletic Performance — for active people, athletes, and anyone training hard who wants to recover faster and move better
- Recovery & Injury Support — for people rebuilding after injury, surgery, illness, or extended inactivity
- 50–60 Stiffness & Healthy Ageing — for people in their 50s and 60s dealing with morning stiffness, reduced range, or wanting to stay active longer

All sessions are 1-on-1, 60 minutes, start with a HumanTrak mobility assessment on the first visit, and the studio is at 303B Beach Road, Black Rock. Hours: Mon–Thu 6am–7pm, Fri 6am–4pm, Sat 7am–3pm, closed Sunday. Phone: 0493 720 274.

Guidelines:
- Don't introduce yourself as an AI. Just be helpful and conversational, like a knowledgeable person at the studio.
- Ask one or two questions at a time, not a long list.
- When someone describes their situation, reflect it back and explain which session type makes sense for them.
- Once they seem interested in booking, naturally ask for their name, email, preferred time, and confirm the session type — then use the setup_consultation tool.
- Keep responses concise. No long paragraphs. Use short punchy lines.
- Never say "As an AI" or "I'm a language model" or anything like that.
- If someone asks about pricing or availability specifics, let them know a team member will confirm those details.`,
    messages: modelMessages,
    tools: { setup_consultation: consultationTool },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
