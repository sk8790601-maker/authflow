import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./Icons.jsx";

// Pill-shaped input with a leading icon, optional password reveal, and error text.
export default function Field({
  icon: Icon,
  type = "text",
  error,
  password = false,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const inputType = password ? (show ? "text" : "password") : type;

  return (
    <div className="field">
      <div className={`pill ${error ? "pill-error" : ""}`}>
        {Icon && <Icon className="pill-icon" width="18" height="18" />}
        <input type={inputType} {...rest} />
        {password && (
          <button
            type="button"
            className="pill-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {show ? <EyeIcon width="18" height="18" /> : <EyeOffIcon width="18" height="18" />}
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
