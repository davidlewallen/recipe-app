import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import '../assets/styles/index.css';

const Homepage = () => (
  <Box>
    <Container>
      <span>My Saved Recipes</span>
      <Link to="/account/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </Container>
  </Box>
);
export default Homepage;
