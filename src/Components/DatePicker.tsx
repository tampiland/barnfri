import React from "react";
import { Nav, FormControl, InputGroup, Button } from "react-bootstrap";
import MyDate from "../Modules/MyDate";

interface DatePickerProps {
  evalDate: MyDate;
  onChange: (event: any) => void;
  onSteps: (steps: number) => void;
  onReset: () => void;
}

function DatePicker(props: DatePickerProps) {
  const year = props.evalDate.getFullYear();
  const month = props.evalDate.getMonth();
  const day = props.evalDate.getDate();
  console.log(`${year}-${month}-${day}`);
  return (
    <>
      <Nav className='p-1'>
        <Button variant='secondary' onClick={props.onReset}>
          Idag
        </Button>
      </Nav>
      <Nav className='p-1'>
        <InputGroup className='flex-nowrap'>
          <InputGroup.Prepend>
            <Button
              id='decrease'
              variant='secondary'
              onClick={() => props.onSteps(-1)}>
              ◄
            </Button>
          </InputGroup.Prepend>
          <FormControl
            className='text-center'
            type='date'
            value={props.evalDate.toLocaleDateString("sv-SE")}
            onChange={props.onChange}
            style={{ minWidth: "auto", maxWidth: "11em" }}
          />
          <InputGroup.Append>
            <Button
              id='increase'
              variant='secondary'
              onClick={() => props.onSteps(+1)}>
              ►
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Nav>
    </>
  );
}

export default DatePicker;
