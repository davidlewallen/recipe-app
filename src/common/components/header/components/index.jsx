import React from 'react';
import { func, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const propTypes = {
  logout: func.isRequired,
  handleModalOpen: func.isRequired,
  isAuth: bool.isRequired,
  handleAcceptedModal: func.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  button: { color: '#fff' },
}));

const Header = ({ logout, handleModalOpen, isAuth, handleAcceptedModal }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          My Saved Recipes
        </Typography>
        <Button
          color="inherit"
          className={classes.button}
          onClick={() => history.push('/account/login')}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
    // <Navbar inverse fluid collapseOnSelect>
    //   <Navbar.Header>
    //     <Navbar.Brand>
    //       <Link to={isAuth ? '/dashboard' : '/'}>My Saved Recipes</Link>
    //     </Navbar.Brand>
    //     {isAuth && <Navbar.Toggle />}
    //   </Navbar.Header>
    //   {isAuth && (
    //     <Navbar.Collapse>
    //       <Nav pullRight>
    //         <LinkContainer to="/dashboard">
    //           <NavItem eventKey={1}>My Recipes</NavItem>
    //         </LinkContainer>

    //         <NavItem eventKey={2} onClick={handleModalOpen}>
    //           + Add Recipe
    //         </NavItem>

    //         <NavItem eventKey={3} onClick={handleAcceptedModal}>
    //           Accepted Websites
    //         </NavItem>

    //         <LinkContainer to="/account">
    //           <NavItem eventKey={4}>Account</NavItem>
    //         </LinkContainer>

    //         <NavItem eventKey={5} onClick={logout}>
    //           Logout
    //         </NavItem>
    //       </Nav>
    //     </Navbar.Collapse>
    //   )}
    // </Navbar>
  );
};

Header.propTypes = propTypes;
export default Header;
