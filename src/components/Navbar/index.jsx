import { NavLink } from "react-router-dom";
import PATHS from "../../constants/paths";
import { useMainContext } from "../../context/MainContext";
const Navbar = () => {
  const { toggleShowNavbar } = useMainContext();

  const _onLinkClick = (e) => {
    e.stopPropagation();
    toggleShowNavbar?.();
  };
  return (
    <nav className="navbar">
      <ul className="navbar__main" onClick={_onLinkClick}>
        <li className="navbar__link">
          <NavLink to={PATHS.HOME} className="navbar__item">
            Trang chủ
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATHS.ABOUT} className="navbar__item">
            Về CFD Circle
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATHS.COURSE.INDEX} className="navbar__item">
            Khóa học
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATHS.BLOG.INDEX} className="navbar__item">
            Bài viết
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATHS.CONTACT} className="navbar__item">
            Liên hệ
          </NavLink>
        </li>
      </ul>
      <div className="navbar__overlay" />
    </nav>
  );
};

export default Navbar;
