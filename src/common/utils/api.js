import axios from 'axios';

axios.defaults.withCredentials = true;

let API_ROOT = 'http://localhost:3001/api';

if (process.env.REACT_APP_PROXY === 'production')
  API_ROOT = 'https://mysavedrecipes.com/api';
if (process.env.REACT_APP_PROXY === 'beta')
  API_ROOT = 'https://beta.mysavedrecipes.com/api';

const API_RECIPE = `${API_ROOT}/recipe`;
const API_ACCOUNT = `${API_ROOT}/account`;

export const Recipe = {
  getRecipes: () => axios.get(`${API_RECIPE}`),
  submitRecipe: encodedURI => axios.post(`${API_RECIPE}/submit/${encodedURI}`),
  deleteRecipe: recipeId => axios.delete(`${API_RECIPE}/delete/${recipeId}`),
};

export const Account = {
  endpoints: {
    login: `${API_ACCOUNT}/login`,
    register: `${API_ACCOUNT}/register`,
    logout: `${API_ACCOUNT}/logout`,
    auth: `${API_ACCOUNT}/auth`,
    getUser: `${API_ACCOUNT}/user`,
    verify(id, key) {
      return `${API_ACCOUNT}/verify?id=${id}&key=${key}`;
    },
    resendVerification(id) {
      return `${API_ACCOUNT}/verify/resend?id=${id}`;
    },
  },
  login(body) {
    return axios.post(this.endpoints.login, body);
  },
  register(body) {
    return axios.post(this.endpoints.register, body);
  },
  logout() {
    return axios.get(this.endpoints.logout);
  },
  auth() {
    return axios.get(this.endpoints.auth);
  },
  getUser() {
    return axios.get(this.endpoints.getUser);
  },
  verify(id, key) {
    return axios.get(this.endpoints.verify(id, key));
  },
  resendVerification(id) {
    return axios.get(this.endpoints.resendVerification(id));
  },
};

export const Utils = {
  getAcceptedWebsites: () => axios.get(`${API_ROOT}/approved`),
};
