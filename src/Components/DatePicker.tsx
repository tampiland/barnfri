import React from "react";
import { Navbar, Nav, FormControl, Button, InputGroup } from "react-bootstrap";
import MyDate from "./MyDate";

interface DatePickerProps {
  evalDate: MyDate;
  onChange: (event: any) => void;
  onSteps: (event: any) => void;
  onReset: () => void;
}

function DatePicker(props: DatePickerProps) {
  return (
    <>
      <Navbar
        variant='dark'
        bg='dark'
        expand='sm'
        fixed='bottom'
        className='justify-content-around'>
        <Nav className=''>
          <Button variant='secondary' size='lg' onClick={props.onReset}>
            Idag
          </Button>
        </Nav>
        <Nav className=''>
          <InputGroup size='lg'>
            <InputGroup.Prepend>
              <Button
                id='decrease'
                variant='secondary'
                onClick={() => props.onSteps(-1)}>
                -
              </Button>
            </InputGroup.Prepend>
            <FormControl
              type='date'
              value={props.evalDate.toLocaleDateString()}
              onChange={props.onChange}
              style={{ width: "auto" }}
              className='text-center'
            />
            <InputGroup.Append>
              <Button
                id='increase'
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

export default DatePicker;
