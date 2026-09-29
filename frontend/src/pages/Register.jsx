import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, saveToken } from "../services/api";
import AuthLayout from "../components/AuthLayout.jsx";
import Field from "../components/Field.jsx";
import { UserIcon, MailIcon, LockIcon } from "../components/Icons.jsx";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Name required | Email required + valid | Password min 6
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setApiError("");
    if (!validate()) return;
    try {
      setLoading(true);
      const { data } = await registerUser(form);
      saveToken(data.token);
      navigate("/home");
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up by entering the information below"
    >
      <form onSubmit={onSubmit} noValidate>
        {apiError && <div className="alert">{apiError}</div>}

        <Field
          icon={UserIcon}
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={onChange}
          error={errors.name}
        />

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
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />

        <div className="row-between">
          <span className="link-muted">Your data is stored securely</span>
        </div>

        <div className="actions">
          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
          <Link className="btn-ghost" to="/login">Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
