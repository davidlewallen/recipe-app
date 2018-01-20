import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const { func } = PropTypes;
const propTypes = {
  logout: func.isRequired,
};

const Header = props => (
  <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/dashboard">My Saved Recipes</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          + Add Recipe
        </NavItem>
        <LinkContainer to="/account">
          <NavItem eventKey={2}>
            Account
          </NavItem>
        </LinkContainer>
        <NavItem eventKey={3} onClick={props.logout}>
          Logout
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = propTypes;
export default Header;
