import React, { useEffect, useRef, useState } from "react";
import { MODAL_TYPE } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import Input from "../Input";
import Button from "../Button";
import { REGEX } from "../../constants/regex";
import ComponentLoading from "../ComponentLoading";

const LoginForm = ({ handleFormSubmit }) => {
  const { handleShowModale, handleCloseModal, messageApi, handleLogin } =
    useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };
  const _onSubmit = (e) => {
    e.preventDefault();

    // start validate
    const errorObject = {};
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập Email";
    } else if (!REGEX.email.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập Password";
    }
    if (Object.keys(errorObject).length > 0) {
      // end validate
      console.log("Form Error", errorObject);
    } else {
      // start loading
      setLoading(true);

      // call API
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });

      // end loading
    }

    setError(errorObject);
  };
  // Ref
  const firstInputRef = useRef();
  useEffect(() => {
    console.log("firstInputRef", firstInputRef?.current);
    firstInputRef?.current?.focus?.();
  }, [firstInputRef]);

  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModale(MODAL_TYPE.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>

      <span className="line">Hoặc</span>
      <form onSubmit={_onSubmit} className="form">
        <Input
          ref={firstInputRef}
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

        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
