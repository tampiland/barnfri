import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { SettingsHelper, SettingsObject } from "../Modules/SettingsObject";

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
      tempSettings.selectedWeekFetch === "samma" &&
      SettingsHelper.getWeekdayNum(tempSettings.selectedWeekdayFetch) <=
        SettingsHelper.getWeekdayNum(tempSettings.selectedWeekdayLeave)
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
      <Row>
        <Col>
          <h3 className='mb-3'>Inställningar</h3>
        </Col>
      </Row>
      <Container className='p-2 bg-light' style={{ borderRadius: "5px" }}>
        <Row className='mb-2'>
          <Col className='d-flex align-items-baseline justify-content-center flex-wrap'>
            <div>
              <span>Lämnar barn</span>
            </div>
            <div>
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
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col className='d-flex align-items-baseline justify-content-center flex-wrap'>
            <div>
              <span>Hämtar barn</span>
            </div>
            <div>
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
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant='primary' onClick={handleSaveSettings}>
              Spara
            </Button>{" "}
            <Button variant='secondary' onClick={handleCancel}>
              Ångra
            </Button>
          </Col>
        </Row>
      </Container>
      {routeToMain && <Redirect to={"/"} />}
    </Container>
  );
}

export default Settings;
