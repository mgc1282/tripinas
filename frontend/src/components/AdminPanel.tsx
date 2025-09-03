import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Users", path: "/users" },
  { label: "Settings", path: "/settings" }
];

export default function AdminPanel() {
  const location = useLocation();
  return (
    <nav style={{
      width: "220px",
      minHeight: "100vh",
      background: "#222f3e",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "2rem 1rem",
      boxSizing: "border-box"
    }}>
      <h2 style={{ marginBottom: "2rem", fontWeight: "bold", fontSize: "1.5rem" }}>Admin</h2>
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            color: location.pathname === item.path ? "#54a0ff" : "#fff",
            textDecoration: "none",
            marginBottom: "1.5rem",
            fontWeight: location.pathname === item.path ? "bold" : "normal",
            fontSize: "1.1rem"
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}