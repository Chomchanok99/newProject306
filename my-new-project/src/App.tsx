import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Login'
import Car from './Car'

// หน้าแรก (Home)
function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      <div className="main-content">
        <img
          src="https://s.isanook.com/ga/0/ud/199/995409/995409-thumbnail.jpg?ip/crop/w670h402/q80/jpg"
          alt="หน้าแรก"
          className="center-image"
        />
      </div>

      <div className="button-section">
        <button className="info-button" onClick={() => navigate('/login')}>
          ข้อมูลนักกีฬา
        </button>
      </div>
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
      </Routes>
    </Router>
  )
}

export default App
