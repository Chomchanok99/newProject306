import './App.css'

function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: ตรวจสอบข้อมูล/ไปหน้าถัดไป
    alert('เข้าสู่ระบบ (demo)')
  }

  return (
    <div className="app-container login-page">
      {/* แถบด้านบนเหมือนหน้าแรก */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* เนื้อหา Login */}
      <div className="login-content">
        <h1 className="login-title">Log in</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="fullname" className="login-label">ชื่อ–นามสกุล</label>
          <input id="fullname" name="fullname" type="text" className="login-input" />

          <label htmlFor="email" className="login-label">email</label>
          <input id="email" name="email" type="email" className="login-input" />

          <div className="login-actions">
            <button type="submit" className="login-submit">
              ต่อไป →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
