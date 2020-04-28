import React from "react";
import { Container, Alert } from "react-bootstrap";
import MyDate, { Day } from "./MyDate";

interface MainViewProps {
  evalDate: MyDate;
}

function MainView(props: MainViewProps) {
  const todayDate = new MyDate();
  const evalDate = new MyDate(props.evalDate);
  const maxDate = new MyDate();
  maxDate.setDate(maxDate.getDate() + 365);

  return (
    <Container className='pt-4 d-flex flex-column text-center align-items-center'>
      {getHeader(evalDate)}
      {getTable(getTimeSpan(evalDate, todayDate))}
    </Container>
  );
}

function getTimeSpan(date: MyDate, today: MyDate): Day[] {
  const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
  const surrDates = array.map(
    (diff) => new MyDate(date.valueOf() + diff * 1000 * 3600 * 24)
  );

  const timeSpan: Day[] = surrDates.map((d) => ({
    isToday: !!(d.toLocaleDateString() === today.toLocaleDateString()),
    isSelected: !!(d.toLocaleDateString() === date.toLocaleDateString()),
    date: d.toLocaleDateString(),
    weekday: d.toWeekdayString(),
    isChildfree: d.getBarnfri(),
  }));

  return timeSpan;
}

function getHeader(date: MyDate): JSX.Element {
  const title = date.getBarnfri() ? "Barnfri!" : "Inte barnfri!";
  const variant = date.getBarnfri() ? "success" : "danger";
  return (
    <Alert variant={variant} className='pt-3 pb-2'>
      <h1>{title}</h1>
    </Alert>
  );
}

function getTable(timeSpan: Day[]): JSX.Element {
  const rows = timeSpan.map((day) => (
    <tr key={day.date} className={`${day.isSelected ? "border" : ""}`}>
      <td className={`${day.isToday ? "font-weight-bold" : ""}`}>{day.date}</td>
      <td className={`${day.isChildfree ? "text-success" : "text-danger"}`}>
        {day.weekday}
      </td>
    </tr>
  ));

  return (
    <table style={{ minWidth: "14em" }}>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default MainView;
