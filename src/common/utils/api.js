// @flow
import axios from 'axios';

import { type Recipes, type Recipe as RecipeType } from '../types';

const API_ROOT = '/api';
const API_RECIPE = `${API_ROOT}/recipe`;
const API_ACCOUNT = `${API_ROOT}/account`;

export const Recipe: {
  getRecipes: () => Promise<Recipes>,
  submitRecipe: (encodedURI: string) => Promise<RecipeType>,
  deleteRecipe: (recipeId: string) => Promise<Recipes>,
} = {
  getRecipes: () => axios.get(`${API_RECIPE}`),
  submitRecipe: encodedURI => axios.post(`${API_RECIPE}/submit/${encodedURI}`),
  deleteRecipe: recipeId => axios.delete(`${API_RECIPE}/delete/${recipeId}`),
};

type User = {
  _id: String,
  username: String,
  savedRecipes: Recipes,
};

export const Account: {
  login: (body: { username: String, password: String }) => Promise<boolean>,
  register: (body: { username: String, password: String, email: String }) => Promise<User>,
  logout: () => void,
  auth: () => Promise<{ isAuth: boolean }>,
  getUser: () => Promise<User>,
} = {
  login: body => axios.post(`${API_ACCOUNT}/login`, body),
  register: body => axios.post(`${API_ACCOUNT}/register`, body),
  logout: () => axios.get(`${API_ACCOUNT}/logout`),
  auth: () => axios.get(`${API_ACCOUNT}/auth`),
  getUser: () => axios.get(`${API_ACCOUNT}/user`),
};

export const Utils: { getAcceptedWebsites: () => Array<String> } = {
  getAcceptedWebsites: () => axios.get(`${API_ROOT}/approved`),
};
