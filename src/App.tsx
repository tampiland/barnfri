import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyDate from "./Components/MyDate";
import Navigation from "./Components/Navigation";
import MainView from "./Components/MainView";

function App() {
  const [evalDate, setEvalDate] = useState<MyDate>(new MyDate());

  const handleChange = (event: any) => {
    console.log(event.target.value);
    if (event.target.value) setEvalDate(new MyDate(event.target.value));
    else setEvalDate(new MyDate());
  };

  const handleSteps = (steps: number) => {
    if (steps) {
      const date = new MyDate(evalDate);
      date.setDate(date.getDate() + steps);
      setEvalDate(date);
    }
  };

  return (
    <div className='App'>
      <Navigation
        evalDate={evalDate}
        onChange={handleChange}
        onSteps={handleSteps}
      />
      <MainView evalDate={evalDate} />
    </div>
  );
}

export default App;
