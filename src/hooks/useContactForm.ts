import type { FormEvent } from "react";
import { useCallback, useState } from "react";

import { send } from "@emailjs/browser";

const CONTACT_FORM_RECIPIENTS = ["info@kuroshioai.ae"] as const;

const FAILURE_MESSAGE = "Something went wrong. Please email us directly at info@kuroshioai.ae";
const SUCCESS_MESSAGE = "Thank you. We will contact you within 24 hours.";

type ContactFormStatus = "idle" | "sending" | "success" | "error";

export interface UseContactFormResult {
  readonly errorMessage: string;
  readonly submitted: boolean;
  readonly status: ContactFormStatus;
  readonly successMessage: string;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useContactForm(): Readonly<UseContactFormResult> {
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      await send(
        serviceId,
        templateId,
        {
          company_name: formData.get("company") ?? "",
          country: formData.get("region") ?? "",
          designation_role: formData.get("role") ?? "",
          from_name: formData.get("name") ?? "",
          industry: formData.get("industry") ?? "",
          message: formData.get("message") ?? "",
          phone_number: formData.get("phone") ?? "",
          reply_to: formData.get("email") ?? "",
          to_email: CONTACT_FORM_RECIPIENTS.join(", "),
          to_emails: CONTACT_FORM_RECIPIENTS.join(", "),
        },
        { publicKey }
      );

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }, []);

  return {
    errorMessage: FAILURE_MESSAGE,
    submitted: status === "success",
    status,
    successMessage: SUCCESS_MESSAGE,
    handleSubmit,
  };
}
