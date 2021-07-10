import Axios from 'axios';
import Cookies from 'js-cookie';

const api = Axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// api.defaults.headers['X-AUTH-TOKEN'] =
//   'eyJlbWFpbCI6InlsaW5hcmVzQHRoZWluaXQuY29tIiwidXNlcklkIjoxLCJtZXJjaGFudCI6MSwicHJvZmlsZSI6InVzZXIiLCJwYXNzIjoiMTIzNDUiLCJ1c2VyTmFtZSI6InVzZXIiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNjA1NjMxODUyLCJzdWIiOiJ1c2VyIiwiaXNzIjoieWxpbmFyZXNAdGhlaW5pdC5jb20ifQ.7Y7NAAM2HqXBpZfY-S0J6-KerL68iYjQiHIG-xvhrRQ';

api.interceptors.request.use(
  (config) => {
    const configActive = config;
    const token = Cookies.get('token');
    if (token) {
      configActive.headers['X-AUTH-TOKEN'] = `${token}`;
    } else if (!config.url.includes('token')) document.location.href = `/`;
    return configActive;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const addToken = (token) => {
  api.defaults.headers['X-AUTH-TOKEN'] = token;
};

export const removeBearerToken = () => {
  // api.defaults.withCredentials = false;
  delete api.defaults.headers['X-AUTH-TOKEN'];
};

export const routes = {
  login: '/security/get/token',
  me: 'rest/get/config',
  access: `/rest/user/header/es/get/header`,
};

export const getCookies = () => {
  return Cookies;
};

export default api;
