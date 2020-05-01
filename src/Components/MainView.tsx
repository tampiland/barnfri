import React from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import { SettingsObject } from "../Modules/SettingsObject";
import { Day, isChildfree, isChildFreeWeek } from "../Modules/ChildFree";

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
        key={day.date}
        className={`justify-content-center ${day.isSelected ? "border" : ""}`}>
        <Col
          xs={5}
          sm={4}
          md={3}
          lg={3}
          xl={2}
          className={`p-0 ${day.isToday ? "font-weight-bold" : ""}`}>
          {day.date}
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
    today?: boolean;
    anotherMonth?: Boolean;
  }

  const ColRed: React.FC<ColProps> = (props) => {
    return (
      <Col
        className={
          (!!props.today ? "border border-dark font-weight-bold" : "") +
          (!!props.anotherMonth ? " text-muted" : "")
        }
        style={{
          padding: "0.5em",
          backgroundColor: "#f8d7da",
        }}>
        {props.children}
      </Col>
    );
  };

  const ColGreen: React.FC<ColProps> = (props) => {
    return (
      <Col
        className={
          (!!props.today ? "border border-dark font-weight-bold" : "") +
          (!!props.anotherMonth ? " text-muted" : "")
        }
        style={{
          padding: "0.5em",
          backgroundColor: "#d4edda",
        }}>
        {props.children}
      </Col>
    );
  };

  function getMonth(timeSpan: Day[]): JSX.Element {
    return (
      <>
        <h3 className='pt-2'>Maj</h3>
        <Container className='small'>
          <Row className=''>
            <Col className='p-0'>Mån</Col>
            <Col className='p-0'>Tis</Col>
            <Col className='p-0'>Ons</Col>
            <Col className='p-0'>Tor</Col>
            <Col className='p-0'>Fre</Col>
            <Col className='p-0'>Lör</Col>
            <Col className='p-0'>Sön</Col>
          </Row>
          <Row>
            <ColRed anotherMonth>27</ColRed>
            <ColRed anotherMonth>28</ColRed>
            <ColRed anotherMonth>29</ColRed>
            <ColGreen anotherMonth>30</ColGreen>
            <ColGreen today>1</ColGreen>
            <ColGreen>2</ColGreen>
            <ColGreen>3</ColGreen>
          </Row>
          <Row>
            <ColGreen>4</ColGreen>
            <ColGreen>5</ColGreen>
            <ColGreen>6</ColGreen>
            <ColRed>7</ColRed>
            <ColRed>8</ColRed>
            <ColRed>9</ColRed>
            <ColRed>10</ColRed>
          </Row>
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
          {getList(isChildFreeWeek(evalDate, todayDate, props.settings))}
          {/* {getMonth(isChildFreeWeek(evalDate, todayDate, props.settings))} */}
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
