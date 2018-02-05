// @flow
type Ingredients = String;
type Instructions = String;
type Url = {
  link: String,
  href: String,
  hostname: String,
};

export type Recipe = {
  created_at: String,
  imageURL: String,
  ingredients: Array<Ingredients>,
  instructions: Array<Instructions>,
  title: String,
  totalTime: String,
  url: Url,
  __v: Number,
  _id: String,
}

export type Recipes = Array<Recipe>;
