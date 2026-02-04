import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="p-10 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
        <input className="border w-full mb-3 p-2" placeholder="البريد الإلكتروني" />
        <input
          className="border w-full mb-3 p-2"
          type="password"
          placeholder="كلمة المرور"
        />
        <button className="bg-green-700 text-white px-4 py-2 w-full">
          دخول
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Login;
