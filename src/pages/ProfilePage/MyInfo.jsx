import { useEffect, useRef, useState } from "react";
import { REGEX } from "../../constants/regex";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { useAuthContext } from "../../context/AuthContext";

const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();
  const initialForm = useRef({
    firstName: "",
    phone: "",
    email: "",
    facebookURL: "",
    website: "",
    introduce: "",
  });
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const isFormChange =
    JSON.stringify(form) !== JSON.stringify(initialForm.current);
  // console.log("isFormChange", isFormChange);
  // console.log("form", form);
  // console.log("initialForm.current", initialForm.current);
  useEffect(() => {
    if (profile?.id) {
      const { firstName, phone, email, facebookURL, website, introduce } =
        profile || {};
      const newForm = {
        firstName,
        phone,
        email,
        facebookURL,
        website,
        introduce,
      };
      setForm(newForm);
      initialForm.current = newForm;
    }
  }, [profile?.id]);

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = {};
    if (!!!form.firstName) {
      errorObject.firstName = "Vui lòng nhập tên";
    }
    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!REGEX.phone.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }
    if (form.facebookURL && !REGEX.url.test(form.facebookURL)) {
      errorObject.facebookURL = "Vui lòng nhập đúng định dạng Facebook Url";
    }
    if (form.website && !REGEX.url.test(form.website)) {
      errorObject.website = "Vui lòng nhập đúng định dạng Website";
    }

    setError(errorObject);
    // end validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Form Error", errorObject);
    } else {
      console.log("Form Success", form);
      handleUpdateProfile?.(form); // sau khi update form thì
      initialForm.current = { ...form }; // cập nhật lại giá trị của initial
    }
  };
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="form">
        <div className="form-container">
          <Input
            {...register("firstName")}
            label="Họ và tên"
            placeholder="Họ và tên"
            required
          />
          <Input
            {...register("phone")}
            label="Số điện thoại"
            placeholder="Số điện thoại"
            required
          />
        </div>
        <div className="form-container">
          <Input
            {...register("email")}
            disabled
            label="Email"
            placeholder="Email"
          />
          <Input
            {...register("password")}
            value={"********"}
            disabled
            label="Mật khẩu"
            placeholder="Mật khẩu"
          />
        </div>
        <Input
          {...register("facebookURL")}
          label="Facebook URL"
          placeholder="Facebook URL"
        />
        <Input {...register("website")} label="Website" placeholder="Website" />
        <Input
          {...register("introduce")}
          label="Giới thiệu bản thân"
          placeholder="Giới thiệu bản thân"
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
        />

        {/* <p className="noti">Cập nhận thông tin thành công</p> */}
        <Button
          // variant="primary"
          style={{
            width: "100%",
            pointerEvents: isFormChange ? "all" : "none",
          }}
          onClick={_onSubmit}
          disabled={!isFormChange}
        >
          Lưu lại
        </Button>
      </div>
    </div>
  );
};

export default MyInfo;
