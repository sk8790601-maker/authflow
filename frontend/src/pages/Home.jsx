import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/api";
import AuthLayout from "../components/AuthLayout.jsx";
import { LogoutIcon } from "../components/Icons.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify the stored JWT against the backend
    getProfile()
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        logout();
        navigate("/login", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading)
    return (
      <AuthLayout title="Loading..." subtitle="Verifying your session">
        <div className="loader" />
      </AuthLayout>
    );

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : "—";

  return (
    <AuthLayout
      title={`Welcome, ${user?.name?.split(" ")[0] || "there"} 👋`}
      subtitle="You are signed in to your protected dashboard"
    >
      <div className="home-card">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>

        <div className="badge-online"><i />Session active</div>

        <h2 style={{ fontSize: 21, letterSpacing: "-.4px" }}>{user?.name}</h2>

        <div className="info-list">
          <div className="info-row">
            <span>Email</span><span>{user?.email}</span>
          </div>
          <div className="info-row">
            <span>Member since</span><span>{joined}</span>
          </div>
          <div className="info-row">
            <span>Auth method</span><span>JWT</span>
          </div>
        </div>

        <button className="btn btn-logout" onClick={handleLogout}>
          <LogoutIcon width="17" height="17" /> Logout
        </button>
      </div>
    </AuthLayout>
  );
}
