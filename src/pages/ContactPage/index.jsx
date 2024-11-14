import { useState } from "react";
import { subcribesService } from "../../services/SubcribesService";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PATHS from "../../constants/paths";
import useMutation from "../../hook/useMutation";

const ContactPage = () => {
  const navigate = useNavigate();
  const { messageApi } = useAuthContext();
  const {
    data: subcribesData,
    loading: subcribesLoading,
    error: subcribesError,
    execute,
  } = useMutation(subcribesService.subcribes);
  const handleFormSubmit = (formData) => {
    const payload = {
      name: formData?.name || "",
      // title: formData?.topic || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      // description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        messageApi.success("Gửi yêu cầu hỗ trợ thành công!");
        navigate(PATHS.HOME);
      },
      onFail: (error) => {
        console.log("error", error);
        messageApi.error("Gửi yêu cầu hỗ trợ không thành công!");
      },
    });
  };

  // const [loading, setLoading] = useState(false);
  // const { messageApi } = useAuthContext();
  // const handleFormSubmit = async (formData) => {
  //   const payload = {
  //     name: formData?.name || "",
  //     title: formData?.topic || "",
  //     email: formData?.email || "",
  //     phone: formData?.phone || "",
  //     description: formData?.content || "",
  //   };
  //   try {
  //     setLoading(true);
  //     const res = await subcribesService.subcribes(payload);
  //     if (res.status === 201) {
  //       messageApi.success("Gửi yêu cầu hỗ trợ thành công!");
  //       navigate(PATHS.HOME);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
