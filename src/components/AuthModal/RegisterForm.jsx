import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import Input from "../Input";
import { REGEX } from "../../constants/regex";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import Link from "antd/es/typography/Link";

const RegisterForm = ({ handleFormSubmit }) => {
  const { handleShowModale, handleCloseModal, messageApi, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      value: form[registerField],
      error: error[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = (e) => {
    e.preventDefault();
    // start validate
    const errorObject = {};
    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập họ tên";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!REGEX.email.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng Email";
    }
    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập password";
    }
    if (!!!form.confirmPassword) {
      errorObject.confirmPassword = "Vui lòng xác nhận lại mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      errorObject.confirmPassword = "Mật khẩu xác nhận không đúng";
    }

    //end validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Form Error", errorObject);
    } else {
      // start loading
      if (typeof handleRegister === "function") {
        setLoading(true);
        handleRegister(form, () => {
          setTimeout(() => {
            // xử lý loading
            setLoading(false);
          }, 3000);
        });
      }
    }
    setError(errorObject);
  };
  // Ref
  const firstInputRef = useRef();
  useEffect(() => {
    firstInputRef?.current?.focus();
  }, [firstInputRef]);
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModale(MODAL_TYPE.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>

      <span className="line">Hoặc</span>
      <form onSubmit={_onSubmit} className="form">
        <Input
          ref={firstInputRef}
          {...register("name")}
          label="Họ và tên"
          placeholder="Họ và tên"
          required
        />
        <Input
          {...register("email")}
          label="Email"
          placeholder="Email"
          required
        />
        <Input
          {...register("password")}
          label="Password"
          placeholder="Password"
          required
          type="password"
        />
        <Input
          {...register("confirmPassword")}
          label="Nhập lại Password"
          placeholder="Nhập lại Password"
          required
          type="password"
        />

        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách Điều Khoản
          </a>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
