const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Arial",
        direction: "rtl",
        background: "linear-gradient(135deg, #e9f5ee, #ffffff)",
      }}
    >
      <h1 style={{ fontSize: "42px", color: "#1f7a4d", marginBottom: "10px" }}>
        مرحبًا بكم في
      </h1>

      <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        Zagazig National University
      </h2>

      <p style={{ fontSize: "18px", maxWidth: "600px", textAlign: "center" }}>
        بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والبحثية والطلابية
      </p>

      <button
        style={{
          marginTop: "30px",
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

export default Home;
