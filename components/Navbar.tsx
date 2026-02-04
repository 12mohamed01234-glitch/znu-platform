import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="links">
        <Link to="/">الرئيسية</Link>
        <a href="#">الكليات</a>
        <a href="#">المكتبة</a>
        <a href="#">دخول</a>
      </div>
      <div>ZNU Platform</div>
    </nav>
  );
};

export default Navbar;
