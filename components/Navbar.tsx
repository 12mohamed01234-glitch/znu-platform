import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>ZNU Platform</h2>
      <div>
        <Link to="/">الرئيسية</Link>
        <Link to="/faculties">الكليات</Link>
        <Link to="/library">المكتبة</Link>
        <Link to="/login">دخول</Link>
      </div>
    </nav>
  );
};

export default Navbar;
