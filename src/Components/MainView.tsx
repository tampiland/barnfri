import React from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import { SettingsObject } from "../Modules/SettingsObject";
import { isChildfree, isChildFreeMonth } from "../Modules/ChildFree";
import DayCol from "./DayCol";
import DatePicker from "./DatePicker";

interface MainViewProps {
  evalDate: MyDate;
  settings: SettingsObject;
  onChange: (event: any) => void;
  onSteps: (steps: number) => void;
  onReset: () => void;
}

function MainView(props: MainViewProps) {
  const todayDate = new MyDate();
  const evalDate = new MyDate(props.evalDate);
  const maxDate = new MyDate();
  maxDate.setDate(maxDate.getDate() + 365);

  function getHeader(): JSX.Element {
    const title = isChildfree(evalDate, props.settings)
      ? "Barnfri!"
      : "Inte barnfri!";
    const alertVariant = isChildfree(evalDate, props.settings)
      ? "success"
      : "danger";

    return (
      <Alert variant={alertVariant} className='pt-3 pb-2 px-1 m-4'>
        <h3>{title}</h3>
      </Alert>
    );
  }

  function getMonthView(): JSX.Element {
    const data = isChildFreeMonth(evalDate, todayDate, props.settings);

    const start = 0;
    const end = Math.ceil(data.length / 7) - 1;
    const range = Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);

    return (
      <Container className='mt-1 mb-1'>
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
    <Container fluid className='' style={{ maxWidth: "45em" }}>
      <Row className='justify-content-center text-center '>
        <Col xs={12} sm={5} className='pt-sm-3'>
          {getHeader()}
          <DatePicker
            evalDate={props.evalDate}
            onChange={props.onChange}
            onSteps={props.onSteps}
            onReset={props.onReset}
          />
        </Col>
        <Col xs={12} sm={7}>
          {getMonthView()}
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
