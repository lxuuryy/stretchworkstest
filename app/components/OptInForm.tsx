import Script from "next/script";

type OptInFormProps = {
  /** GoHighLevel form id, e.g. "1s5RE0ZUNOV0yCbUIhAS" */
  formId: string;
  /** GoHighLevel form name, used for the data-form-name attribute */
  formName: string;
  /** Default/initial height in px before the embed script resizes the iframe */
  height?: number;
};

// Embeds a GoHighLevel (go.acr.fit) inline opt-in form. The form_embed.js
// script auto-resizes the iframe to fit its content via postMessage; the
// wrapper minHeight keeps it visible before that runs. next/script dedupes by
// src, so loading it on multiple pages only fetches once.
export default function OptInForm({ formId, formName, height = 460 }: OptInFormProps) {
  return (
    <div style={{ minHeight: height }}>
      <iframe
        src={`https://go.acr.fit/widget/form/${formId}`}
        style={{ width: "100%", height: "100%", border: "none", borderRadius: "10px" }}
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
