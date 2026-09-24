"use client";

import { FormEvent, useState } from "react";
import ScrollReveal from "./ScrollReveal";

type FormErrors = {
  name?: string;
  email?: string;
  whatsapp?: string;
};

type FormData = {
  name: string;
  email: string;
  whatsapp: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidWhatsApp(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(cleaned);
}

export default function OrderForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(data: FormData): FormErrors {
    const next: FormErrors = {};

    if (!data.name.trim()) {
      next.name = "Please share your name.";
    }

    if (!data.email.trim()) {
      next.email = "Please add your email.";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      next.email = "That email doesn't look quite right.";
    }

    if (!data.whatsapp.trim()) {
      next.whatsapp = "We'll need your WhatsApp number for delivery updates.";
    } else if (!isValidWhatsApp(data.whatsapp)) {
      next.whatsapp =
        "Enter a valid WhatsApp number with country code (e.g. +92 3XX XXXXXXX).";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmitError(
          data?.error ??
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", whatsapp: "" });
    } catch {
      setSubmitError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (submitError) setSubmitError(null);
    if (submitted) setSubmitted(false);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl bg-primary-light px-5 py-8 text-center"
        role="status"
      >
        <p className="font-heading text-xl font-bold text-primary-dark">
          You&apos;re all set!
        </p>
        <p className="mt-2 text-text-muted">
          Check your email/WhatsApp — payment details are on their way!
        </p>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Field
          id="order-name"
          label="Your name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Ayesha Khan"
          value={form.name}
          error={errors.name}
          disabled={isSubmitting}
          onChange={(value) => updateField("name", value)}
        />

        <Field
          id="order-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={form.email}
          error={errors.email}
          disabled={isSubmitting}
          onChange={(value) => updateField("email", value)}
        />

        <Field
          id="order-whatsapp"
          label="WhatsApp number"
          type="tel"
          autoComplete="tel"
          placeholder="+92 3XX XXXXXXX"
          value={form.whatsapp}
          error={errors.whatsapp}
          disabled={isSubmitting}
          onChange={(value) => updateField("whatsapp", value)}
        />

        {submitError ? (
          <p
            className="rounded-xl bg-secondary-light px-4 py-3 text-sm text-secondary-dark"
            role="alert"
          >
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-secondary px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Reserving your copy…" : "Reserve My Copy"}
        </button>

        <p className="text-center text-sm leading-relaxed text-text-muted">
          No payment on this page. After you reserve, we&apos;ll email private
          payment instructions — bank transfer or JazzCash / Easypaisa.
        </p>
      </form>
    </ScrollReveal>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function Field({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  autoComplete,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-text"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-text outline-none transition placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70 ${
          error
            ? "border-secondary focus:border-secondary"
            : "border-border focus:border-primary"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-secondary-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}
