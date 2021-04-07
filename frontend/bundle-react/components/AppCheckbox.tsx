import React from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border: 1px solid black;
  grid-area: checkbox;
  cursor: pointer;
`;

const CheckMark = styled.div`
  width: 100%;
  height: 50%;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  transform: translateY(-25%) rotate(-45deg);
`;

interface Props {
  checked?: boolean;
  onClick?();
}

export function AppCheckbox(props: Props) {
  return (
    <Root onClick={props.onClick}>
      {props.checked && <CheckMark></CheckMark>}
    </Root>
  );
}
