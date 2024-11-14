import axiosInstance from "../utitls/axiosInstance";

export const OrderService = {
  orderCourse(payload = {}) {
    return axiosInstance.post(`/orders`, payload);
  },
  getProfileCourse() {
    return axiosInstance.get("/orders/courses/me");
  },
  getProfilePayment() {
    return axiosInstance.get("/orders/me");
  },
};
