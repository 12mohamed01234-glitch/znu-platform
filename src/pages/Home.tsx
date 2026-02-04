import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="hero-wrapper">
          <div className="hero-card">
            <h4>مرحباً بكم في</h4>
            <h1>Zagazig National University</h1>
            <p>
              بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية
            </p>
            <button>استكشف الكليات</button>
          </div>

          <div className="stats">
            <div className="stat">85<br />جائزة</div>
            <div className="stat">450<br />هيئة تدريس</div>
            <div className="stat">15K+<br />طالب</div>
            <div className="stat">12<br />كلية</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
