// src/Car.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CarListItem } from "./data";           // ใช้ import type เพื่อความเนียน
import { getCarsForList, loadCars } from "./data";   // ฟังก์ชันอยู่ไฟล์เดียวกัน
import "./App.css";


export default function Car() {
  const [cars, setCars] = useState<CarListItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCars(getCarsForList(loadCars()));
  }, []);

  return (
    <div className="app-container car-page">
      <div className="car-container">
        <h1 className="car-title">หมวดหมู่รถแข่ง <span style={{ color: "#c86b6b" }}>GT</span></h1>
        <span className="title-underline" />

        <div className="car-grid">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-image-wrap">
                <img
                  src={car.image}
                  alt={car.title}
                  className="car-image"
                />
              </div>
              {/* ✅ ชื่อรถอยู่ใต้รูป และกดเพื่อไปหน้ารายละเอียด */}
              <div
                className="car-caption"
                onClick={() => navigate(`/car/${car.id}`)}
              >
                {car.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}