import React from "react";
import { useState } from "react";

import "./App.css";
import MyDate from "./MyDate";

function App() {
  const [evalDate, setEvalDate] = useState<MyDate>(new MyDate());

  const handleChange = (event: any) => {
    console.log(event.target.value);
    if (event.target.value) setEvalDate(new MyDate(event.target.value));
    else setEvalDate(new MyDate());
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <input
          type='date'
          value={evalDate.toLocaleDateString()}
          onChange={handleChange}
        />
        {getTitle(evalDate)}
        {getTable(evalDate)}
      </header>
    </div>
  );
}

function getTitle(date: MyDate): JSX.Element {
  const title = date.getBarnfri() ? "Barnfri!" : "Inte barnfri!";
  return <h2>{title}</h2>;
}

function getTable(date: MyDate): JSX.Element {
  const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
  const surrDates = array.map(
    (diff) => new MyDate(date.valueOf() + diff * 1000 * 3600 * 24)
  );

  const reactobj = surrDates.map((d) => (
    <tr key={d.toLocaleDateString()} className={"today"}>
      <td
        className={`date ${
          d.toLocaleString() === date.toLocaleString() ? "today " : "nähä "
        }`}>
        {d.toLocaleDateString()}
      </td>
      <td
        className={`weekday ${
          d.toLocaleString() === date.toLocaleString() ? "today " : "nähä "
        }${d.getBarnfri() ? "childfree" : "withchild"}`}>
        {d.toWeekdayString()}
      </td>
    </tr>
  ));

  return (
    <table>
      <tbody>{reactobj}</tbody>
    </table>
  );
}

export default App;
