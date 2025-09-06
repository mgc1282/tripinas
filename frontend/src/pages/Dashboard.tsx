import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import AdminPanel from "../components/AdminPanel";
import UserProfile from "../components/UserProfile";

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
          <AdminPanel />
          <div style={{ flex: 1, padding: "2rem" }}>
            <header style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem"
            }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Dashboard Home</h1>
              <UserButton/>
            </header>
            <UserProfile />
            {/* Add scalable dashboard widgets/components here */}
            <div style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
            }}>
              <h2>Welcome to your admin dashboard!</h2>
              <p>Here you can manage users, view analytics, and configure settings.</p>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          You are signed out. <a href="/sign-in">Sign in</a>
        </p>
      </SignedOut>
    </>
  );
}