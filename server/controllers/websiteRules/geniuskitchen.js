const formatTime = require('../../utils/formatTime');

const stripIngredients = (dom) => {
  const containingUl = (
    dom
    .window
    .document
    .getElementsByClassName('ingredient-list')[0]
  );
  const listOfContainingLi = containingUl.children;

  const listOfIngredients = [];
  for (const li of listOfContainingLi) {
    listOfIngredients.push(`${li.children[0].textContent} ${li.children[1].textContent.trim()}`);
  }

  return listOfIngredients;
};

const stripInstructions = (dom) => {
  const containingDiv = (
    dom
    .window
    .document
    .getElementsByClassName('directions-inner')[0]
  );
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
};

const stripTitle = (dom) => {
  const title = (
    dom
    .window
    .document
    .getElementsByClassName('recipe-header')[0].children[1].textContent
  );

  return title;
};

const stripTime = (dom) => {
  const totalTime = (
    dom
    .window
    .document
    .getElementsByClassName('time')[0].textContent.split(':')[1].trim()
  );

  return formatTime(totalTime);
};

const geniuskitchen = (dom) => {
  const ingredients = stripIngredients(dom);
  const instructions = stripInstructions(dom);
  const title = stripTitle(dom);
  const totalTime = stripTime(dom);

  return {
    'ingredients': ingredients,
    'instructions': instructions,
    'title': title,
    'totalTime': totalTime
  };
};

module.exports = {
  strip: geniuskitchen,
  stripIngredients,
  stripInstructions,
  stripTitle,
  stripTime,
};
