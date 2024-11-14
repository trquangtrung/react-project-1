import PageLoading from "../components/PageLoading";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { Outlet } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import { AuthContextProvider } from "../context/AuthContext";
import styled from "styled-components";

const MainLayoutStyled = styled.div`
  input {
    background: black !important;
  }
`;
const MainLayout = () => {
  return (
    <MainLayoutStyled className="MainLayout">
      <MainContextProvider>
        <AuthContextProvider>
          {/* <PageLoading /> */}
          <Navbar />
          <Overlay />
          <Header />
          {/* Main UI */}
          <Outlet />

          {/* End Mail UI */}
          <Footer />
          {/* Modal Đăng Nhập / Đăng Ký */}
          <AuthModal />
        </AuthContextProvider>
      </MainContextProvider>
    </MainLayoutStyled>
  );
};

export default MainLayout;
