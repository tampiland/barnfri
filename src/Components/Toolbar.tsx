import React from "react";
import { Navbar, Nav } from "react-bootstrap";

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return (
    <Navbar
      variant='dark'
      bg='dark'
      fixed='bottom'
      className='justify-content-center flex-wrap p-1 d-flex d-sm-none'>
      <Nav>{props.children}</Nav>
    </Navbar>
  );
};

export default Toolbar;
