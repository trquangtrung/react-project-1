import axiosInstance from "../utitls/axiosInstance";

export const teamService = {
  getTeams() {
    return axiosInstance.get("/teams");
  },
  getTeamsBySlug(slug = "") {
    return axiosInstance.get(`/teams/${slug}`);
  },
};
