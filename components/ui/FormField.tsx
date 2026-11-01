"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
}

type InputProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"input">, "id"> & { as?: "input" };

type TextareaProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"textarea">, "id"> & { as: "textarea" };

type SelectProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"select">, "id"> & { as: "select" };

type FormFieldProps = InputProps | TextareaProps | SelectProps;

/**
 * Label + input/textarea/select pair with a guaranteed-unique id via useId(), so the
 * same field name can appear in multiple forms on one page (e.g. "email" in
 * both the contact form and the footer newsletter form) without colliding —
 * the old site shipped duplicate id="Input" attributes across its forms.
 */
export function FormField({ label, error, hint, className, ...props }: FormFieldProps) {
  const generatedId = useId();
  const id = `${generatedId}-${"name" in props ? props.name : "field"}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {props.required ? <span aria-hidden="true" className="text-accent-600"> *</span> : null}
      </label>
      {props.as === "select" ? (
        <select
          id={id}
          className="field-input"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(props as ComponentPropsWithoutRef<"select">)}
        />
      ) : props.as === "textarea" ? (
        <textarea
          id={id}
          className="field-input min-h-32 resize-y"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input
          id={id}
          className="field-input"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(props as ComponentPropsWithoutRef<"input">)}
        />
      )}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
