const items = [
  "npm run dev 로 로컬 서버 띄우기",
  "page.js 수정하고 브라우저에서 확인하기",
];

export default function Home() {
  return (
    <main>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "40px 48px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          maxWidth: 520,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 14,
            letterSpacing: 2,
            color: "#6b7280",
            margin: 0,
          }}
        >
          2026 · 클라우드컴퓨팅 · 1주차
        </p>

        <h1 style={{ marginTop: 16 }}>☁️ Hello Cloud!</h1>

        <p style={{ color: "#4b5563", marginTop: 0 }}>
          클라우드컴퓨팅 수업 첫 실습으로 만든 페이지입니다.
        </p>

        <ul
          style={{
            textAlign: "left",
            display: "inline-block",
            marginTop: 24,
            paddingLeft: 20,
            color: "#374151",
            fontSize: 16,
            lineHeight: 1.9,
          }}
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p style={{ fontSize: 14, color: "#9ca3af", marginTop: 24 }}>
          made by 류태혁
        </p>
      </div>
    </main>
  );
}
