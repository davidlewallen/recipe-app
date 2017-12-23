const stripIngredients = (dom) => {
  const listOfIngredientsLabel = dom.window.document.getElementsByClassName('o-Ingredients__a-ListItemText');

  const listOfIngredients = [];
  for(const label of listOfIngredientsLabel) {
    listOfIngredients.push(label.textContent);
  }

  return listOfIngredients;
}

const stripInstructions = (dom) => {
  const containingDiv = dom.window.document.getElementsByClassName('o-Method__m-Body')[0];

  const listOfP = containingDiv.children;

  const listOfInstructions = [];
  let counter = 1;
  for (const p of listOfP) {
    if (!p.children.length > 0 && p.textContent) {
      listOfInstructions.push(`${counter}) ${p.textContent.trim()}`);
      counter += 1;
    }
  }

  return listOfInstructions
}

const foodnetwork = (dom) => {
  const ingredients = stripIngredients(dom);
  const instructions = stripInstructions(dom);

  return {
    'ingredients': ingredients,
    'instructions': instructions,
  }
}

module.exports = foodnetwork;
