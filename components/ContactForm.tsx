"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SITE_EMAIL } from "@/lib/site";
import { submitNetlifyForm } from "@/lib/submitNetlifyForm";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) {
      router.push("/thank-you");
      return;
    }

    const payload = {
      fullName: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      formType: "contact" as const,
      description: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        try {
          await submitNetlifyForm("contact", {
            name: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            message: payload.description,
          });
        } catch {
          // Netlify form is secondary; don't block the visitor.
        }

        router.push("/thank-you");
        return;
      }

      let message = "There was a problem submitting your enquiry.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data.error) message = data.error;
      } catch {
        /* ignore */
      }
      setErrorMessage(message);
      setStatus("error");
    } catch {
      setErrorMessage("Network error. Please try again or email us directly.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full min-h-11 border border-border bg-white px-3 py-2 text-body focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form
      name="contact"
      method="POST"
      action="/__forms.html"
      onSubmit={handleSubmit}
      className="max-w-lg space-y-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this out:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div>
        <label htmlFor="name" className={labelClass}>
          Full name *
        </label>
        <input type="text" id="name" name="name" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input type="email" id="email" name="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input type="tel" id="phone" name="phone" autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Brief case notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} min-h-[100px]`}
          placeholder="Practice area, timeline, or anything we should know"
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="text-sm text-highlight" role="alert">
          {errorMessage ?? "There was a problem submitting your enquiry."} Email us at {SITE_EMAIL}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 w-full items-center justify-center bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
