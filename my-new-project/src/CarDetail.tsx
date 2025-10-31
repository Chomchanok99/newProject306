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

// ------- ตัวอย่างข้อมูล (แก้/เติมได้ตามจริง) -------
const DB: Record<string, CarDetailData> = {
  "1": {
    title: "Mercedes-AMG GT3",
    drivers: [
      {
        name: "Maro Engel",
        team: "Mercedes‑AMG",
        number: "130",
        bio: "Engel ชนะรายการใหญ่มากมาย เช่น FIA GT World Cup (2015, 2024) และ Macau Grand Prix GT Cup (2014, 2015, 2022, 2024)",
        portrait:
          "https://www.motorsport-life.com/wp-content/uploads/2022/08/cc78db86-e7b2-40e6-9b19-82769f6eb110.jpg",
        carPhotos: [
          "https://www.touringcartimes.com/img/2017/07/engel_race2_moscow_dtm_2017.jpg?w=785&h=442&fit=crop&fm=pjpg&q=80","https://www.touringcartimes.com/img/2018/02/engel_out_dtm_2018.jpg?w=785&h=442&fit=crop&fm=pjpg&q=80",
        ],
      },
      {
        name: "Raffaele Marciello",
        team: "AKKodis ASP",
        number: "88",
        bio: "ชนะรายการ 24 Hours of Spa กับรถ #88 และทีม AKKodis ASP ซึ่งถือเป็นหนึ่งในชัยชนะที่ยิ่งใหญ่ของเขาในสาย GT.",
        portrait:
          "https://www.gt-world-challenge-europe.com/timthumb.php?w=700&src=%2Fimages%2Fdrivers%2Fphoto_3824.png",
        carPhotos: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/AKKodisAMG88Spa2022.jpg/1920px-AKKodisAMG88Spa2022.jpg","https://i.redd.it/akkodis-mercedes-amg-gt3-winner-of-the-2022-spa-24h-link-in-v0-twp5zl49ofwa1.jpg?width=1920&format=pjpg&auto=webp&s=41ddaebd373f37dbb87066857dfe3f332dda75f4",
        ],
      },
      {
        name: "Maximilian Günther",
        team: "Mercedes‑AMG Team HRT",
        number: "4",
        bio: "นักแข่งชาวเยอรมันที่มีพื้นฐานสูงทั้งจากฟอร์มูลาร์และการเป็นผู้ทดสอบ/รีเซิร์ฟให้กับ Mercedes-AMG แต่สำหรับรายการ GT3 โดยเฉพาะ “Mercedes-AMG GT3",
        portrait:
          "https://static-files.formula-e.pulselive.com/drivers/4e287a6d-e2da-471a-9c8a-01141d6a1819/right/large/a4aa14e5-3812-425a-a4b6-310b4ad7023c.png",
        carPhotos: [
          "https://www.paddock-legends.com/dokumente/img/gross/32429/mercedes-amg-gt3-evo-maximilian-goetz-no4-hrt-dtm-champion-2021-1-43.jpg","https://www.touringcartimes.com/img/2018/03/paf_vallelunga_test_dtm_2018.jpg",
        ],
      },
      {
        name: "Lucas Auer",
        team: "MANN‑FILTER",
        number: "22",
        bio: "มีประสบการณ์ทั้งในตลาดแข่งรถถนนแข่ง (GT) และทัวริงคาร์ (DTM) ส่งผลให้มีฝีมือหลากหลายทั้งสนามสั้นและสนามยาว",
        portrait:
          "https://wieck-nissanao-production.s3.amazonaws.com/photos/4f2a2b46922aa8693603bb0151909d2cf00b6fc6/preview-928x522.jpg",
        carPhotos: [
          "https://i.ebayimg.com/images/g/dM4AAeSw-UhobltZ/s-l1200.jpg","https://www.dtm-shop.com/dokumente/img/gross/36585/mercedes-amg-gt3-evo-lucas-auer-no22-winward-racing-winner-dtm-hockenheim-2021-1-18.jpg",
        ],
      },
      {
        name: "Daniel Juncadella",
        team: "AKKodis ASP",
        number: "8",
        bio: "ทำสถิติพิทสตอประยะสั้นเร็วที่สุดของทีม",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BssSJLagiAifWc1rpwevr7lZq0l0bMhhIg&s",
        carPhotos: [
          "https://res.cloudinary.com/adacmkv/image/upload/c_fill,w_400,h_225,q_auto,f_auto/news/220303-gtmasters-1_sndd0t","https://gt-place.com/wp-content/uploads/2023/01/2022-DTM-HHR-FR-SWOOSH-SRS-1040.jpg",
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
    // ✅ เปลี่ยนชื่อรุ่นให้เป็น Evo II ตามที่ต้องการ
    title: "Audi R8 LMS GT3 Evo II",
    drivers: [
      {
        name: "หัง อี้ป๋อ (Wang Yi Bo)",
        team: "Uno Racing Team",
        number: "85",
        bio: "หวัง อี้ป๋อและทีมได้เข้าร่วมการแข่งขัน China GT Championship ในปี 2025 โดยสามารถคว้าแชมป์ในรุ่น GT3 AM Class ในการแข่งขันรอบแรกที่เซี่ยงไฮ้มาได้",
        portrait:
          "https://mintmagth.s3.ap-southeast-1.amazonaws.com/photos/shares/Mint%20People/2023/JUNE%202023/yibo%20evisu/6486b5488a472.JPG",
        carPhotos: [
          "https://img2.51gt3.com/rac/article/202503/85a17143ed2a4660ab56a45064f4f007.jpg",
          "https://mintmagth.s3.ap-southeast-1.amazonaws.com/photos/shares/Mint%20People/2023/JUNE%202023/yibo%20evisu/6486b5485955d.JPG",
        ],
      },
      {
        name: "Rio Lee",
        team: "Uno Racing Team",
        number: "16",
        bio: "เขาเป็นนักแข่งที่มีประสบการณ์ เคยใช้รถแข่ง Audi R8 LMS GT3 EVO II ในการแข่งขัน GT World Challenge Asia ในฤดูกาล 2025",
        portrait:
          "https://img2.51gt3.com/rac/racer/202505/072dfa8e2f5e4ab7844f472bf82de67c.jpg?x-oss-process=style/_nowm",
        carPhotos: [
          "https://scontent.fbkk18-2.fna.fbcdn.net/v/t39.30808-6/498233867_1108271464662976_5488746123756172576_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGUat6KlpMyeBd9sNSYzNCKCsAu88S3CdkKwC7zxLcJ2WH-FVchd5iVL0hENdR6UoV9cotBVooRVq9j7FnpsvhQ&_nc_ohc=k4E3DsZGx58Q7kNvwFZhX-k&_nc_oc=Adl6-2n20vD5I9pxzyMkkBChhNQ27u7dNscwA3XrZFV4Lf45QqK28UUFaTQjXecarns&_nc_zt=23&_nc_ht=scontent.fbkk18-2.fna&_nc_gid=Z5xY9eIvMMwQ-JYlu6A6YQ&oh=00_AfdxU6DIeI877sOsnkNSffxWXLCowVr7PLqCop5QHa3dCw&oe=69080573","https://scontent.fbkk18-2.fna.fbcdn.net/v/t39.30808-6/498698372_1108271437996312_9154483607945424494_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF8sDYeCTk0TtRGPA8QHxb74nU74QHFsf_idTvhAcWx_zqUkT5ZGfKVAPFcBIDsqVSuzE-W1xFACkQYS8zHv4eL&_nc_ohc=xVHPMf_cmJ4Q7kNvwH8IsgX&_nc_oc=Adn9NGCN79gVerBMx49ZnXGzhQqj3W3PjEidzpbmLMm0vcA1fwRcxKjeth1OHWZ0OJU&_nc_zt=23&_nc_ht=scontent.fbkk18-2.fna&_nc_gid=1GRXHbOFggQBjjYCjHtUfQ&oh=00_AfeXspnQ65bZj80P9W4Ii6TrP1Pn4TQdcWuBbEW36lt8rA&oe=690809F0",
        ],
      },
      {
        name: "Sergio santos sette camara filho",
        team: "Nielsen Racing",
        number: "3",
        bio: "เป็นนักขับทดสอบและพัฒนาสำหรับทีม Formula 1 ของ McLaren และต่อมาได้รับบทบาทนักขับทดสอบสำหรับ Red Bull Racing และ AlphaTauri อาชีพของเขายังรวมถึงการเข้าร่วมใน Super Formula ของญี่ปุ่น",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGRQmOD2XamRQGmm56uytopXGiz3pf9ss-qYoSqCPk4JNNttNpeUKvqaNQ1tbS5i5iBI&usqp=CAU",
        carPhotos: [
          "https://www.gt-world-challenge-europe.com/timthumb.php?w=1600&src=%2Fimages%2Fgallery%2F2025%2F234%2F1643%2F%2F11-2RL_7384.jpg","https://pbs.twimg.com/media/G2pTzJmbIAMu0o2?format=jpg&name=large",
        ],
      },
      {
        name: "Fang junyu",
        team: "UNO Racing Team",
        number: "36",
        bio: "ในรอบสุดท้ายของฤดูกาล 2024 รายการ GTSC Series (Zhuhai) เขาและ Wang Yibo ขับรถหมายเลข 85 ชนะในกลุ่ม GT3 PA ได้สำเร็จ และกับทีม FAW Audi ใน GT World Challenge Asia Cup ใช้หมายเลข 36 และมีความโดดเด่นในกลุ่ม Silver Cup ด้วย EVO II",
        portrait:
          "https://img2.51gt3.com/rac/racer/202503/c4a147b993f94b459485b7fe69d77596.png?x-oss-process=style/_nowm",
        carPhotos: [
          "https://s3.fedibird.com/media_attachments/files/111/445/360/197/903/280/original/4299e1f0236f1165.webp","https://img2.51gt3.com/wx/202510/b82e9118-f047-463e-9cad-a190c9b789e1.jpg?x-oss-process=style/_nmedium",
        ],
      },
      {
        name: "David Pun",
        team: "X Works",
        number: "22",
        bio: "ในปี 2022 กับทีม X Works รถ #22 ใช้ใน GT World Challenge Asia – หมวด GT3 PA เช่น ที่สนาม Fuji, Suzuka, Sportsland Sugo.",
        portrait:
          "https://www.gt-world-challenge-europe.com/timthumb.php?src=%2Fimages%2Fdrivers%2Fphoto_3663.png&w=700",
        carPhotos: [
          "https://scontent.fbkk18-2.fna.fbcdn.net/v/t39.30808-6/560570747_1243783714449553_1301666408661125111_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEjsviwXDkL8ZgyiSZ4n-U_tZxKDL_UL6-1nEoMv9Qvr9-nMzfsBJvj2VBPrEmXbXJG8i9Xbj1UYLi6W_1c53gv&_nc_ohc=c4llstZ4NT4Q7kNvwHWbPd3&_nc_oc=AdkGhf8q_s3Fk2siPqjruk_oZsjumytrVgzvQ7b96rQv4ek4qMJ7HZKJQeAc5dhs1IY&_nc_zt=23&_nc_ht=scontent.fbkk18-2.fna&_nc_gid=XHAdxVT_sRgp5-BL3zgxpQ&oh=00_AfdE5UjTjlPNAIF40Ov07i-6SH55gx6WaJvn0heaUy6Mig&oe=69080CB0","https://static.wixstatic.com/media/41a294_86966c2fa9e84bdbb7c668d5efabd727~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
        ],
      },
    ],
  },
  "4": {
    title: "Porsche 911 GT3 RS (Track)",
    drivers: new Array(5).fill(0).map((_, i) => ({
      name: `Driver ${i + 1}`,
      team: "Track Day",
      number: "3",
      bio: "",
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

  // ถ้าไม่มี id ให้กลับไปหน้าหมวดรถ
  if (!id || !DB[id]) {
    navigate("/car");
    return null;
  }

  const data = DB[id];

  return (
    <div className="app-container detail-page">
      {/* แถบด้านบน */}
      <nav className="navbar">
        <button className="admin-button" onClick={() => navigate("/car")}>
          ← กลับไปหมวดหมู่รถ
        </button>
      </nav>

      <section className="detail-shell">
        {/* ✅ หัวข้อรุ่นรถอยู่บนสุด พร้อมเส้นไฮไลต์ */}
        <header className="detail-header">
          <h1 className="detail-title">{data.title}</h1>
          <span className="detail-underline" />
        </header>

        {/* รายการนักแข่ง (ทีละคน ต่อกันลงมา) */}
        <div className="driver-grid">
          {data.drivers.map((d, idx) => (
            <article className="driver-card" key={`${d.name}-${idx}`}>
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

              {/* รูปรถของนักแข่งคนนั้น */}
              {d.carPhotos?.length > 0 && (
                <div className="car-thumb-grid">
                  {d.carPhotos.map((p, i) => (
                    <img src={p} key={i} className="car-thumb" alt={`car-${i}`} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
