import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Tạo context
export const MainContext = createContext({});
export const MainContextProvider = ({ children }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const toggleShowNavbar = () => {
    // cách 1
    $("body").toggleClass("menu-show");
    setIsShowNavbar((prev) => !prev);

    // cách 2
    // if (isShowNavbar) {
    //   $("body").removeClass("menu-show");
    // } else {
    //   $("body").addClass("menu-show");
    // }
    // setIsShowNavbar((prev) => !prev);
  };
  return (
    <MainContext.Provider value={{ isShowNavbar, toggleShowNavbar }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
