const stripIngredients = (dom) => {
  const listOfIngredientsSpan = dom.window.document.getElementsByClassName('recipe-ingred_txt');
  
  const listOfIngredients = [];
  for (const label of listOfIngredientsSpan) {
    if (label.className === 'recipe-ingred_txt added') {
      listOfIngredients.push(label.textContent);
    }
  }

  return listOfIngredients;
}

const stripInstructions = (dom) => {
  const listOfInstructionsSpan = dom.window.document.getElementsByClassName('recipe-directions__list--item');

  const listOfInstructions = [];
  let counter = 1;
  for (const span of listOfInstructionsSpan) {
    if (span.textContent) {
      listOfInstructions.push(`${counter}) ${span.textContent.trim()}`);
      counter += 1;
    }
  }

  return listOfInstructions;
}

const stripTitle = (dom) => {
  const title = dom.window.document.getElementsByClassName('recipe-summary__h1')[0].textContent;

  return title;
}

const allrecipes = (dom) => {
  const ingredients = stripIngredients(dom);
  const instructions = stripInstructions(dom);
  const title = stripTitle(dom);

  return {
    'ingredients': ingredients,
    'instructions': instructions,
    'title': title,
  }
}

module.exports = allrecipes;
