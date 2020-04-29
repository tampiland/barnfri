import React from "react";
import { Container, Alert } from "react-bootstrap";
import MyDate from "./MyDate";
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
    const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
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

  function getTable(timeSpan: Day[]): JSX.Element {
    const rows = timeSpan.map((day) => (
      <tr key={day.date} className={`${day.isSelected ? "border" : ""}`}>
        <td className={`${day.isToday ? "font-weight-bold" : ""}`}>
          {day.date}
        </td>
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

  return (
    <Container className='pt-4 d-flex flex-column text-center align-items-center'>
      {getHeader(evalDate)}
      {getTable(getTimeSpan(evalDate, todayDate))}
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
