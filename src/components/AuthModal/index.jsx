import { MODAL_TYPE } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ReactDom from "react-dom";
const AuthModal = () => {
  const { showModal, handleCloseModal } = useAuthContext();
  return ReactDom.createPortal(
    <div className={`modal modallogin ${showModal ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={handleCloseModal}>
          <img src="img/close_icon.svg" alt="CFD Register" />
        </div>
        {showModal === MODAL_TYPE.register && <RegisterForm />}
        {showModal === MODAL_TYPE.login && <LoginForm />}
      </div>
      <div className="modal__overlay" onClick={handleCloseModal} />
    </div>,
    document.body
  );
};

export default AuthModal;
