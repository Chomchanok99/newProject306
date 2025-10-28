import './App.css'
import { useNavigate } from 'react-router-dom'

type CarItem = { id: number; title: string; img: string }

const cars: CarItem[] = [
  {
    id: 1,
    title: 'Mercedes-AMG GT3',
    img: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q1/665019/mercedes-amg-gt3-race-car-first-drive-review-car-and-driver-photo-666972-s-original.jpg?resize=1800:*',
  },
  {
    id: 2,
    title: 'Porsche 991 GT3 R',
    img: 'https://newsroom.porsche.com/dam/jcr:446e5e49-1ce0-4150-b7ad-2caa00d00488/20190125-a-0380.jpg',
  },
  {
    id: 3,
    title: 'Audi R8 LMS GT3 Evo ll',
    img: 'https://www.gotothegrid.com/storage/ads/5KX3dLiLXFbvSI9K2rqIIX1daHTuneyOSNmceHPP-800.webp',
  },
  {
    id: 4,
    title: 'Audi R8 LMS GT3 Evo IIII',
    img: 'https://www.pcarmarket.com/static/media/uploads/galleries/photos/uploads/galleries/v-0018917-fl-eric-sattar-561-615-7222-2016-porsche-gt3-rs/.thumbnails/A-001.jpg/A-001-tiny-2048x0.jpg',
  },
]

function Car() {
  const navigate = useNavigate()

  return (
    <div className="app-container car-page">
      {/* แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button">แอดมิน</button>
      </nav>

      {/* เนื้อหา */}
      <div className="car-container">
        <h1 className="car-title">หมวดหมู่รถ</h1>

        <div className="car-grid">
          {cars.map((c) => (
            <div className="car-card" key={c.id}>
              <div className="car-image-wrap">
                <img src={c.img} alt={c.title} className="car-image" />
              </div>
              <div
                className="car-caption clickable"
                onClick={() => navigate(`/car/${c.id}`)}
              >
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Car
