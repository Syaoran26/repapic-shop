import api from '~/config/api';

export interface Credentials {
  email: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await api.post('/auth/login', credentials);
  const user = response.data;
  if (user) {
    localStorage.setItem('token', user.token);
  }
  return user;
};

const logInWithOthers = async (data: any) => {
  const response = await api.post('/auth/login/others', data);
  const user = response.data;
  if (user) {
    localStorage.setItem('token', user.token);
  }
  return user;
};

const loginByRefreshToken = async () => {
  const response = await api.post('/auth/login-refresh');
  const user = response.data;
  if (user) {
    localStorage.setItem('token', user.token);
  }
  return user;
};

const logout = async () => {
  await api.get('/auth/logout');
  localStorage.removeItem('token');
};

const authServices = { login, logout, loginByRefreshToken, logInWithOthers };
export default authServices;
