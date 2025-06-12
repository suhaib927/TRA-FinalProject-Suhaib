import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7194/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setLoginStatus("success"); 
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); 
    } catch (error) {
      setLoginStatus("failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-posta: </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Şifre: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Giriş</button>
      </form>

      {loginStatus === "success" && (
        <p style={{ color: "green", marginTop: "10px" }}>Giriş Başarılı!</p>
      )}
      {loginStatus === "failed" && (
        <p style={{ color: "red", marginTop: "10px" }}>! Hatalı Giriş</p>
      )}
    </div>
  );
}

export default Login;
