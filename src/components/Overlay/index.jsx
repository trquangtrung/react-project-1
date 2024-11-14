import { useMainContext } from "../../context/MainContext";
const Overlay = () => {
  const { toggleShowNavbar } = useMainContext();
  const _onOverlayClick = (e) => {
    e.stopPropagation();
    toggleShowNavbar?.();
  };
  return <div className="overlay" onClick={_onOverlayClick} />;
};

export default Overlay;
