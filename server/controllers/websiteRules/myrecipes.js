const stripIngredients = (dom) => {
  const containingDiv = dom.window.document.getElementsByClassName('ingredients');
  const containingUl = containingDiv[0].children[0];
  const listOfIngredientsLi = containingUl.children;

  const listOfIngredients = [];
  for (const li of listOfIngredientsLi) {
    listOfIngredients.push(li.textContent);
  }

  return listOfIngredients;
}

const stripInstructions = (dom) => {
  const listOfContainingDiv = dom.window.document.getElementsByClassName('step');

  const listOfInstructions = [];
  let counter = 1;
  for (const div of listOfContainingDiv) {
    for (const child of div.children) {
      if (child.tagName === 'P' && child.textContent) {
        listOfInstructions.push(`${counter}) ${child.textContent}`);
        counter += 1;
      }
    }
  }

  return listOfInstructions;
}

const myrecipes = (dom) => {
  const ingredients = stripIngredients(dom);
  const instructions = stripInstructions(dom);

  return {
    'ingredients': ingredients,
    'instructions': instructions,
  }
}

module.exports = myrecipes;