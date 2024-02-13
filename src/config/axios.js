import _axios from "axios";
import getUserToken from "../lib/utils/getUserToken";
const axios = _axios.create({
  baseURL: "https://spend-smart-api.setside.app/api/v1",
});

export default axios;

axios.interceptors.request.use((config) => {
  const token = getUserToken();
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
