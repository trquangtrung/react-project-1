import axiosInstance from "../utitls/axiosInstance";

export const subcribesService = {
  subcribes(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
};
