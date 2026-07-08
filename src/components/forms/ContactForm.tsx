"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormState {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.organization.trim()) errors.organization = "Organization is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!values.message.trim()) errors.message = "Message is required";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = React.useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setValues(INITIAL_STATE);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-6 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        <p className="text-lg font-semibold text-foreground">Message Sent</p>
        <p className="max-w-sm text-sm text-foreground-secondary">
          Thank you for reaching out. Our team will get back to you within 1-2 business days.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-accent">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={values.organization}
            onChange={handleChange("organization")}
            aria-invalid={!!errors.organization}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            autoComplete="organization"
          />
          {errors.organization && (
            <p id="organization-error" className="text-xs text-accent">
              {errors.organization}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-accent">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          rows={5}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-accent">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
