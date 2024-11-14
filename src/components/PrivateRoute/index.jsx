import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import tokenMethod from "../../utitls/token";
import PATHS from "../../constants/paths";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";

const PrivateRoute = ({ redirectPath = "/" }) => {
  //   console.log("Private Route");
  const { handleShowModale } = useAuthContext();
  if (!tokenMethod.get()) {
    handleShowModale(MODAL_TYPE.login);
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
