import React from 'react';
import PropTypes from 'prop-types';

import { Account } from '../../../utils/api';

import Header from '../components';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func.isRequired }).isRequired,
};

class HeaderContainer extends React.Component {
  logout = async () => {
    await Account.logout();
    this.props.history.replace('/');
  }

  render = () => (
    <Header logout={this.logout} />
  );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
