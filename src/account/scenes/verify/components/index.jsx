import React from 'react';
import { string, func } from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

const propTypes = {
  verificationState: string.isRequired,
  handleResendVerification: func.isRequired,
};

export const Verifying = () => <p>Verifying email address...</p>;

export const Verified = () => (
  <React.Fragment>
    <p>Thank you for verifying your email.</p>
    <p>You will be redirected to the login page in 5 seconds.</p>
  </React.Fragment>
);

const ResendPropTypes = { handleResendVerification: func.isRequired };
export const Resend = ({ handleResendVerification }) => (
  <React.Fragment>
    <p>
      Your email verification expired. Click below to resend verification email.
    </p>
    <Button type="button" bsStyle="primary" onClick={handleResendVerification}>
      Resend Verification Email
    </Button>
  </React.Fragment>
);

Resend.propTypes = ResendPropTypes;

export const Resent = () => (
  <p>
    To access your account, please follow the steps included in the email that
    was just sent to you.
  </p>
);

export const Invalid = () => (
  <React.Fragment>
    <p>Your verification key did not match.</p>
    <p>Please contact support.</p>
  </React.Fragment>
);

const VerifyEmail = ({ verificationState, handleResendVerification }) => (
  <Grid>
    <Panel>
      <Panel.Body className="align-center">
        {verificationState === 'checking' && <Verifying />}
        {verificationState === 'verified' && <Verified />}
        {verificationState === 'resend' && (
          <Resend handleResendVerification={handleResendVerification} />
        )}
        {verificationState === 'nonMatching' && <Invalid />}
        {verificationState === 'resent' && <Resent />}
      </Panel.Body>
    </Panel>
  </Grid>
);

VerifyEmail.propTypes = propTypes;
export default VerifyEmail;
