import Illustration from "./Illustration.jsx";

// Shared split-screen shell: white form on the left, purple curved art on the right.
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      {/* ---------- LEFT: form ---------- */}
      <section className="auth-left">
        <div className="brand">
          <span className="brand-mark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <span className="brand-name">Auth Flow</span>
        </div>

        <div className="auth-form-wrap">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-sub">{subtitle}</p>
          {children}
        </div>
      </section>

      {/* ---------- RIGHT: artwork ---------- */}
      <section className="auth-right">
        <div className="curve curve-ghost" />
        <div className="curve curve-main" />
        <Illustration />
      </section>
    </div>
  );
}
