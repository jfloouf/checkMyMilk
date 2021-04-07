import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useUpdate } from "../hooks/GeneralHooks";
import { AppTextArea } from "./AppTextArea";
import { AppTextField } from "./TextFields/AppTextField";

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "label . ."
    "hour colon minute";
  align-items: center;

  gap: 0.5rem;
`;
const Label = styled.h4`
  grid-area: label;
`;

const Colon = styled.span`
  grid-area: colon;
`;

const Hour = styled.div`
  grid-area: hour;
  display: flex;
`;

const Minute = styled.div`
  grid-area: minute;
  display: flex;
`;

const Dropdown = styled.select``;

const Option = styled.option``;

interface Props {
  date: Date;
  onChange?(date: Date);
}

export function AppTimePicker(props: Props) {
  const time = useRef<Date>(props.date);
  /* const update = useUpdate(); */

  /*  function initialDate() {
    const date = new Date();
    date.setHours(15, 30);
    return date;
  } */

  function onHourChange(value: number) {
    time.current.setHours(value);
    props.onChange && props.onChange(time.current);
  }

  function onMinuteChange(value: number) {
    time.current.setMinutes(value);
    props.onChange && props.onChange(time.current);
  }

  const hours = () => {
    return "" + time.current.getHours();
  };

  const minutes = () => {
    return "" + time.current.getMinutes();
  };

  return (
    <Root>
      <Label>Tid</Label>
      <Hour>
        <AppTextField
          type="number"
          minValue={1}
          maxValue={24}
          value={hours()}
          onChange={onHourChange}
        ></AppTextField>
        {/*     <Dropdown>
                    {hours()}
                </Dropdown> */}
      </Hour>
      <Colon>:</Colon>
      <Minute>
        <AppTextField
          minValue={0}
          maxValue={60}
          type="number"
          value={minutes()}
          onChange={onMinuteChange}
        ></AppTextField>
      </Minute>
    </Root>
  );
}
