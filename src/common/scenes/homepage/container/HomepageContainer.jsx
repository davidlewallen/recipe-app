import React from 'react';

import Homepage from '../components';

import '../assets/styles/index.css';

class HomepageContainer extends React.Component {
  componentWillMount() {
    document.body.classList.add('homepage-img');
  }

  componentWillUnmount = () => {
    document.body.classList.remove('homepage-img');
  }

  render = () => <Homepage />
}

export default HomepageContainer;
