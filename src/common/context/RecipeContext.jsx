/* eslint-disable react/no-unused-state */

import React, { useState } from 'react';
import { node } from 'prop-types';

const RecipeContext = React.createContext([]);

const { Provider, Consumer } = RecipeContext;

const propTypes = { children: node.isRequired };

function RecipeProvider({ children }) {
  console.log('RecipeProvider rendered');
  const [recipes, setRecipes] = useState([]);

  return <Provider value={{ recipes, setRecipes }}>{children}</Provider>;
}

RecipeProvider.propTypes = propTypes;

export { RecipeProvider, Consumer as RecipeConsumer };
export default RecipeContext;
