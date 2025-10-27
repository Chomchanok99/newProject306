import './App.css'

function Car() {
  return (
    <div className="app-container">
      {/* แถบด้านบนเหมือนเดิม */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* เนื้อหากลางหน้า */}
      <div className="login-content">
        <h1>Car</h1>
        <p>หน้านี้คือหน้า Car</p>
      </div>
    </div>
  )
}

export default Car
