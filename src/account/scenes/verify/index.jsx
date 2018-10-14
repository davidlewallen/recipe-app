import React from 'react';
import { func, string } from 'prop-types';

import { Account } from '../../../common/utils/api';

import VerifyEmail from './components';

const propTypes = {
  history: { replace: func.isRequired }.isRequired,
  userId: string.isRequired,
  verificationKey: string.isRequired,
};
class VerifyEmailContainer extends React.Component {
  state = { verificationState: 'checking' };

  componentDidMount = async () => {
    await this.verifyEmail();
  };

  verifyEmail = async () => {
    const { history, userId, verificationKey } = this.props;

    try {
      await Account.verify(userId, verificationKey);

      this.setState({ verificationState: 'verified' });

      setTimeout(() => history.replace('/dashboard'), 5000);
    } catch (err) {
      const { response } = err;
      if (response.status === 400 && response.data.verificationExpired) {
        this.setState({ verificationState: 'resend' });
      } else if (response.status === 400 && response.data.nonMatchingKey) {
        this.setState({ verificationState: 'nonMatching' });
      }
      throw err;
    }
  };

  render() {
    const { verificationState } = this.state;

    return <VerifyEmail verificationState={verificationState} />;
  }
}

VerifyEmailContainer.propTypes = propTypes;
export default VerifyEmailContainer;
