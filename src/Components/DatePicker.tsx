import React from "react";
import { Nav, FormControl, Button } from "react-bootstrap";
import MyDate from "../Modules/MyDate";

interface DatePickerProps {
  evalDate: MyDate;
  onChange: (event: any) => void;
  onSteps: (steps: number) => void;
  onReset: () => void;
}

function DatePicker(props: DatePickerProps) {
  return (
    <>
      <Nav className='p-1'>
        <Button variant='secondary' onClick={props.onReset}>
          Idag
        </Button>
      </Nav>
      <Nav className='p-1'>
        {/* <InputGroup size='lg' className='flex-nowrap'>
          <InputGroup.Prepend>
            <Button
              id='decrease'
              variant='secondary'
              onClick={() => props.onSteps(-1)}>
              −
            </Button>
          </InputGroup.Prepend> */}
        <FormControl
          type='date'
          value={props.evalDate.toLocaleDateString()}
          onChange={props.onChange}
          style={{ minWidth: "auto", maxWidth: "11em" }}
        />
        {/* <InputGroup.Append>
            <Button
              id='increase'
              variant='secondary'
              onClick={() => props.onSteps(+1)}>
              +
            </Button>
          </InputGroup.Append>
        </InputGroup> */}
      </Nav>
    </>
  );
}

export default DatePicker;
