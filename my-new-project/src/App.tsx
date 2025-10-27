import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Login'

// 🔹 หน้าแรก (Home)
function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      {/* 🔹 แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* 🔹 ส่วนแสดงรูป */}
      <div className="main-content">
        <img
          src="https://s.isanook.com/ga/0/ud/199/995409/995409-thumbnail.jpg?ip/crop/w670h402/q80/jpg"
          alt="หน้าแรก"
          className="center-image"
        />
      </div>

      {/* 🔹 ปุ่มข้อมูลนักกีฬาใต้ภาพ */}
      <div className="button-section">
        <button className="info-button" onClick={() => navigate('/login')}>
          ข้อมูลนักกีฬา
        </button>
      </div>
    </div>
  )
}

// 🔹 รวม Router ทั้งหมด
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
