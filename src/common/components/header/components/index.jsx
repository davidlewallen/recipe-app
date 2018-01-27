import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';

const { func, bool } = PropTypes;
const propTypes = {
  logout: func.isRequired,
  handleModalOpen: func.isRequired,
  isAuth: bool.isRequired,
};

const Header = props => (
  <Navbar inverse fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={props.isAuth ? '/dashboard' : '/'}>My Saved Recipes</Link>
      </Navbar.Brand>
      {props.isAuth && (
        <Navbar.Toggle />
      )}
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} onClick={props.handleModalOpen}>
          + Add Recipe
        </NavItem>
        {/* <LinkContainer to="/account">
          <NavItem eventKey={2}>
            Account
          </NavItem>
        </LinkContainer> */}
        <NavItem eventKey={3} onClick={props.logout}>
          Logout
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = propTypes;
export default Header;
