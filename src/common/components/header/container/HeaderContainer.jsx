import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Account, Utils } from '../../../utils/api';

// import Header from '../components';
import SubmitRecipe from '../../submit-recipe';
import AcceptedWebsites from '../../acceptedWebsites/components';

import '../assets/styles/index.css';
import UserContext from '../../../context/UserContext';

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  button: { color: '#fff' },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [acceptedWebsites, setAcceptedWebsite] = useState([]);
  const { userAuth: isAuth, setUserAuth } = useContext(UserContext);

  useEffect(() => {
    const fetchAcceptedWebsites = async () => {
      const { data: websites } = await Utils.getAcceptedWebsites();

      setAcceptedWebsite(websites);
    };

    fetchAcceptedWebsites();
  }, []);

  const logout = () => {
    Account.logout();

    setUserAuth(false);

    history.replace('/');
  };

  return (
    <>
      <SubmitRecipe
        show={showModal}
        handleModalClose={() => setShowModal(false)}
      />
      <AcceptedWebsites
        show={showAcceptedModal}
        handleAcceptedModal={() => setShowAcceptedModal(!showAcceptedModal)}
        acceptedWebsites={acceptedWebsites}
      />

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Saved Recipes
          </Typography>
          {isAuth ? (
            <Button color="inherit" className={classes.button} onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              className={classes.button}
              onClick={() => history.push('/account/login')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
