import axios from "axios";
import AppConfig from "configs/config";
import { auth } from "services/firebase";

export default class Service {
  constructor() {
    this.api.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (e) => {
        if (e.response?.data) return Promise.reject(e.response.data);
        return Promise.reject(e);
      }
    );
  }

  api = axios.create({
    baseURL: AppConfig.apiBaseUrl,
    timeout: AppConfig.timeout,
  });

  static timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
}
