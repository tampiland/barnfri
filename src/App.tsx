import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import MyDate from "./Modules/MyDate";
import Navigation from "./Components/Navigation";
import Toolbar from "./Components/Toolbar";
import MainView from "./Components/MainView";
import Settings from "./Components/Settings";
import DatePicker from "./Components/DatePicker";
import { SettingsHelper, SettingsObject } from "./Modules/SettingsObject";

function App() {
  const [evalDate, setEvalDate] = useState<MyDate>(new MyDate());
  const [settings, updateSettings] = useState<SettingsObject>(
    SettingsHelper.getSettings()
  );

  const handleChange = (event: any) => {
    if (event.target.value) setEvalDate(new MyDate(event.target.value));
    else setEvalDate(new MyDate());
  };

  const handleSteps = (steps: number) => {
    if (steps) {
      const date = new MyDate(
        evalDate.getFullYear(),
        evalDate.getMonth() + 1,
        evalDate.getDate()
      );
      setEvalDate(date);
    }
  };

  const handleNewSettings = (newSettings: SettingsObject) => {
    updateSettings(newSettings);
    SettingsHelper.storeSettings(newSettings);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation>
          <DatePicker
            evalDate={evalDate}
            onChange={handleChange}
            onSteps={handleSteps}
            onReset={() => setEvalDate(new MyDate())}
          />
        </Navigation>

        <Switch>
          <Route
            path='/settings'
            render={() => (
              <Settings settings={settings} onNewSettings={handleNewSettings} />
            )}
          />
          <Route
            path='/'
            render={() => (
              <>
                <MainView
                  evalDate={evalDate}
                  settings={settings}
                  onChange={handleChange}
                />
                <Toolbar>
                  <DatePicker
                    evalDate={evalDate}
                    onChange={handleChange}
                    onSteps={handleSteps}
                    onReset={() => setEvalDate(new MyDate())}
                  />
                </Toolbar>
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
