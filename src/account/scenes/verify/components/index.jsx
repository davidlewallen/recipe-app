import React from 'react';
import { string } from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';

const propTypes = { verificationState: string.isRequired };

const Verifying = () => (
  <p className="align-cente r">
    Verifying email address...
  </p>
);

const Verified = () => (
  <React.Fragment>
    <p className="align-center">
      Thank you for verifying your email.
    </p>
    <p className="align-center">
      You will be redirected to the login page in 5 seconds.
    </p>
  </React.Fragment>
);

const Resend = () => (
  <React.Fragment>
    <p className="align-center">
      Your email verification expired. Click below to resend verification email.
    </p>
    <button type="button">
      Resend Verification Email
    </button>
  </React.Fragment>
);

const Invalid = () => (
  <React.Fragment>
    <p className="align-center">
      Your verification key did not match.
    </p>
    <p className="align-center">
      Please contact support.
    </p>
  </React.Fragment>
);

const VerifyEmail = ({ verificationState }) => (
  <Grid>
    <Panel>
      <Panel.Body>
        {verificationState === 'checking' && <Verifying />}
        {verificationState === 'verified' && <Verified />}
        {verificationState === 'resend' && <Resend />}
        {verificationState === 'nonMatching' && <Invalid />}
      </Panel.Body>
    </Panel>
  </Grid>
);

VerifyEmail.propTypes = propTypes;
export default VerifyEmail;
