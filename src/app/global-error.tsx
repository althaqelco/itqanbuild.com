"use client";

// Replaces the root layout on a top-level render crash — must ship its own <html>/<body>
// and rely only on inline styles (globals.css is not guaranteed to be present here).
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, 'Segoe UI', Tahoma, sans-serif",
          background: "#060F1F",
          color: "#F8F6F0",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "36rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>حدث خطأ غير متوقع</h1>
          <p style={{ opacity: 0.65, marginBottom: "2rem", lineHeight: 1.8 }}>
            نعتذر عن العطل التقني. حاول مرة أخرى، أو عُد لاحقاً — فريق إتقان للمقاولات في خدمتك.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                background: "#D4AF37",
                color: "#060F1F",
                border: 0,
                borderRadius: "9999px",
                padding: "0.75rem 1.75rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              إعادة المحاولة
            </button>
            <a
              href="/"
              style={{
                border: "1.5px solid #D4AF37",
                color: "#D4AF37",
                borderRadius: "9999px",
                padding: "0.75rem 1.75rem",
                textDecoration: "none",
              }}
            >
              الصفحة الرئيسية
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
