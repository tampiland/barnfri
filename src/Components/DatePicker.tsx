import React from "react";
import {
  Nav,
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
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
  const gray = "#e2e3e5";

  return (
    <Container>
      <Row className='justify-content-center align-items-center'>
        <Col xs={"6"} sm={"8"} className='p-1'>
          <FormControl
            className='text-center p-0'
            type='text'
            disabled
            value={props.evalDate.toLocaleDateString("sv-SE")}
            onChange={props.onChange}
          />
        </Col>
        <Col xs={"auto"} className='p-1'>
          <Button
            id='decrease'
            variant='secondary'
            onClick={() => props.onSteps(-1)}>
            ◄
          </Button>{" "}
          <Button variant='secondary' onClick={props.onReset}>
            Idag
          </Button>{" "}
          <Button
            id='increase'
            variant='secondary'
            onClick={() => props.onSteps(+1)}>
            ►
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DatePicker;
