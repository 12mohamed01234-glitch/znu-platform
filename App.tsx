import React from "react";

const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
        fontFamily: "Arial",
        background: "linear-gradient(135deg, #e9f5ee, #ffffff)",
      }}
    >
      <h1 style={{ fontSize: "42px", color: "#1f7a4d" }}>
        مرحبًا بكم في
      </h1>

      <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
        Zagazig National University
      </h2>

      <p style={{ marginTop: "10px", fontSize: "18px" }}>
        بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية
      </p>

      <button
        style={{
          marginTop: "25px",
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#1f7a4d",
          color: "white",
          cursor: "pointer",
        }}
      >
        استكشاف الكليات
      </button>
    </div>
  );
};

export default App;
