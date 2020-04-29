import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface NavigationProps {}

function Navigation(props: NavigationProps) {
  return (
    <Navbar variant='dark' bg='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>Barnfri?</Navbar.Brand>
      </LinkContainer>
      <Nav className='flex-grow-1 justify-content-end'>
        <LinkContainer to='/settings'>
          <Nav.Link>Inställningar</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
