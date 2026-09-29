import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveToken } from "../services/api";
import AuthLayout from "../components/AuthLayout.jsx";
import Field from "../components/Field.jsx";
import { MailIcon, LockIcon, CheckIcon } from "../components/Icons.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setApiError("");
    if (!validate()) return;
    try {
      setLoading(true);
      const { data } = await loginUser(form);
      saveToken(data.token);
      navigate("/home");
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome to login system"
      subtitle="Sign in by entering the information below"
    >
      <form onSubmit={onSubmit} noValidate>
        {apiError && <div className="alert">{apiError}</div>}

        <Field
          icon={MailIcon}
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />

        <Field
          icon={LockIcon}
          name="password"
          password
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />

        <div className="row-between">
          <label className="check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="box">
              <CheckIcon width="11" height="11" />
            </span>
            Remember me
          </label>
          <a className="link-muted" href="#forgot">Forgot Password?</a>
        </div>

        <div className="actions">
          <button className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <Link className="btn-ghost" to="/register">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
