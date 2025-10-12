import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("taskflowUser"));
      if (savedUser && savedUser.username === username && savedUser.password === password) {
        onLogin(savedUser); // pass user to App
        navigate("/dashboard/overview");
      } else {
        alert("Invalid username or password");
      }
    } else {
      const newUser = { username, email, password };
      localStorage.setItem("taskflowUser", JSON.stringify(newUser));
      alert("Account created! You can now log in.");
      setIsLogin(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Segoe UI" }}>
      <div style={{ width: "900px", minHeight: "500px", display: "flex", borderRadius: "10px", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
        {/* Left Panel */}
        <div style={{ flex: 1, background: "linear-gradient(135deg, #2563eb, #1e40af)", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Taskflow</h1>
          <p style={{ fontSize: "16px", textAlign: "center" }}>
            Manage your tasks, stay productive, and achieve your goals with ease.
          </p>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
            {isLogin ? "Login to Taskflow" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <input
              type="text"
              placeholder="User Name"
              style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              style={{ width: "100%", padding: "12px", marginTop: "15px", borderRadius: "6px", border: "none", fontSize: "16px", cursor: "pointer", background: "#2563eb", color: "white", fontWeight: "bold" }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {isLogin && <div style={{ marginTop: "10px", fontSize: "13px", color: "#444", textAlign: "right", cursor: "pointer" }}>Forgot Password?</div>}

          <div style={{ marginTop: "15px", fontSize: "14px", color: "#2563eb", textAlign: "center", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don’t have an account? Sign Up" : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
