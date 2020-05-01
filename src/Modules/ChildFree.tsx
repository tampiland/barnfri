import { SettingsObject, SettingsHelper } from "./SettingsObject";
import MyDate from "./MyDate";

export interface Day {
  date: MyDate;
  isToday: boolean;
  isSelected: boolean;
  weekday: string;
  weekInMonth?: number;
  isAnotherMonth?: boolean;
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
    date: day,
    isToday: !!(day.toLocaleDateString() === today.toLocaleDateString()),
    isSelected: !!(day.toLocaleDateString() === date.toLocaleDateString()),
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
  const year = date.getFullYear();
  const month = date.getMonth();

  // figure out start date
  // (monday of the week determined by the first day of the month)
  const firstDate = new MyDate(year, month, 1);
  const offsetLower = -firstDate.getWeekday();
  //const startDate = new MyDate(year, month, 1 + offsetLower);
  //console.log(startDate);

  // figure out end date
  // (sunday of the week determined by the last day of the month)
  const lastDate = new MyDate(year, month + 1, 0);
  const offsetUpper = 6 - lastDate.getWeekday();
  //const endDate = new MyDate(year, month + 1, 0 + offsetUpper);
  //console.log(endDate);

  // generate array of MyDates from start to end
  const start = 1 + offsetLower;
  const end = lastDate.getDate() + offsetUpper;
  const range = Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
  //console.log(range);

  // generate Day struture using map function
  // (including week number to enable filtering and easy UI
  const data: Day[] = range.map((range, idx) => {
    const day = new MyDate(year, month, 0 + range);

    return {
      date: day,
      isToday: !!(day.toLocaleDateString() === today.toLocaleDateString()),
      isSelected: !!(day.toLocaleDateString() === date.toLocaleDateString()),
      weekday: day.toWeekdayString(),
      isAnotherMonth: day.getMonth() !== date.getMonth(),
      weekInMonth: Math.floor(idx / 7),
      isChildfree: isChildfree(day, settings),
    };
  });

  return data;
}
