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
        username: username,
        password: password,
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
        username: username,
        password: password,
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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {isLogin ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      <br /><br />

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}

export default App;