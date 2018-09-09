export interface PropTypes {
  username: string,
  handleUsername: (username: string) => void,
  password: string,
  handlePassword: (password: string) => void,
  error: {
    value: boolean,
    message: string,
  },
  login: () => void,
}
