import axiosInstance from "../utitls/axiosInstance";

export const questionsService = {
  getQuestions() {
    return axiosInstance.get("/questions");
  },
  getQuestionsById(id = "") {
    return axiosInstance.get(`/questions/${id}`);
  },
};
