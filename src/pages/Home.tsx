import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <div className="hero-card">
            <h4>مرحباً بكم في</h4>
            <h1>Zagazig National University</h1>
            <p>
              بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية
            </p>
            <button>استكشف الكليات</button>
          </div>

          <div className="stats">
            <div className="stat">12<br/>كليات</div>
            <div className="stat">15K+<br/>طلاب</div>
            <div className="stat">450<br/>هيئة تدريس</div>
            <div className="stat">85<br/>جوائز</div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
