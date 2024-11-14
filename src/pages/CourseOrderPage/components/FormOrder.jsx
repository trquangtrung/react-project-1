import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Input from "../../../components/Input";
import { REGEX } from "../../../constants/regex";
import Select from "../../../components/Select";
import { useAuthContext } from "../../../context/AuthContext";

const FormOrder = (props, ref) => {
  const { tags, disabled } = props || {};

  //
  const { profile } = useAuthContext();

  // console.log("courseInfo", courseInfo);
  // Handle profile form
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });
  const [error, setError] = useState({});
  const errorRef = useRef({});
  useEffect(() => {
    if (profile?.id) {
      const { firstName: profileName, email: profileEmail } = profile || {};
      setForm((prev) => ({ ...prev, name: profileName, email: profileEmail }));
    }
  }, [profile?.id]);

  const register = (registerField) => {
    return {
      value: form[registerField],
      error: error[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = () => {
    const errorObject = {};
    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập Họ tên";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập Email";
    } else if (!REGEX.email.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng Email";
    }
    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập Phone";
    } else if (!REGEX.phone.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng Phone";
    }
    if (!!!form.type) {
      errorObject.type = "Vui lòng chọn hình thức học";
    }

    setError(errorObject);
    errorRef.current = errorObject;
    if (Object.keys(errorObject).length > 0) {
      console.log("Form error", errorObject);
      return null;
    } else {
      console.log("Form success", form);
      return form;
    }
  };
  // Ref
  useImperativeHandle(ref, () => {
    return {
      onSubmit: _onSubmit,
      setForm: setForm,
      getError: () => errorRef?.current,
    };
  });

  // ------------------------------------------------
  // set default option
  const defaultOption = {
    label: "---",
    value: "",
  };
  // render tags
  let typeOptions = tags?.map((tag) => {
    return { label: tag, value: tag?.toLowerCase() };
  });
  if (typeOptions?.length > 0) {
    typeOptions = [defaultOption, ...typeOptions];
  } else {
    typeOptions = [defaultOption];
  }

  // console.log("form", form);
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <form action="#" className="form">
          <div className="form-container">
            <Input
              {...register("name")}
              label="Họ tên"
              required
              placeholder="Họ tên"
              disabled={disabled}
            />
            <Input
              {...register("email")}
              disabled
              label="Email"
              required
              placeholder="Email"
            />
          </div>
          <div className="form-container">
            <Input
              {...register("phone")}
              label="Phone"
              required
              placeholder="Phone"
              disabled={disabled}
            />
            <Input
              {...register("type")}
              required
              label="Hình thức học"
              disabled={disabled}
              renderInput={(inputProps) => {
                return <Select options={typeOptions} {...inputProps} />;
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default forwardRef(FormOrder);
