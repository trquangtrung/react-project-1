import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import PATHS from "../constants/paths";
import tokenMethod from "../utitls/token";
import { OrderService } from "../services/OrderService";
// Tạo context cho Auth
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const accessToken = tokenMethod.get()?.accessToken;
    if (accessToken) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const navigate = useNavigate();

  // data
  const [showModal, setShowModal] = useState("");
  const handleShowModale = (modleType) => {
    setShowModal(modleType); // login | register | ""
  };

  const handleCloseModal = () => {
    setShowModal("");
  };

  const handleLogin = async (loginData, callback) => {
    // Xử lý payload
    const payload = { ...loginData };
    // Xử lý API login
    try {
      const res = await AuthService.login(payload);
      // console.log("res", res);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);

        // Lưu token: localStorage || Cookie
        tokenMethod.set({ accessToken, refreshToken });
        // Lấy thông tin profile
        handleGetProfile();

        // Tắt model và thông báo
        message.success("Đăng nhập thành công");
        handleCloseModal?.();
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    // Xử lý payload
    const { name, email, password } = registerData || {};
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };
    // Xử lý API register
    try {
      const res = await AuthService.register(payload);
      if (res?.data?.data?.id) {
        // handle login
        // handleShowModale?.(MODAL_TYPE.login);
        handleLogin({
          email,
          password,
        });

        // Tắt modal & thông báo
        message.success("Đăng ký thành công");
      } else {
        message.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATHS.HOME);
    message.success("Tài khoản đã đăng xuất");
  };

  const handleGetProfile = async () => {
    // call API get profile
    try {
      const res = await AuthService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  // Get My Course
  const handleGetProfileCourse = async () => {
    try {
      const res = await OrderService.getProfileCourse();
      const coursesOrder = res?.data?.data?.orders || [];
      setCourseInfo(coursesOrder);
      console.log("GetProfileCourse", coursesOrder);
    } catch (error) {
      console.log("error", error);
    }
  };
  // Get My Payment
  const handleGetProfilePayment = async () => {
    try {
      const res = await OrderService.getProfilePayment();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
      console.log("GetProfilePayment", payments);
    } catch (error) {
      console.log("error", error);
    }
  };
  // Update Profile
  const handleUpdateProfile = async (formData) => {
    if (!formData) return;
    const payload = {
      firstName: formData.firstName,
      lastName: "",
      facebookURL: formData.facebookURL,
      website: formData.website,
      phone: formData.phone,
      introduce: formData.introduce,
    };
    // console.log("payload", payload);
    try {
      const res = await AuthService.updateProfile(payload);
      console.log("res", res);
      if (res?.data?.data?.id) {
        setProfile(res?.data?.data);
        messageApi.success("Cập nhận thông tin thành công");
        // navigate(PATHS.PROFILE.INDEX);
      }
    } catch (error) {
      console.log("error", error);
      messageApi.error("Cập nhận thông tin thất bại");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showModal,
        profile,
        courseInfo,
        paymentInfo,
        messageApi,
        handleShowModale,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
      }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
