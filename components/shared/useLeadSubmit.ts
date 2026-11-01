"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface LeadError {
  message: string;
  /** Present when the server could not deliver the lead — offer WhatsApp instead. */
  whatsapp?: string;
}

/**
 * Shared submit logic for the lead forms: posts JSON to `endpoint`, adds the page path and
 * the time since the form appeared (used server-side as a bot trap), and tracks status/errors.
 */
export function useLeadSubmit(endpoint: string, buildPayload: (form: FormData) => Record<string, unknown>) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<LeadError | null>(null);
  const shownAt = useRef(0);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("loading");
    setError(null);

    const payload = {
      ...buildPayload(new FormData(formEl)),
      page: window.location.pathname + window.location.search,
      elapsedMs: Date.now() - shownAt.current,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError({ message: data?.error || "Something went wrong. Please try again.", whatsapp: data?.whatsapp });
        return;
      }
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
      setError({ message: "Could not reach our server. Please check your connection and try again." });
    }
  }

  return { status, error, handleSubmit };
}
