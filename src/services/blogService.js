import axiosInstance from "../utitls/axiosInstance";

export const blogService = {
  getBlogs(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getBlogBySlug(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/blog-categories${query}`);
  },
  getCategoriesBySlug(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
};
