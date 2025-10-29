import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Login'
import Car from './Car'
import CarDetail from './CarDetail'

// หน้าแรก (Home)
function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
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
          <button className="info-button primary" onClick={() => navigate('/login')}>
            ข้อมูลนักกีฬา
          </button>
        </div>
      </section>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car" element={<Car />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  )
}

export default App
