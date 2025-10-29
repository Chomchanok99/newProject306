import "./App.css";
import { useParams, useNavigate } from "react-router-dom";

type Driver = {
  name: string;
  team: string;
  number?: string;
  bio?: string;
  portrait: string;     // รูปนักแข่ง
  carPhotos: string[];  // รูปรถของนักแข่งคนนี้
};

type CarDetailData = {
  title: string;
  drivers: Driver[];
};

// ------- ตัวอย่างข้อมูล (คุณแก้ไข/ใส่ข้อมูลจริงได้ตลอด) -------
const DB: Record<string, CarDetailData> = {
  "1": {
    title: "Mercedes-AMG GT3",
    drivers: [
      {
        name: "H. Tanaka",
        team: "AMG Team One",
        number: "04",
        bio: "สไตล์ขับดุดัน เน้น Late-brake และไลน์นอก",
        portrait:
          "https://images.unsplash.com/photo-1530648965273-6ea933b3b1b0?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "M. Silva",
        team: "AMG Junior",
        number: "12",
        bio: "ถนัดเซ็ตอัพล้อหลังให้ยึดเกาะสูงสำหรับ stint ยาว",
        portrait:
          "https://images.unsplash.com/photo-1547480053-3a2e20f07d94?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "L. Rossi",
        team: "AMG Customer Racing",
        number: "18",
        bio: "เด่นเรื่องการจัดการยางในอุณหภูมิสูง",
        portrait:
          "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "K. Nakamura",
        team: "AMG GT3 Asia",
        number: "27",
        bio: "แม่นยำกับไลน์แคบ ๆ ในสนามเทคนิคอล",
        portrait:
          "https://images.unsplash.com/photo-1520975922284-7b683fe8c4f1?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1527281400683-1aae2aa5a954?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "D. Müller",
        team: "AMG Pro",
        number: "89",
        bio: "ทำสถิติพิทสตอประยะสั้นเร็วที่สุดของทีม",
        portrait:
          "https://images.unsplash.com/photo-1520975922284-bea5d7d2b0f9?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1604192249263-2ef5a7b2d5f7?q=80&w=1200&auto=format&fit=crop",
        ],
      },
    ],
  },
  "2": {
    title: "Porsche 991 GT3 R",
    drivers: [
      {
        name: "A. Perez",
        team: "Porsche GT Team",
        portrait:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "B. Chen",
        team: "Manthey Racing",
        portrait:
          "https://images.unsplash.com/photo-1544717307-996b815c338c?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1d?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "C. Meyer",
        team: "Pro-Am",
        portrait:
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1558980664-10e7170b57a7?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "D. Sato",
        team: "KCMG",
        portrait:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "E. Novak",
        team: "Herberth Motorsport",
        portrait:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
        ],
      },
    ],
  },
  "3": {
    title: "Audi R8 LMS GT3 Evo III",
    drivers: [
      {
        name: "หัง อี้ป๋อ (Wang Yi Bo)",
        team: "GTSC 85",
        number: "18",
        bio: "เด่นเรื่องการจัดการยางในอุณหภูมิสูง",
        portrait:
          "https://i.pinimg.com/736x/0b/e2/2f/0be22f8f3c6b8c2c0d1d9d2a5e9b3f35.jpg",
        carPhotos: [
          "https://images.unsplash.com/photo-1514558427911-5f22fda9b7e1?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      // เติมให้ครบ 5 คนด้วย placeholder
      {
        name: "Rio",
        team: "UNO Racing",
        portrait:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "Shaun Thong",
        team: "UNO Racing",
        portrait:
          "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "Luca",
        team: "Audi Sport",
        portrait:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        name: "Mika",
        team: "Audi Customer",
        portrait:
          "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop",
        carPhotos: [
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
        ],
      },
    ],
  },
  "4": {
    title: "Porsche 911 GT3 RS (Track)",
    drivers: new Array(5).fill(0).map((_, i) => ({
      name: `Driver ${i + 1}`,
      team: "Track Day",
      portrait:
        "https://images.unsplash.com/photo-1520975922284-7b683fe8c4f1?q=80&w=800&auto=format&fit=crop",
      carPhotos: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      ],
    })),
  },
};
// -------------------------------------------------------------

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = DB[id || ""] || { title: "ไม่พบข้อมูลรถ", drivers: [] };

  return (
    <div className="app-container detail-page">
      {/* แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button" onClick={() => navigate("/car")}>
          ← กลับไปหมวดหมู่รถ
        </button>
      </nav>

      <section className="detail-shell">
        <h1 className="detail-title">{data.title}</h1>

        {/* กริดนักแข่ง 5 คน */}
        <div className="driver-grid">
          {data.drivers.map((d, idx) => (
            <article className="driver-card" key={idx}>
              <div className="driver-header">
                <img src={d.portrait} className="driver-portrait" alt={d.name} />
                <div className="driver-meta">
                  <h3 className="driver-name">
                    {d.name} {d.number ? `#${d.number}` : ""}
                  </h3>
                  <p className="driver-team">{d.team}</p>
                  {d.bio && <p className="driver-bio">{d.bio}</p>}
                </div>
              </div>

              {/* รูปรถของนักแข่งคนนั้น (1–3 รูปก็ได้) */}
              <div className="car-thumb-grid">
                {d.carPhotos.map((p, i) => (
                  <img src={p} key={i} className="car-thumb" alt={`car-${i}`} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
