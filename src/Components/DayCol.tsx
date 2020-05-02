import React from "react";
import { Col, Button } from "react-bootstrap";

export interface ColProps {
  title?: boolean;
  childFree?: boolean;
  today?: boolean;
  selected?: boolean;
  anotherMonth?: boolean;
  value?: string;
  onClick?: (event: any) => void;
}

export const DayCol: React.FC<ColProps> = (props) => {
  const red = "#f8d7da";
  const green = "#d4edda";
  return (
    <Col
      as={Button}
      className={
        (props.today && " font-weight-bold ") +
        (props.selected
          ? props.childFree
            ? " border-success "
            : " border-danger "
          : " border-white ") +
        (props.anotherMonth ? " text-light " : " text-dark ") +
        ((props.anotherMonth || props.title) && " font-italic ")
      }
      style={{
        padding: "0.5em",
        backgroundColor: props.title ? "#fff" : props.childFree ? green : red,
      }}
      value={props.value}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) props.onClick(e);
      }}>
      {props.children}
    </Col>
  );
};

export default DayCol;
