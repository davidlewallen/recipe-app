import axios from 'axios';

const API_ROOT = '/api';
const API_RECIPE = `${API_ROOT}/recipe`;
const API_ACCOUNT = `${API_ROOT}/account`;

export const Recipe = {
  getRecipes: () => axios.get(`${API_RECIPE}`),
  submitRecipe: encodedURI => axios.post(`${API_RECIPE}/submit/${encodedURI}`),
  deleteRecipe: recipeId => axios.delete(`${API_RECIPE}/delete/${recipeId}`),
};

export const Account = {
  login: body => axios.post(`${API_ACCOUNT}/login`, body),
  register: body => axios.post(`${API_ACCOUNT}/register`, body),
  logout: () => axios.get(`${API_ACCOUNT}/logout`),
  auth: () => axios.get(`${API_ACCOUNT}/auth`),
};
