import React from "react";
import styled from "styled-components";
import Colors from "../../bundle-app/design/Colors";
import { MReactChild } from "../../bundle-logic/types/MReactChild";

const Root = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  padding-bottom: 0.1rem;
  box-sizing: border-box;

  display: flex;
  width: auto;
  flex-shrink: 1;
  border-bottom: 1px solid transparent;

  &:disabled {
    cursor: initial;
    opacity: 0.6;
    border: none;
  }
  &:hover:not([disabled]),
  :focus:not([disabled]) {
    outline: none;
    border-bottom: 1px solid black;
  }
  &:active {
    color: ${Colors.onFocus.css};
  }
`;

interface Props {
  children?: MReactChild;
  onClick?();
  disabled?: boolean;
  className?: string;
}

export function AppTextButton(props: Props) {
  return (
    <Root
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Root>
  );
}
