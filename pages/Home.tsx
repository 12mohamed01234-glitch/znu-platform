import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-green-50">
        <h2 className="text-green-700 text-xl mb-2">مرحباً بكم في</h2>
        <h1 className="text-4xl font-bold mb-4">
          Zagazig National University
        </h1>
        <p className="mb-6">
          بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والطلابية
        </p>
        <button className="bg-green-700 text-white px-6 py-2 rounded">
          استكشف الكليات
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
