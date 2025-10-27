import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* 🔹 แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* 🔹 เนื้อหาหน้าเว็บ */}
      <div className="tab-content">
        <h1>หน้านี้คือ “หน้าแอดมิน”</h1>
      </div>
    </div>
  )
}

export default App
