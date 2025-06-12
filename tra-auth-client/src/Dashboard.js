import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard'a Hoş Geldiniz</h2>
      <p>Giriş Başarılı !</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
