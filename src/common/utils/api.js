import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://api.mysavedrecipes.com/api'
    : '/api';
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
    return axios.post(this.endpoints.login, body, { withCredentials: true });
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
    return axios.get(this.endpoints.getUser, { withCredentials: true });
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
