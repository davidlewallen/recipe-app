export interface IRecipe {
  ingredients?: Array<String>,
  instructions?: Array<String>,
  totalTime?: String,
  imageURL?: String,
  url: {
    hostname: String,
    href: String,
    link: String,
  },
  title: String,
  created: String,
  processable: Boolean,
}

export interface IPropTypes {
  history: { replace: (path: String) => void },
  location: { pathname: String },
}

export interface IState {
  recipes: Array<IRecipe>,
  isAuth: Boolean,
  loading: Boolean,
  user: {
    email: String,
    username: String,
    _id: String,
  },
}