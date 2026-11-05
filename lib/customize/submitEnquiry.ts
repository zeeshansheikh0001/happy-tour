import { CustomizeEnquiryPayload } from './model';

/**
 * Enquiry API contract.
 *
 * POST {NEXT_PUBLIC_ENQUIRY_API_URL}
 * Content-Type: application/json
 * Body: CustomizeEnquiryPayload
 *
 * Success: HTTP 2xx and a JSON body that is not `{ "ok": false }`.
 * The website does not invent a booking reference. A successful response
 * only means the enquiry was received.
 *
 * Failure: any non-2xx response, a network error, or a body `{ "ok": false, "message"?: string }`.
 *
 * When NEXT_PUBLIC_ENQUIRY_API_URL is unset, submitCustomizeEnquiry returns
 * `unconfigured` and the form must stay editable. Do not treat that as success.
 */
export interface EnquirySubmitResult {
  ok: boolean;
  error?: 'unconfigured' | 'network' | 'rejected';
  message?: string;
}

export async function submitCustomizeEnquiry(payload: CustomizeEnquiryPayload): Promise<EnquirySubmitResult> {
  const url = process.env.NEXT_PUBLIC_ENQUIRY_API_URL;
  if (!url) {
    return {
      ok: false,
      error: 'unconfigured',
      message: 'The enquiry service is not connected yet. Your details are still on this page.',
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
    if (!response.ok || body?.ok === false) {
      return {
        ok: false,
        error: 'rejected',
        message: body?.message || 'The enquiry was not accepted. You can try again.',
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'network',
      message: 'We could not reach the enquiry service. Your details are still on this page.',
    };
  }
}
