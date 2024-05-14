import axios, { InternalAxiosRequestConfig } from 'axios';
import User from '~/common/types/UserType';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const user: User = JSON.parse(sessionStorage.getItem('user') || 'null');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const { config } = err;

    if (config.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !config._retry) {
        config._retry = true;

        try {
          const res = await api.put('/auth/refresh-token');
          let user = JSON.parse(sessionStorage.getItem('user') || 'null');
          user.token = res.data?.token;
          sessionStorage.setItem('user', JSON.stringify(user));
          return api(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default api;
