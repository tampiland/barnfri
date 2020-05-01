import { SettingsObject, SettingsHelper } from "./SettingsObject";
import MyDate from "./MyDate";

export interface Day {
  isToday: boolean;
  isSelected: boolean;
  date: string;
  weekday: string;
  isChildfree: boolean;
}

export function isChildfree(date: MyDate, settings: SettingsObject): boolean {
  const {
    selectedWeekLeave,
    selectedWeekFetch,
    selectedWeekdayLeave,
    selectedWeekdayFetch,
  } = settings;

  const leaveOnEven = selectedWeekLeave === "jämna";
  const leaveDay = SettingsHelper.getWeekdayNum(selectedWeekdayLeave);
  const fetchDay = SettingsHelper.getWeekdayNum(selectedWeekdayFetch);
  const fetchNextWeek = selectedWeekFetch === "efterföljande";

  const dayOfWeek = date.getWeekday();
  const weekNumber = date.getWeek();

  function oddWeek(weekNumber: number) {
    return !!(weekNumber % 2);
  }

  function evenWeek(weekNumber: number) {
    return !oddWeek(weekNumber);
  }

  if (fetchNextWeek)
    return (
      ((leaveOnEven ? evenWeek(weekNumber) : oddWeek(weekNumber)) &&
        dayOfWeek >= leaveDay) ||
      ((leaveOnEven ? oddWeek(weekNumber) : evenWeek(weekNumber)) &&
        dayOfWeek < fetchDay)
    );
  else
    return (
      (leaveOnEven ? evenWeek(weekNumber) : oddWeek(weekNumber)) &&
      dayOfWeek >= leaveDay &&
      dayOfWeek < fetchDay
    );
}

export function isChildFreeWeek(
  date: MyDate,
  today: MyDate,
  settings: SettingsObject
): Day[] {
  const array = [-3, -2, -1, 0, 1, 2, 3, 4];
  const surrDates = array.map(
    (diff) => new MyDate(date.valueOf() + diff * 1000 * 3600 * 24)
  );

  const timeSpan: Day[] = surrDates.map((day) => ({
    isToday: !!(day.toLocaleDateString() === today.toLocaleDateString()),
    isSelected: !!(day.toLocaleDateString() === date.toLocaleDateString()),
    date: day.toLocaleDateString(),
    weekday: day.toWeekdayString(),
    isChildfree: isChildfree(day, settings),
  }));

  return timeSpan;
}

export function isChildFreeMonth(
  date: MyDate,
  today: MyDate,
  settings: SettingsObject
): Day[] {
  // figure out start date
  // (monday of the week determined by the first day of the month)

  // figure out end date
  // (sunday of the week determined by the last day of the month)

  // generate array of MyDates from start to end

  // generate Day struture using map function
  // (including week number to enable filtering and easy UI

  return [];
}
