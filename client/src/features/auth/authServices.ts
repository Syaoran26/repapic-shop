import api from '~/config/api';

export interface Credentials {
  email: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await api.post('/auth/login', credentials);
  const user = response.data;
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  return user;
};

const loginByRefreshToken = async () => {
  const response = await api.post('/auth/login-refresh');
  const user = response.data;
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  return user;
};

const logout = async () => {
  await api.get('/auth/logout');
  localStorage.removeItem('user');
};

const authServices = { login, logout, loginByRefreshToken };
export default authServices;
