import React from 'react';
import { func, string, shape } from 'prop-types';

import { Account } from '../../../common/utils/api';

import VerifyEmail from './components';

const propTypes = {
  history: shape({ replace: func.isRequired }).isRequired,
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
        return this.setState({ verificationState: 'resend' });
      }

      if (response.status === 400 && response.data.nonMatchingKey) {
        return this.setState({ verificationState: 'nonMatching' });
      }
    }
  };

  handleResendVerification = async () => {
    const { userId } = this.props;

    await Account.resendVerification(userId);

    this.setState({ verificationState: 'resent' });
  };

  render() {
    const { verificationState } = this.state;

    return (
      <VerifyEmail
        verificationState={verificationState}
        handleResendVerification={this.handleResendVerification}
      />
    );
  }
}

VerifyEmailContainer.propTypes = propTypes;
export default VerifyEmailContainer;
