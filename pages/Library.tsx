import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Library = () => {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">المكتبة الرقمية</h1>
        <p>هنا سيتم عرض الكتب والمراجع الرقمية.</p>
      </div>
      <Footer />
    </>
  );
};

export default Library;
