import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Footer } from "../components/Footer/Footer";

export function AboutPage() {
  const { dispatch } = useContext(AppContext);
  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };
  const team = [
    {
      name: "Nguyễn Văn CEO",
      role: "Founder & CEO",
      emoji: "👨‍💼",
      desc: "10 năm kinh nghiệm bán lẻ điện tử",
    },
    {
      name: "Trần Thị CTO",
      role: "CTO",
      emoji: "👩‍💻",
      desc: "Ex-Google Engineer, kiến trúc hệ thống",
    },
    {
      name: "Lê Văn CMO",
      role: "CMO",
      emoji: "👨‍🎨",
      desc: "Chuyên gia marketing số & TMĐT",
    },
    {
      name: "Phạm Thị CS",
      role: "Head of CS",
      emoji: "👩‍🎯",
      desc: "Đảm bảo 99% khách hàng hài lòng",
    },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span
              onClick={() => nav("home")}
              style={{ cursor: "pointer", color: "var(--accent)" }}
            >
              Trang chủ
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>Về chúng tôi</span>
          </div>
          <h1 className="page-title">ℹ️ Về TechZone</h1>
        </div>
      </div>
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 24px" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(0,212,255,.08),rgba(123,47,247,.08))",
            border: "1px solid rgba(0,212,255,.15)",
            borderRadius: 20,
            padding: "48px 40px",
            marginBottom: 28,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(0,212,255,.06),transparent)",
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 60, marginBottom: 14 }}>🚀</div>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 30,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Sứ mệnh của <span style={{ color: "var(--accent)" }}>TechZone</span>
          </h2>
          <p
            style={{
              color: "var(--muted2)",
              lineHeight: 1.9,
              maxWidth: 580,
              margin: "0 auto",
              fontSize: 15,
            }}
          >
            Thành lập năm 2020, TechZone mang đến công nghệ chính hãng với giá
            tốt nhất. Chúng tôi phục vụ hơn{" "}
            <strong style={{ color: "var(--accent)" }}>
              500,000 khách hàng
            </strong>{" "}
            trên toàn quốc với cam kết 100% chính hãng và hỗ trợ 24/7.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 28,
          }}
        >
          {[
            ["🏆", "Uy tín #1", "thương hiệu điện tử tin dùng nhất 2023"],
            ["🌍", "63 tỉnh", "giao hàng toàn quốc 2–5 ngày"],
            ["🔒", "100%", "sản phẩm chính hãng có tem BH"],
            ["⭐", "4.9/5", "đánh giá TB từ 500K khách"],
          ].map(([icon, num, sub]) => (
            <div
              key={num}
              className="card"
              style={{ padding: 18, textAlign: "center" }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 28 }}>
          <div className="section-label" style={{ marginBottom: 6 }}>
            // Đội ngũ
          </div>
          <h3
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            Những người{" "}
            <span style={{ color: "var(--accent)" }}>xây dựng TechZone</span>
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
              gap: 14,
            }}
          >
            {team.map((t) => (
              <div
                key={t.name}
                className="card"
                style={{ padding: 20, textAlign: "center" }}
              >
                <div style={{ fontSize: 44, marginBottom: 8 }}>{t.emoji}</div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <span
                  className="badge badge-cyan"
                  style={{ fontSize: 9, marginBottom: 8 }}
                >
                  {t.role}
                </span>
                <div
                  style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}
                >
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => nav("products")}
          >
            🛍️ Khám phá sản phẩm ngay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
