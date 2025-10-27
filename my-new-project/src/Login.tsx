import './App.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/car')
  }

  return (
    <div className="app-container login-page">
      {/* แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* การ์ดฟอร์มกลางหน้า */}
      <div className="login-content">
        <div className="login-card">
          <h1 className="login-title">Log in</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="fullname" className="login-label">ชื่อ–นามสกุล</label>
            <input id="fullname" name="fullname" type="text" className="login-input" required />

            <label htmlFor="email" className="login-label">email</label>
            <input id="email" name="email" type="email" className="login-input" required />

            <div className="login-actions">
              <button type="submit" className="login-submit">
                ต่อไป →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
