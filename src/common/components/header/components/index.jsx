// @flow
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  logout: () => void,
  handleModalOpen: () => void,
  isAuth: boolean,
  handleAcceptedModal: () => void,
}

const Header = (props: Props) => (
  <Navbar inverse fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={props.isAuth ? '/dashboard' : '/'}>My Saved Recipes</Link>
      </Navbar.Brand>
      {props.isAuth && (
        <Navbar.Toggle />
      )}
    </Navbar.Header>
    {props.isAuth && (
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={props.handleModalOpen}>
            + Add Recipe
          </NavItem>

          <NavItem eventKey={2} onClick={props.handleAcceptedModal}>
            Accepted Websites
          </NavItem>

          <LinkContainer to="/account">
            <NavItem eventKey={3}>
              Account
            </NavItem>
          </LinkContainer>

          <NavItem eventKey={4} onClick={props.logout}>
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    )}
  </Navbar>
);

export default Header;
