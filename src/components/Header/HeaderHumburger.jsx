import React from "react";
import { useMainContext } from "../../context/MainContext";

const HeaderHumburger = () => {
  const { isShowNavbar, toggleShowNavbar } = useMainContext();
  const _onMenuClick = (e) => {
    e.stopPropagation();

    toggleShowNavbar?.();
  };
  console.log("HeaderHumburger");
  return (
    <div
      className={`header__humburger ${isShowNavbar ? "--close" : ""}`}
      onClick={_onMenuClick}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default React.memo(HeaderHumburger);
