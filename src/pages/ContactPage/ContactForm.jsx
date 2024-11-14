import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import { REGEX } from "../../constants/regex";

const ContactForm = ({ handleFormSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });
  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = () => {
    // e.preventDefault();
    // start validate
    const errorObject = {};
    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập tên";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!REGEX.email.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!REGEX.phone.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }
    if (!!!form.topic) {
      errorObject.topic = "Vui lòng chọn topic";
    }
    if (!!!form.content) {
      errorObject.content = "Vui lòng điền nội dung";
    }
    // end validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Form error", errorObject);
    } else {
      console.log("Form success", form);
      handleFormSubmit?.(form);
    }

    setError(errorObject);
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>

      <Input
        {...register("name")}
        label="Họ tên"
        required
        // name="name"
        // error={error.name}
        // value={form.name}
        // onChange={_onChange}
        placeholder="Họ tên"
      />
      <Input
        {...register("email")}
        label="Email"
        required
        placeholder="Email"
      />
      <Input
        {...register("phone")}
        label="Phone"
        required
        placeholder="Phone"
      />

      <Input
        {...register("topic")}
        name="topic"
        label="Chủ đề cần hỗ trợ"
        required
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "---" },
                { value: "responsive", label: "Web Responsive" },
                { value: "react", label: "React" },
                { value: "js", label: "JavaScript" },
              ]}
              {...inputProps}
            />
          );
        }}
      />

      <Input
        {...register("content")}
        name="content"
        label="Nội dung"
        placeholder="Nội dung"
        required
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      />

      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
