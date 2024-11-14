import axiosInstance from "../utitls/axiosInstance";

export const galleryService = {
  getGalleries() {
    return axiosInstance.get("/galleries");
  },
  getGalleriesBySlug(slug = "") {
    return axiosInstance.get(`/galleries/${slug}`);
  },
};
