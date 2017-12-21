const stripIngredients = (dom) => {
  const containingUl = dom.window.document.getElementsByClassName('ingredient-list')[0];
  const listOfContainingLi = containingUl.children;

  const listOfIngredients = [];
  for (const li of listOfContainingLi) {
    listOfIngredients.push(`${li.children[0].textContent} ${li.children[1].textContent.trim()}`);
  }

  return listOfIngredients;
}

const stripInstructions = (dom) => {
  const containingDiv = dom.window.document.getElementsByClassName('directions-inner')[0];
  const containingOl = containingDiv.children[1];
  const listOfIngredientsLi = containingOl.children;

  const listOfInstructions = [];
  let counter = 1;
  for (const li of listOfIngredientsLi) {
    // TODO: see if you can remove editor but cleanly
    if (li.children.length === 0) {
      listOfInstructions.push(`${counter}) ${li.textContent}`);
      counter += 1;
    }
  }

  return listOfInstructions;
}

const geniuskitchen = (dom) => {
  const ingredients = stripIngredients(dom);
  const instructions = stripInstructions(dom);

  return {
    'ingredients': ingredients,
    'instructions': instructions,
  };
}

module.exports = geniuskitchen;
