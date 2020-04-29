import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <Navbar variant='dark' bg='dark' className='justify-content-between'>
      <LinkContainer to='/'>
        <Navbar.Brand>Barnfri?</Navbar.Brand>
      </LinkContainer>
      <div className='d-none d-sm-flex'>{props.children}</div>
      <Nav>
        <LinkContainer to='/settings'>
          <Nav.Link>Inställningar</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
