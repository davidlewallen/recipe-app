import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { IPropTypes } from './types';

const Header: React.StatelessComponent<IPropTypes> = ({
  logout, handleModalOpen, isAuth, handleAcceptedModal,
}) => (
  <Navbar inverse fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={isAuth ? '/dashboard' : '/'}>
          My Saved Recipes
        </Link>
      </Navbar.Brand>
      {isAuth && (
        <Navbar.Toggle />
      )}
    </Navbar.Header>
    {isAuth && (
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/dashboard">
            <NavItem eventKey={1}>
              My Recipes
            </NavItem>
          </LinkContainer>

          <NavItem eventKey={2} onClick={handleModalOpen}>
            + Add Recipe
          </NavItem>

          <NavItem eventKey={3} onClick={handleAcceptedModal}>
            Accepted Websites
          </NavItem>

          <LinkContainer to="/account">
            <NavItem eventKey={4}>
              Account
            </NavItem>
          </LinkContainer>

          <NavItem eventKey={5} onClick={logout}>
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    )}
  </Navbar>
);

export default Header;
