import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="links">
        <Link to="/">الرئيسية</Link>
        <Link to="/faculties">الكليات</Link>
        <Link to="/library">المكتبة</Link>
        <Link to="/login">دخول</Link>
      </div>
      <div>ZNU Platform</div>
    </nav>
  );
};

export default Navbar;
