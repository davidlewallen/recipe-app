import React from 'react';
import PropTypes from 'prop-types';

import { Account } from '../../../utils/api';

import Homepage from '../components';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
};
class HomepageContainer extends React.Component {
  componentWillMount() {
    this.checkIsAuth();
  }

  checkIsAuth = async () => {
    try {
      const { data } = await Account.auth();

      if (data.isAuth) {
        this.props.history.replace('/dashboard');
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  render = () => <Homepage />
}

HomepageContainer.propTypes = propTypes;
export default HomepageContainer;
