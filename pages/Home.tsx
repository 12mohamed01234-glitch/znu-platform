import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="hero">
        <h2>مرحباً بكم في</h2>
        <h1>Zagazig National University</h1>
        <p>بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية</p>
        <button>استكشف الكليات</button>
      </div>
    </>
  );
};

export default Home;
