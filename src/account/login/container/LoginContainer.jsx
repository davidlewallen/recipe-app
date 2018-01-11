import React, { Component } from 'react';

import Login from '../components';

class LoginContainer extends Component {
  componentWillMount = () => {
    console.log('LoginContainer is mounting');
  }

  render = () => (<Login />)
}

export default LoginContainer;
