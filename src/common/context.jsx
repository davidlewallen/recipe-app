import React from 'react';

export const AuthContext = React.createContext({
  isAuth: true,
  updateAuth: () => {},
});

export const RecipeContext = React.createContext({
  recipes: [],
  updateRecipes: () => {},
});

export default () => {};
