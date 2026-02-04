import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Faculties = () => {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">الكليات</h1>
        <ul className="space-y-2">
          <li>كلية الهندسة</li>
          <li>كلية الحاسبات</li>
          <li>كلية التمريض</li>
          <li>كلية إدارة الأعمال</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Faculties;
