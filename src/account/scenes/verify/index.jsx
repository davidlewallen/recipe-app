import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';

const VerifyEmail = () => (
  <Grid>
    <Panel>
      <Panel.Body>
        <div className="align-center">
          To access your account,
          please follow the steps included in the email that was just sent to you.
        </div>
      </Panel.Body>
    </Panel>
  </Grid>
);

export default VerifyEmail;
