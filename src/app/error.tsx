"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      id="main"
      dir="rtl"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1rem",
        background: "linear-gradient(165deg, var(--color-navy-dark), var(--color-navy))",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "36rem" }}>
        <h1 style={{ color: "var(--color-pearl)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>
          حدث خطأ غير متوقع
        </h1>
        <p style={{ color: "rgba(248,246,240,0.65)", marginBottom: "2rem", lineHeight: 1.8 }}>
          نعتذر — واجهنا مشكلة تقنية مؤقتة. يمكنك إعادة المحاولة أو العودة للصفحة الرئيسية،
          أو التواصل معنا مباشرة وسنساعدك فوراً.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={reset} className="btn-gold">
            إعادة المحاولة
          </button>
          <Link href="/" className="btn-outline">
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
