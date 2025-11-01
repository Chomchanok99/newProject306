import "./App.css";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, loadCars } from "./data";
import type { CarDetail as CarDetailType } from "./data";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cars = loadCars();
  const car: CarDetailType | undefined = id ? getCarById(Number(id), cars) : undefined;

  if (!id) return null;

  if (!car) {
    return (
      <div className="car-detail-container">
        <nav className="navbar">
          <button className="back-button" onClick={() => navigate("/car")}>
            ← กลับไปหมวดหมู่รถ
          </button>
        </nav>
        <section className="no-data">
          <h2>ไม่พบข้อมูลรถ (id: {id})</h2>
          <p>กรุณาตรวจสอบข้อมูลหรือรีเฟรชหน้านี้</p>
        </section>
      </div>
    );
  }

  return (
    <div className="car-detail-container">
      <nav className="navbar">
        <button className="back-button" onClick={() => navigate("/car")}>
          ← กลับไปหมวดหมู่รถ
        </button>
      </nav>

      <header className="detail-header">
        <h1 className="detail-title">{car.title}</h1>
        <span className="detail-underline" />
      </header>

      <section className="driver-grid">
        {car.drivers.map((d, idx) => (
          <article className="driver-card" key={`${d.name}-${idx}`}>
            <div className="driver-header">
              <img src={d.portrait} alt={d.name} className="driver-portrait" />
              <div className="driver-meta">
                <h3 className="driver-name">
                  {d.name} {d.number ? `#${d.number}` : ""}
                </h3>
                <p className="driver-team">{d.team}</p>
                {d.bio && <p className="driver-bio">{d.bio}</p>}
              </div>
            </div>

            {d.carPhotos?.length > 0 && (
              <div className="car-thumb-grid">
                {d.carPhotos.map((p, i) => (
                  <img src={p} key={i} className="car-thumb" alt={`car-${i}`} />
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
