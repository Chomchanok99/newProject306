// src/AdminPage.tsx
import { useEffect, useState } from "react";
import {
  loadCars,
  addCar,
  updateCar,
  deleteCar,
  addDriver,
  updateDriver,
  deleteDriver,
  seedCars,
} from "./data";
import type { CarDetail, DriverDetail } from "./data";

export default function AdminPage() {
  const [cars, setCars] = useState<CarDetail[]>([]);
  const [newCar, setNewCar] = useState<{ title: string; image: string }>({
    title: "",
    image: "",
  });

  useEffect(() => {
    // โหลดจาก localStorage ถ้าไม่มีให้ใช้ seed
    const saved = loadCars();
    setCars(saved?.length ? saved : seedCars);
  }, []);

  /* -------------------- Car CRUD -------------------- */
  const handleAddCar = () => {
    if (!newCar.title.trim() || !newCar.image.trim()) return;
    const updated = addCar(newCar);
    setCars(updated);
    setNewCar({ title: "", image: "" });
  };

  const handleUpdateCar = (
    id: number,
    patch: Partial<Omit<CarDetail, "id" | "drivers">>
  ) => {
    const updated = updateCar(id, patch);
    setCars(updated);
  };

  const handleDeleteCar = (id: number) => {
    if (!confirm("ยืนยันการลบรถคันนี้?")) return;
    const updated = deleteCar(id);
    setCars(updated);
  };

  /* ------------------- Driver CRUD ------------------ */
  const handleAddDriver = (carId: number, driver: DriverDetail) => {
    const updated = addDriver(carId, driver);
    setCars(updated);
  };

  const handleUpdateDriver = (
    carId: number,
    index: number,
    patch: Partial<DriverDetail>
  ) => {
    const updated = updateDriver(carId, index, patch);
    setCars(updated);
  };

  const handleDeleteDriver = (carId: number, index: number) => {
    if (!confirm("ยืนยันการลบนักแข่งคนนี้?")) return;
    const updated = deleteDriver(carId, index);
    setCars(updated);
  };

  /* ---------------------- UI ------------------------ */
  return (
    <div className="admin-page">
      {/* แถบบนให้โทนเดียวกับหน้าอื่น */}
      <nav className="navbar">
        
      </nav>

      <h1 className="car-title" style={{ marginTop: 20 }}>Admin</h1>

      {/* ฟอร์มเพิ่มรถ */}
      <div className="admin-add">
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr auto", width: "min(900px, 95vw)" }}>
          <input
            className="login-input" // reuse สไตล์ input สวย ๆ
            placeholder="ชื่อรถ เช่น Audi R8 LMS GT3 Evo II"
            value={newCar.title}
            onChange={(e) => setNewCar((s) => ({ ...s, title: e.target.value }))}
          />
          <input
            className="login-input"
            placeholder="ลิงก์รูปภาพรถ"
            value={newCar.image}
            onChange={(e) => setNewCar((s) => ({ ...s, image: e.target.value }))}
          />
          <button className="info-button primary" onClick={handleAddCar}>+ เพิ่มรถ</button>
        </div>
      </div>

      {/* รายการรถ */}
      {cars.map((c) => (
        <div key={c.id} className="admin-car">
          {/* รูป + ชื่อรถ overlay เล็กน้อย */}
          <div style={{ position: "relative", width: "100%" }}>
            <img className="car-image" src={c.image} alt={c.title} />
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                background: "rgba(0,0,0,.55)",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 10,
                fontWeight: 700,
                backdropFilter: "blur(3px)",
              }}
            >
              {c.title}
            </div>
          </div>

          {/* ปุ่มแอ็คชันของรถ */}
          <div className="admin-actions">
            <button
              onClick={() =>
                handleUpdateCar(c.id, {
                  title: prompt("แก้ชื่อรถ", c.title) || c.title,
                })
              }
            >
              แก้ชื่อ
            </button>
            <button
              onClick={() =>
                handleUpdateCar(c.id, {
                  image: prompt("แก้ลิงก์รูป", c.image) || c.image,
                })
              }
            >
              แก้รูป
            </button>
            <button className="delete" onClick={() => handleDeleteCar(c.id)}>
              ลบรถ
            </button>
          </div>

          {/* นักแข่งของรถคันนี้ */}
          <div style={{ width: "100%", marginTop: 6 }}>
            <h4 style={{ color: "var(--text-main)", margin: "10px 0 8px" }}>นักแข่ง</h4>

            {c.drivers.map((d, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: 10,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                }}
              >
                <div style={{ color: "#2e1b1b" }}>
                  <b>{d.name}</b> {d.number ? `#${d.number}` : ""} — {d.team}
                </div>
                <div className="admin-actions" style={{ margin: 0 }}>
                  <button
                    onClick={() =>
                      handleUpdateDriver(c.id, idx, {
                        name: prompt("แก้ชื่อนักแข่ง", d.name) || d.name,
                      })
                    }
                  >
                    แก้ชื่อ
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateDriver(c.id, idx, {
                        team: prompt("แก้ทีม", d.team) || d.team,
                      })
                    }
                  >
                    แก้ทีม
                  </button>
                  <button className="delete" onClick={() => handleDeleteDriver(c.id, idx)}>
                    ลบ
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button
                className="info-button"
                onClick={() =>
                  handleAddDriver(c.id, {
                    name: prompt("ชื่อนักแข่ง") || "New Driver",
                    team: prompt("ทีม") || "",
                    number: (prompt("หมายเลข (#ไม่ต้องใส่เครื่องหมาย)") || "").trim() || undefined,
                    bio: (prompt("Bio (ใส่ได้/ข้ามได้)") || "").trim() || undefined,
                    portrait: prompt("ลิงก์รูปนักแข่ง") || "",
                    carPhotos: (prompt("ลิงก์รูปรถ (คั่นด้วย ,)") || "")
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              >
                + เพิ่มนักแข่ง
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
