import type { FormEvent } from "react";
import { useCallback, useState } from "react";

import { send } from "@emailjs/browser";

const CONTACT_FORM_RECIPIENTS = ["info@kuroshioai.com", "noufal@kuroshioai.com"] as const;

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

function getFormValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
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
    const company = getFormValue(formData, "company");
    const email = getFormValue(formData, "email");
    const industry = getFormValue(formData, "industry");
    const message = getFormValue(formData, "message");
    const name = getFormValue(formData, "name");
    const phone = getFormValue(formData, "phone");
    const region = getFormValue(formData, "region");
    const role = getFormValue(formData, "role");

    setStatus("sending");

    try {
      await send(
        serviceId,
        templateId,
        {
          company,
          company_name: company,
          country: region,
          designation_role: role,
          email,
          from_name: name,
          industry,
          message,
          name,
          phone,
          phone_number: phone,
          reply_to: email,
          role,
          time: new Date().toLocaleString(),
          title: "Website contact form",
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
