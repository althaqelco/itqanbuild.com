"use client";

import { useState } from "react";
import { Send, User, Phone, MapPin, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { SITE, SERVICES_LIST, DISTRICTS_LIST } from "@/lib/constants";

type FormState = {
  name: string;
  phone: string;
  service: string;
  district: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const SAUDI_PHONE_REGEX = /^(\+?966|0)?5\d{8}$/;

/**
 * ContactForm — React form with Saudi phone validation
 * Submission strategy: builds detailed WhatsApp message — guarantees lead delivery
 * GA event fires on successful submit (calculator_used pattern)
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    service: "",
    district: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (form.name.trim().length < 3) next.name = "الاسم يجب أن يكون ٣ أحرف على الأقل";
    const phoneNormalized = form.phone.replace(/\s|-/g, "");
    if (!SAUDI_PHONE_REGEX.test(phoneNormalized))
      next.phone = "رقم سعودي صحيح يبدأ بـ 05 أو +966 (مثال: 0501234567)";
    if (!form.service) next.service = "اختر الخدمة المطلوبة";
    if (form.message.trim().length < 10)
      next.message = "تفاصيل المشروع — ١٠ أحرف على الأقل";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // GA4 lead-capture event
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "form_submit", {
        event_category: "Lead",
        event_label: "contact_form",
        service_type: form.service,
        district: form.district || "unspecified",
      });
    }

    // Build WhatsApp message with all form data
    const serviceLabel =
      SERVICES_LIST.find((s) => s.key === form.service)?.h1.split("—")[0].trim() ||
      form.service;
    const districtLabel =
      DISTRICTS_LIST.find((d) => d.slug === form.district)?.name || form.district || "—";

    const text = encodeURIComponent(
      `طلب عرض سعر جديد:\n\n` +
        `الاسم: ${form.name}\n` +
        `الهاتف: ${form.phone}\n` +
        `الخدمة: ${serviceLabel}\n` +
        `الحي: ${districtLabel}\n\n` +
        `التفاصيل:\n${form.message}`
    );

    const url = `https://wa.me/${SITE.whatsapp}?text=${text}`;

    setTimeout(() => {
      setStatus("success");
      window.open(url, "_blank");
    }, 400);
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: "rgba(39,174,96,0.05)",
          border: "1px solid rgba(39,174,96,0.15)",
        }}
      >
        <CheckCircle2
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: "var(--color-success)" }}
        />
        <h3 className="text-xl font-bold mb-2">تم استلام طلبك</h3>
        <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.65)" }}>
          فتحنا واتساب لك تلقائياً — أرسل الرسالة وسنرد خلال ١٥ دقيقة
        </p>
        <button
          onClick={() => {
            setForm({ name: "", phone: "", service: "", district: "", message: "" });
            setStatus("idle");
          }}
          className="text-xs font-semibold"
          style={{ color: "var(--color-gold-dark)" }}
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 md:p-8 space-y-5"
      style={{
        background: "var(--color-pearl-warm)",
        border: "1px solid rgba(10,25,47,0.06)",
      }}
      noValidate
    >
      <Field
        label="الاسم الكامل"
        icon={<User className="w-4 h-4" />}
        error={errors.name}
      >
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="مثال: أحمد محمد"
          className="w-full bg-transparent outline-none text-sm py-2"
        />
      </Field>

      <Field
        label="رقم الجوال (سعودي)"
        icon={<Phone className="w-4 h-4" />}
        error={errors.phone}
      >
        <input
          type="tel"
          dir="ltr"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="05XXXXXXXX"
          className="w-full bg-transparent outline-none text-sm py-2"
        />
      </Field>

      <Field
        label="الخدمة المطلوبة"
        icon={<MessageSquare className="w-4 h-4" />}
        error={errors.service}
      >
        <select
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className="w-full bg-transparent outline-none text-sm py-2"
        >
          <option value="">اختر الخدمة...</option>
          {SERVICES_LIST.map((s) => (
            <option key={s.key} value={s.key}>
              {s.h1.split("—")[0].trim()}
            </option>
          ))}
        </select>
      </Field>

      <Field label="الحي في جدة (اختياري)" icon={<MapPin className="w-4 h-4" />}>
        <select
          value={form.district}
          onChange={(e) => update("district", e.target.value)}
          className="w-full bg-transparent outline-none text-sm py-2"
        >
          <option value="">اختر الحي...</option>
          {DISTRICTS_LIST.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="تفاصيل المشروع" error={errors.message}>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="صف مشروعك بإيجاز — المساحة، المكان، الجدول الزمني المتوقع..."
          className="w-full bg-transparent outline-none text-sm py-2 resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full justify-center"
      >
        {status === "submitting" ? "جاري الإرسال..." : "أرسل الطلب"}
        <Send className="w-4 h-4" />
      </button>

      <p className="text-xs text-center" style={{ color: "rgba(10,25,47,0.45)" }}>
        بضغطك على «أرسل الطلب» نفتح واتساب لتأكيد الإرسال — معاينة مجانية + رد خلال ١٥ دقيقة.
      </p>
    </form>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 rounded-xl"
        style={{
          background: "white",
          border: `1px solid ${error ? "var(--color-danger)" : "rgba(10,25,47,0.08)"}`,
        }}
      >
        {icon && (
          <span className="shrink-0" style={{ color: "var(--color-gold-dark)" }}>
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && (
        <div
          className="mt-1.5 flex items-center gap-1 text-xs"
          style={{ color: "var(--color-danger)" }}
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}
