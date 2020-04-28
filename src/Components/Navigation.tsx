import React from "react";
import { Navbar, Nav, FormControl, Button, InputGroup } from "react-bootstrap";
import MyDate from "./MyDate";

interface NavigationProps {
  evalDate: MyDate;
  onChange: (event: any) => void;
  onSteps: (event: any) => void;
}

function Navigation(props: NavigationProps) {
  return (
    <>
      <Navbar
        variant='dark'
        bg='dark'
        expand='sm'
        className='justify-content-between'>
        <Navbar.Brand href='/'>Barnfri?</Navbar.Brand>
        {/* <Nav className='justify-content-end'>
          <Nav.Link href='#link'>Settings</Nav.Link>
        </Nav> */}
      </Navbar>
      <Navbar
        variant='dark'
        bg='dark'
        expand='sm'
        fixed='bottom'
        className='justify-content-center'>
        <Nav className='justify-content-center'>
          <InputGroup size='lg'>
            <InputGroup.Prepend>
              <Button
                id='less'
                variant='secondary'
                onClick={() => props.onSteps(-1)}>
                -
              </Button>
            </InputGroup.Prepend>
            <FormControl
              type='date'
              value={props.evalDate.toLocaleDateString()}
              onChange={props.onChange}
              style={{ maxWidth: "11em" }}
            />
            <InputGroup.Append>
              <Button
                id='more'
                variant='secondary'
                onClick={() => props.onSteps(+1)}>
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
