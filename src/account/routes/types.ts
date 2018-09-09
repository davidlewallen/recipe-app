export interface User {
  username: string,
  email: string,
  _id: string,
}

export interface IPropTypes {
  isAuth: boolean,
  updateAuth: () => void,
  user: User,
}
