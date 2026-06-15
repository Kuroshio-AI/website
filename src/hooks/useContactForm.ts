import { useCallback, useState } from "react";
import type { FormEvent } from "react";

export interface UseContactFormResult {
  readonly submitted: boolean;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useContactForm(): Readonly<UseContactFormResult> {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }, []);

  return { submitted, handleSubmit };
}
