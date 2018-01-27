import React from 'react';

import Homepage from '../components';

class HomepageContainer extends React.Component {
  componentWillMount() {
    console.log('homepage');
  }

  render = () => <Homepage />
}

export default HomepageContainer;
