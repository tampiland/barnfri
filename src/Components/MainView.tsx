import React from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import MyDate from "../Modules/MyDate";
import { SettingsHelper, SettingsObject } from "../SettingsObject";

interface Day {
  isToday: boolean;
  isSelected: boolean;
  date: string;
  weekday: string;
  isChildfree: boolean;
}

interface MainViewProps {
  evalDate: MyDate;
  settings: SettingsObject;
}

function MainView(props: MainViewProps) {
  const todayDate = new MyDate();
  const evalDate = new MyDate(props.evalDate);
  const maxDate = new MyDate();
  maxDate.setDate(maxDate.getDate() + 365);

  function getTimeSpan(date: MyDate, today: MyDate): Day[] {
    const array = [-3, -2, -1, 0, 1, 2, 3, 4];
    const surrDates = array.map(
      (diff) => new MyDate(date.valueOf() + diff * 1000 * 3600 * 24)
    );

    const timeSpan: Day[] = surrDates.map((day) => ({
      isToday: !!(day.toLocaleDateString() === today.toLocaleDateString()),
      isSelected: !!(day.toLocaleDateString() === date.toLocaleDateString()),
      date: day.toLocaleDateString(),
      weekday: day.toWeekdayString(),
      isChildfree: getChildfree(
        day,
        props.settings.selectedWeekLeave === "jämna",
        SettingsHelper.weekdayOptions.indexOf(
          props.settings.selectedWeekdayLeave
        ),
        SettingsHelper.weekdayOptions.indexOf(
          props.settings.selectedWeekdayFetch
        ),
        props.settings.selectedWeekFetch === "efterföljande"
      ),
    }));

    return timeSpan;
  }

  function getHeader(date: MyDate): JSX.Element {
    const title = getChildfree(
      date,
      props.settings.selectedWeekLeave === "jämna",
      SettingsHelper.weekdayOptions.indexOf(
        props.settings.selectedWeekdayLeave
      ),
      SettingsHelper.weekdayOptions.indexOf(
        props.settings.selectedWeekdayFetch
      ),
      props.settings.selectedWeekFetch === "efterföljande"
    )
      ? "Barnfri!"
      : "Inte barnfri!";
    const alertVariant = getChildfree(
      date,
      props.settings.selectedWeekLeave === "jämna",
      SettingsHelper.weekdayOptions.indexOf(
        props.settings.selectedWeekdayLeave
      ),
      SettingsHelper.weekdayOptions.indexOf(
        props.settings.selectedWeekdayFetch
      ),
      props.settings.selectedWeekFetch === "efterföljande"
    )
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

  return (
    <Container fluid className='p-4'>
      <Row className='justify-content-center align-items-center text-center'>
        <Col xs={12} sm={5}>
          {getHeader(evalDate)}
        </Col>
        <Col xs={12} sm={7}>
          {getList(getTimeSpan(evalDate, todayDate))}
        </Col>
      </Row>
    </Container>
  );
}

function getChildfree(
  date: MyDate,
  leaveOnEven: boolean,
  leaveDay: number,
  fetchDay: number,
  fetchNextWeek: boolean
) {
  const dayOfWeek = date.getWeekday();
  const weekNumber = date.getWeek();
  if (fetchNextWeek)
    return (
      ((leaveOnEven ? evenWeek(weekNumber) : oddWeek(weekNumber)) &&
        dayOfWeek >= leaveDay) ||
      ((leaveOnEven ? oddWeek(weekNumber) : evenWeek(weekNumber)) &&
        dayOfWeek < fetchDay)
    );
  // fetchSameWeek
  else
    return (
      (leaveOnEven ? evenWeek(weekNumber) : oddWeek(weekNumber)) &&
      dayOfWeek >= leaveDay &&
      dayOfWeek < fetchDay
    );
}

function oddWeek(weekNumber: number) {
  return !!(weekNumber % 2);
}

function evenWeek(weekNumber: number) {
  return !oddWeek(weekNumber);
}

export default MainView;
