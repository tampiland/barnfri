import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { SettingsHelper, SettingsObject } from "../SettingsObject";

interface SettingsProps {
  settings: SettingsObject;
  onNewSettings: (newSettings: SettingsObject) => void;
}

const _weekdayOptions = [...SettingsHelper.weekdayOptions];
const _weekLeaveOptions = [...SettingsHelper.weekLeaveOptions];
const _weekFetchOptions = [...SettingsHelper.weekFetchOptions];

function Settings(props: SettingsProps) {
  const [tempSettings, updateTempSettings] = useState<SettingsObject>(
    JSON.parse(JSON.stringify(props.settings))
  );
  const [routeToMain, setRouteToMain] = useState(false);

  useEffect(() => {
    updateTempSettings(JSON.parse(JSON.stringify(props.settings)));
  }, [props.settings]);

  const handleSaveSettings = () => {
    if (
      tempSettings.selectedWeekFetch == "samma" &&
      SettingsHelper.weekdayOptions.indexOf(
        tempSettings.selectedWeekdayFetch
      ) <=
        SettingsHelper.weekdayOptions.indexOf(tempSettings.selectedWeekdayLeave)
    ) {
      const fixedSettings = {
        ...tempSettings,
        selectedWeekFetch: "efterföljande",
      };
      updateTempSettings(fixedSettings);
      props.onNewSettings(fixedSettings);
      return;
    }
    props.onNewSettings(tempSettings);
    setRouteToMain(true);
  };

  const handleCancel = () => {
    setRouteToMain(true);
  };

  const handleChange = (event: any) => {
    if (event.target.id)
      updateTempSettings({
        ...tempSettings,
        [event.target.id]: event.target.value,
      });
    else console.error("Specified key not available for this object");
  };

  return (
    <Container className='pt-4 d-flex flex-column text-center align-items-stretch'>
      <h3 className='mb-3'>Inställningar</h3>

      <div className='mb-3'>
        <span>Lämnar barn på</span>
        <Form.Control
          id='selectedWeekLeave'
          value={tempSettings.selectedWeekLeave}
          onChange={handleChange}
          as='select'
          style={{ width: "auto" }}
          className='d-inline-block m-1 text-center'>
          {_weekLeaveOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
        <span>veckor</span>
      </div>

      <div className='mb-3'>
        <span>Är barnfri från</span>
        <Form.Control
          id='selectedWeekdayLeave'
          value={tempSettings.selectedWeekdayLeave}
          onChange={handleChange}
          as='select'
          style={{ width: "auto" }}
          className='d-inline-block m-1 text-center text-lowercase'>
          {_weekdayOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </div>

      <div className='mb-3'>
        <span>till</span>
        <Form.Control
          id='selectedWeekdayFetch'
          value={tempSettings.selectedWeekdayFetch}
          onChange={handleChange}
          as='select'
          style={{ width: "auto" }}
          className='d-inline-block m-1 text-center text-lowercase'>
          {_weekdayOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>

        <Form.Control
          id='selectedWeekFetch'
          value={tempSettings.selectedWeekFetch}
          onChange={handleChange}
          as='select'
          style={{ width: "auto" }}
          className='d-inline-block m-1 text-center'>
          {_weekFetchOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
        <span>vecka</span>
      </div>

      <div className='mt-3'>
        <Button variant='primary' onClick={handleSaveSettings}>
          Spara
        </Button>{" "}
        <Button variant='secondary' onClick={handleCancel}>
          Ångra
        </Button>
      </div>
      {routeToMain && <Redirect to={"/"} />}
    </Container>
  );
}

export default Settings;
