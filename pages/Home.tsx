import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="hero-wrapper">
        <div className="hero-card">
          <h4>مرحباً بكم في</h4>
          <h1>Zagazig National University</h1>
          <p>
            بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية
          </p>
          <button>استكشف الكليات</button>
        </div>
      </div>
    </>
  );
};

export default Home;
