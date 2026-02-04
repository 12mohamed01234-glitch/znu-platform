import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-green-700 text-white">
      <h1 className="font-bold text-lg">ZNU Platform</h1>
      <div className="space-x-4">
        <Link to="/">الرئيسية</Link>
        <Link to="/faculties">الكليات</Link>
        <Link to="/library">المكتبة</Link>
        <Link to="/login">دخول</Link>
      </div>
    </nav>
  );
};

export default Navbar;
