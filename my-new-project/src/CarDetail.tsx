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
        bio: "ปี 2023 กับทีม WeatherTech Racing ในรายการ IMSA SportsCar Championship หมวด GTD Pro เขาคว้าชัยในรายการ 24 Hours of Daytona และคว้าแชมป์ Michelin Endurance Cup",
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
        name: "Kevin Estre",
        team: "Manthey Racing",
        number: "911",
        bio: "ชนะ “24 Hours of Nürburgring” กับหมายเลข #59 (Manthey)",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-XBk-7tfDdp7hBN28glyzUn91kr1Z9DoVNdcVCARarUwfEXK-8BibWNMTblypTcJCRg&usqp=CAU",
        carPhotos: [
          "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2021/Motorsports/24-Hours-Nuerburgring/Breaking-News/gallery/M21_1734_fine.jpg/jcr%3Acontent/M21_1734_fine.jpg","https://www.autohebdo.fr/app/uploads/2025/06/estre-porsche-nurb-753x494.jpg",
        ],
      },
      {
        name: "Laurens vanthoor",
        team: "ÜS Team75 Bernhard",
        number: "47",
        bio: "ชนะ 24 Hours of Spa (ก่อนขับ Porsche) และแชมป์ Blancpain GT Series",
        portrait:
          "https://res.cloudinary.com/dmwcbhehi/image/upload/c_fill,w_3840,g_auto/f_auto/q_auto/v1/Carousel/Laurens%20V/Vanthoor-carousel-picture1?_a=BAVAZGDX0",
        carPhotos: [
          "https://press.porsche.com/download/prod/presse_pag/PressBasicData.nsf/Download?OpenAgent=&attachmentid=1396644&show=1","https://images.squarespace-cdn.com/content/v1/5e67c0b15cc05f67605d7d5c/22590e6f-6d18-46f2-969f-f798cbeedb48/porschesport.jpg",
        ],
      },
      {
        name: "Earl Bamber",
        team: "GPX Racing",
        number: "22",
        bio: "ในฤดูกาล 2021 เขาขับรถคัน #22 ให้ GPX Racing/Porsche 911 GT3 R (Type 991) ในรายการ Endurance เช่น Spa และควอลิฟายทำเวลาได้ดี",
        portrait:
          "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/press-kits/Motorsport-Guide-2019/03-Werksfahrer/Earl-Bamber/Werksfahrer_crop_landscape1.jpg/jcr%3Acontent/Werksfahrer_crop_landscape1.jpg",
        carPhotos: [
          "https://earlbambermotorsport.com/wp-content/uploads/2021/10/timthumb-16.jpg","https://www.thailandsuperseries.net/wp-content/uploads/2022/03/277362847_2169235539912673_4705538289333545187_n-1024x682.jpg",
        ],
      },
      {
        name: "Lucas Auer",
        team: "MANN‑FILTER",
        number: "48",
        bio: "ในฤดูกาล 2025 เมื่อขับรถ #48 ให้ Mercedes-AMG Team MANN-FILTER เขาทำโพเดียมหลายครั้ง เช่น อันดับ 1 ที่ Monza, อันดับ 2 ที่ Nürburgring",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqAT4jcweLP8JLdSebIURG9UudULvKcdvEA&s",
        carPhotos: [
          "https://www.gt-world-challenge-europe.com/timthumb.php?w=1000&src=%2Fimages%2Fgallery%2F2024%2F222%2F1570%2F%2F48-1MDH6229.jpg","https://www.gt-world-challenge-europe.com/timthumb.php?w=1000&src=%2Fimages%2Fgallery%2F2024%2F221%2F1540%2F%2F48-2MDH0533.jpg",
        ],
      },
      {
        name: "Daniel Juncadella",
        team: "Manthey EMA",
        number: "911",
        bio: "ทำสถิติพิทสตอประยะสั้นเร็วที่สุดของทีม",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BssSJLagiAifWc1rpwevr7lZq0l0bMhhIg&s",
        carPhotos: [
          "https://images.squarespace-cdn.com/content/v1/60915b23c38bc0460bee7bc8/1747857344828-IZ43X0FUMUJRI1V85O6L/N51_9116%2B911%2B6.jpg","https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/24h-Rennen-Nuerburgring/Race-Report/M23_2777_fine.jpg/jcr%3Acontent/M23_2777_fine.jpg",
        ],
      },
    ],
  },
  "3": {
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
    title: "BMW M4 GT3",
    drivers: [
      {
        name: "Madison Snow",
        team: "Paul Miller Racing",
        number: "1",
        bio: "ในฤดูกาล 2023 เขาและทีม Paul Miller Racing คว้าแชมป์ในคลาส GTD สำหรับรถ #1 BMW M4 GT3",
        portrait:
          "https://bimmerlife.com/wp-content/uploads/2023/07/RD_LRP_22_639-875x583.jpg",
        carPhotos: [
          "https://cdn10.bigcommerce.com/s-4df9uz5/products/41566/images/256391/TS0572-1__93422.1751574527.1280.1280.jpg?c=2",
          "https://therandomvandals.com/wp-content/uploads/2024/08/0I5A5330.jpg",
        ],
      },
      {
        name: "Bryan Sellers",
        team: "Paul Miller Racing",
        number: "1",
        bio: "เมื่อทีม Paul Miller Racing เปลี่ยนมาใช้ BMW M4 GT3 ในฤดูกาล 2022 พวกเขาคว้าชัยชนะในรายการที่ Long Beach ซึ่งเป็น “ชัยชนะแรกของ BMW M4 GT3” ในคลาส GTD ของ IMSA ด้วยคัน #1 ที่เขาขับร่วมกับ Madison Snow",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVoVkUNJZgGvyhODJnDbfjcLmJyIXi10YsOT1XKI4OnWOn_vcx9ogULrvRdqmnOouipiE&usqp=CAU",
        carPhotos: [
          "https://mediapool.bmwgroup.com/cache/P9/202406/P90557302/P90557302-watkins-glen-usa-21-23-june-2024-imsa-weathertech-sportscar-championship-gtd-pro-1-bmw-m4-gt3-paul-m-2248px.jpg",
          "https://mediapool.bmwgroup.com/cache/P9/202204/P90458812/P90458812-paul-miller-racing-no-1-bmw-m4-gt3-grand-prix-of-long-beach-gtd-class-winners-600px.jpg",
        ],
      },
      {
        name: "Kelvin van der Linde",
        team: "WRT",
        number: "32",
        bio: "เขาคว้าชัยชนะในรายการใหญ่หลายครั้ง เช่น ชนะ 24 Hours of Nürburgring (Nürburgring 24h) ในปี 2017, 2022 และ 2025.",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UuzcL7dwq2FVymFrBvP8XNVoHA44qREueg&s",
        carPhotos: [
          "https://sportscar365.com/wp-content/uploads/2025/06/24h-175060516368581d6b-f1df54.jpg",
          "https://www.hightekdiecastmodels.com.au/cdn/shop/files/2025_B12H_Winner_BMW.webp?v=1754168617",
        ],
      },
      {
        name: "Sheldon van der Linde",
        team: "Schubert Motorsport",
        number: "31",
        bio: "ในฤดูกาล 2022 เขาคว้าแชมป์ DTM ขับ BMW M4 GT3 หมายเลข #31 ให้กับทีม Schubert Motorsport.",
        portrait:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGqGLm-csDIwQwVjHtPs-QO5KhxMnrAED2HA&s",
        carPhotos: [
          "https://mediapool.bmwgroup.com/cache/P9/202403/P90543671/P90543671-bmw-m-motorsport-schubert-motorsport-dtm-2024-31-bmw-m4-gt3-sheldon-van-der-linde-rsa-shell-600px.jpg",
          "https://mediapool.bmwgroup.com/cache/P9/202403/P90543670/P90543670-bmw-m-motorsport-schubert-motorsport-dtm-2024-31-bmw-m4-gt3-sheldon-van-der-linde-rsa-shell-2400px.jpg",
        ],
      },
      {
        name: "Valentino Rossi",
        team: "Belgium",
        number: "46",
        bio: "ผลงานของเขาโดดเด่นทั้งใน GT World Challenge Europe และ WEC โดยเฉพาะการชนะที่ Misano และฟอร์มโพลที่ Le Mans ด้วย แม้ว่าในสนามยาวหลายครั้งจะเจออุปสรรค แต่เขายังคงเป็นไดรเวอร์ที่น่าจับตามองในวงการแข่งรถยนต์ GT",
        portrait:
          "https://upload.wikimedia.org/wikipedia/commons/5/56/Valentino_Rossi_2017.jpg",
        carPhotos: [
          "https://cdn.motorsport.com/images/mgl/2eAa7Al2/s1000/46-team-wrt-bmw-m4-gt3-valenti-1.jpg",
          "https://cdn.bmwblog.com/wp-content/uploads/2025/07/bmw-m4-gt3-misano-valentino-rossi-01.jpg",
        ],
      }
    ]
  }
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
