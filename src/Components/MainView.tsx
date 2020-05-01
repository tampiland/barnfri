import React from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import { SettingsObject } from "../Modules/SettingsObject";
import {
  Day,
  isChildfree,
  isChildFreeWeek,
  isChildFreeMonth,
} from "../Modules/ChildFree";

interface MainViewProps {
  evalDate: MyDate;
  settings: SettingsObject;
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
      <Alert variant={alertVariant} className='pt-3 pb-2'>
        <h1>{title}</h1>
      </Alert>
    );
  }

  function getList(timeSpan: Day[]): JSX.Element {
    const rows = timeSpan.map((day) => (
      <Row
        key={day.date.toLocaleDateString()}
        className={`justify-content-center ${day.isSelected ? "border" : ""}`}>
        <Col
          xs={5}
          sm={4}
          md={3}
          lg={3}
          xl={2}
          className={`p-0 ${day.isToday ? "font-weight-bold" : ""}`}>
          {day.date.toLocaleDateString()}
        </Col>
        <Col
          xs={5}
          sm={4}
          md={3}
          lg={3}
          xl={2}
          className={`p-0 ${day.isChildfree ? "text-success" : "text-danger"}`}>
          {day.weekday}
        </Col>
      </Row>
    ));

    return <Container>{rows}</Container>;
  }

  interface ColProps {
    //id: string;
    childFree: boolean;
    today?: boolean;
    selected?: boolean;
    anotherMonth?: boolean;
  }

  const DayCol: React.FC<ColProps> = (props) => {
    const red = "#f8d7da";
    const green = "#d4edda";
    return (
      <Col
        className={
          "border" +
          (props.today && " font-weight-bold ") +
          (props.selected && " border-dark ") +
          (props.anotherMonth && " text-muted font-italic ")
        }
        style={{
          padding: "0.5em",
          backgroundColor: props.childFree ? green : red,
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

    return (
      <>
        <h3 className='pt-2'>Månad</h3>
        <Container className='small'>
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
                        anotherMonth={day.isAnotherMonth}>
                        {day.date.getDate().toString()}
                      </DayCol>
                    );
                  })}
              </Row>
            );
          })}
        </Container>
      </>
    );
  }

  return (
    <Container fluid className='p-4'>
      <Row className='justify-content-center align-items-center text-center'>
        <Col xs={12} sm={5}>
          {getHeader(evalDate)}
        </Col>
        <Col xs={12} sm={7}>
          {/* {getList(isChildFreeWeek(evalDate, todayDate, props.settings))} */}
          {getMonth(isChildFreeMonth(evalDate, todayDate, props.settings))}
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
