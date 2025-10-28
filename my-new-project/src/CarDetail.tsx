import './App.css'
import { useParams, useNavigate } from 'react-router-dom'

function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="app-container car-detail-page">
      <nav className="navbar">
        <button className="admin-button" onClick={() => navigate('/car')}>
          ← กลับไปหน้ารถ
        </button>
      </nav>

      <div className="detail-content">
        <h1>รายละเอียดรถหมายเลข {id}</h1>
        <p>ข้อมูลเพิ่มเติมเกี่ยวกับรถรุ่นนี้จะแสดงในภายหลัง...</p>
      </div>
    </div>
  )
}

export default CarDetail
