import Script from "next/script";

type OptInFormProps = {
  /** GoHighLevel form id, e.g. "1s5RE0ZUNOV0yCbUIhAS" */
  formId: string;
  /** GoHighLevel form name, used for the data-form-name attribute */
  formName: string;
  /** Initial reserved height in px. Set close to the form's real height so the
   *  embed script barely reflows (a big reflow makes anchor scrolls overshoot). */
  height?: number;
};

// Embeds a GoHighLevel (go.acr.fit) inline opt-in form. The form_embed.js
// script auto-resizes the iframe to fit its content via postMessage. We give
// the iframe an explicit (not percentage) starting height so layout is stable
// before that runs. next/script dedupes by src, so it only loads once.
export default function OptInForm({ formId, formName, height = 700 }: OptInFormProps) {
  return (
    <div>
      <iframe
        src={`https://go.acr.fit/widget/form/${formId}`}
        style={{ width: "100%", height: `${height}px`, border: "none", borderRadius: "10px", display: "block" }}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={formName}
      />
      <Script src="https://go.acr.fit/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
