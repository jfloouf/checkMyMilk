import React from "react";
import styled from "styled-components";
import { TestMode } from "../types/TestMode";

const Root = styled.select`
  grid-area: mode-select;
  display: flex;
  height: auto;
  min-width: 10rem;
  min-width: 0;
  max-height: 2.5rem;
  padding: 0.2rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

interface Props {
  selected: TestMode;
  onSelect(mode: TestMode);
}

export function ModeSelect(props: Props) {
  const options = () => {
    return Object.values(TestMode).map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  };

  function onChange(e) {
    const value = e.target.value;
    props.onSelect(value);
  }

  return (
    <Root value={props.selected} onChange={onChange}>
      {options()}
    </Root>
  );
}
