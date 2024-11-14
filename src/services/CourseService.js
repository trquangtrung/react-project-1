import axiosInstance from "../utitls/axiosInstance";

export const CourseService = {
  getCourse(query = "") {
    return axiosInstance.get(`/courses${query}`);
  },
  getCourseBySlug(slug = "") {
    return axiosInstance.get(`/courses/${slug}`);
  },
};
