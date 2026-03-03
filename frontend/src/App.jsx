import { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://127.0.0.1:8000/api/";

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    try {
      const res = await axios.post(API + "register/", {
        username,
        password,
      });

      alert(res.data.message);
      setIsLogin(true);
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Registration Failed");
      } else {
        alert("Server not responding");
      }
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    try {
      const res = await axios.post(API + "login/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      alert("Login Success 🎉");

      setUsername("");
      setPassword("");
    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={{ marginBottom: "10px" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          style={styles.input}
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          value={password}
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLogin ? (
          <button style={styles.primaryBtn} onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button style={styles.primaryBtn} onClick={handleRegister}>
            Register
          </button>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          {isLogin ? "New here?" : "Already registered?"}
        </p>

        <button style={styles.linkBtn} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Go to login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  box: {
    backgroundColor: "#ffffff",
    padding: "35px",
    width: "320px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2d6cdf",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  linkBtn: {
    marginTop: "5px",
    background: "none",
    border: "none",
    color: "#2d6cdf",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default App;