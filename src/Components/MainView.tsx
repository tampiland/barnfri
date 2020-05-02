import React from "react";
import { Container, Col, Row, Alert, Button } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import { SettingsObject } from "../Modules/SettingsObject";
import { Day, isChildfree, isChildFreeMonth } from "../Modules/ChildFree";

interface MainViewProps {
  evalDate: MyDate;
  settings: SettingsObject;
  onChange: (event: any) => void;
  onSteps: (steps: number) => void;
}

function MainView(props: MainViewProps) {
  const todayDate = new MyDate();
  const evalDate = new MyDate(props.evalDate);
  const maxDate = new MyDate();
  maxDate.setDate(maxDate.getDate() + 365);

  function getHeader(date: MyDate): JSX.Element {
    const title = isChildfree(date, props.settings)
      ? "Barnfri!"
      : "Inte barnfri!";
    const alertVariant = isChildfree(date, props.settings)
      ? "success"
      : "danger";

    return (
      <Alert variant={alertVariant} className='pt-3 pb-2 m-4'>
        <h1>{title}</h1>
      </Alert>
    );
  }

  interface ColProps {
    title?: boolean;
    childFree?: boolean;
    today?: boolean;
    selected?: boolean;
    anotherMonth?: boolean;
    value?: string;
    onClick?: (event: any) => void;
  }

  const DayCol: React.FC<ColProps> = (props) => {
    const red = "#f8d7da";
    const green = "#d4edda";
    return (
      <Col
        as={Button}
        className={
          (props.today && " font-weight-bold ") +
          (props.selected
            ? props.childFree
              ? " border-success "
              : " border-danger "
            : " border-white ") +
          (props.anotherMonth ? " text-light " : " text-dark ") +
          ((props.anotherMonth || props.title) && " font-italic ")
        }
        style={{
          padding: "0.5em",
          backgroundColor: props.title ? "#fff" : props.childFree ? green : red,
        }}
        value={props.value}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (props.onClick) props.onClick(e);
        }}>
        {props.children}
      </Col>
    );
  };

  function getMonth(data: Day[]): JSX.Element {
    const start = 0;
    const end = Math.ceil(data.length / 7) - 1;
    const range = Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);

    const gray = "#e2e3e5";

    return (
      <Container className='mt-1 mb-1'>
        <Row
          className='justify-content-center'
          onTouchMove={() => {
            console.log("touch");
          }}>
          <Col xs={3}>
            <Button
              variant='secondary'
              className='border-0 font-weight-bold text-secondary'
              onClick={() => props.onSteps(-1)}
              style={{ background: gray }}>
              {"◄"}
            </Button>
          </Col>
          <Col xs={6}>
            <h3>{props.evalDate.toMonthString()}</h3>
          </Col>
          <Col xs={3}>
            <Button
              variant='secondary'
              className='border-0 font-weight-bold text-secondary'
              onClick={() => props.onSteps(+1)}
              style={{ background: gray }}>
              {"►"}
            </Button>
          </Col>
        </Row>
        <Row>
          <DayCol title>M</DayCol>
          <DayCol title>T</DayCol>
          <DayCol title>O</DayCol>
          <DayCol title>T</DayCol>
          <DayCol title>F</DayCol>
          <DayCol title>L</DayCol>
          <DayCol title>S</DayCol>
        </Row>
        {range.map((weekNo) => {
          return (
            <Row key={`week-${weekNo}`}>
              {data
                .filter((day) => day.weekInMonth === weekNo)
                .map((day, idx) => {
                  return (
                    <DayCol
                      key={`day-${idx}`}
                      childFree={day.isChildfree}
                      today={day.isToday}
                      selected={day.isSelected}
                      anotherMonth={day.isAnotherMonth}
                      onClick={props.onChange}
                      value={day.date.toLocaleDateString()}>
                      {day.date.getDate().toString()}
                    </DayCol>
                  );
                })}
            </Row>
          );
        })}
      </Container>
    );
  }

  return (
    <Container fluid className=''>
      <Row className='justify-content-center align-items-center text-center'>
        <Col xs={12} sm={5}>
          {getHeader(evalDate)}
        </Col>
        <Col xs={12} sm={7}>
          {getMonth(isChildFreeMonth(evalDate, todayDate, props.settings))}
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
