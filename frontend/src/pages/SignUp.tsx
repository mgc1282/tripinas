import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ borderRadius: "12px", padding: "2rem" }}>
        <SignUp 
          forceRedirectUrl="/dashboard" 
          fallbackRedirectUrl="/dashboard" 
        />
      </div>
    </div>
  );
}
