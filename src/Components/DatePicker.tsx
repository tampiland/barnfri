import React, { useRef, useEffect } from "react";
import { Navbar, Nav, FormControl, Button, InputGroup } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import preventDoubleTapZoom from "../Modules/preventDoubleTapZoom";

interface DatePickerProps {
  evalDate: MyDate;
  onChange: (event: any) => void;
  onSteps: (event: any) => void;
  onReset: () => void;
}

function DatePicker(props: DatePickerProps) {
  const clickPlus = useRef<HTMLButtonElement | null>(null);
  const clickMinus = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // if (clickPlus.current != null) clickPlus.current.focus();
    if (clickPlus.current != null) {
      clickPlus.current.addEventListener(
        "touchstart",
        (event: any) => preventDoubleTapZoom(event),
        {
          passive: false,
        }
      );
    }
  }, [clickPlus]);

  useEffect(() => {
    // if (clickPlus.current != null) clickPlus.current.focus();
    if (clickMinus.current != null) {
      clickMinus.current.addEventListener(
        "touchstart",
        (event: any) => preventDoubleTapZoom(event),
        {
          passive: false,
        }
      );
    }
  }, [clickMinus]);

  return (
    <>
      <Navbar
        variant='dark'
        bg='dark'
        fixed='bottom'
        className='justify-content-center flex-wrap p-1'>
        <Nav className='p-1'>
          <Button variant='secondary' size='lg' onClick={props.onReset}>
            Idag
          </Button>
        </Nav>
        <Nav className='p-1'>
          <InputGroup size='lg' className='flex-nowrap'>
            <InputGroup.Prepend>
              <Button
                id='decrease'
                variant='secondary'
                onClick={() => props.onSteps(-1)}
                ref={clickMinus as React.RefObject<any>}>
                −
              </Button>
            </InputGroup.Prepend>
            <FormControl
              type='date'
              value={props.evalDate.toLocaleDateString()}
              onChange={props.onChange}
              style={{ minWidth: "auto", maxWidth: "11em" }}
            />
            <InputGroup.Append>
              <Button
                id='increase'
                variant='secondary'
                onClick={() => props.onSteps(+1)}
                ref={clickPlus as React.RefObject<any>}>
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
