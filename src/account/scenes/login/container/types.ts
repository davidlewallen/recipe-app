export interface IPropTypes {
  history: {
    replace: (path: String) => void,
  },
  updateAuth: (value: Boolean) => void,
}

export interface IState {
  username: string,
  password: string,
  error: {
    value: boolean,
    message: string,
  }
}
