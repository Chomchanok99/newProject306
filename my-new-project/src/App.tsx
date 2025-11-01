import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import AdminPage from "./AdminPage";
import Car from "./Car";
import CarDetail from "./CarDetail";

// ---------------- Home ----------------
function Home() {
  const navigate = useNavigate();

  // popup state
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPrompt = () => setShowPrompt(true);
  const closePrompt = () => {
    setShowPrompt(false);
    setPassword("");
  };

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      closePrompt();
      navigate("/admin");
    } else {
      alert("รหัสผ่านไม่ถูกต้อง!");
    }
  };

  // close when click backdrop
  const onBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) closePrompt();
  };

  // keyboard: Enter = login, Esc = close
  useEffect(() => {
    if (!showPrompt) return;
    inputRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleLogin();
      if (e.key === "Escape") closePrompt();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPrompt, password]);

  return (
    <div className="app-container">
      {/* ===== Navbar (ปุ่มฝั่งขวา) ===== */}
      <nav className="navbar">
        <div className="nav-right">
          <button className="admin-button" onClick={openPrompt}>
            แอดมิน
          </button>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="home-shell">
        <h1 className="home-title">รถแข่ง GT หรือ Gran Turismo</h1>
        <span className="title-underline" />

        <img
          src="https://s.isanook.com/ga/0/ud/199/995409/995409-thumbnail.jpg?ip/crop/w670h402/q80/jpg"
          alt="Gran Turismo"
          className="home-image"
        />

        <div className="button-section tight">
          <button
            className="info-button primary"
            onClick={() => navigate("/login")}
          >
            ข้อมูลนักกีฬา
          </button>
        </div>
      </section>

      {/* ===== Popup ใส่รหัสผ่าน ===== */}
      {showPrompt && (
        <div
          className="admin-overlay"
          ref={overlayRef}
          onMouseDown={onBackdropClick}
        >
          <div className="admin-box" role="dialog" aria-modal="true">
            <h2 className="admin-title">เข้าสู่ระบบแอดมิน</h2>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              className="admin-input"
            />
            <div className="btn-row">
              <button className="btn primary" onClick={handleLogin}>
                เข้าสู่ระบบ
              </button>
              <button className="btn" onClick={closePrompt}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- App Root ----------------
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car" element={<Car />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
