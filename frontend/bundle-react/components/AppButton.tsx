import React, { useRef } from "react";
import styled from "styled-components";
import Colors from "../../bundle-app/design/Colors";
import { MReactChild } from "../../bundle-logic/types/MReactChild";
import { useOnEnterClick } from "../hooks/GeneralHooks";
import { AppIcon } from "./AppIcon";
const Root = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;

  font-size: 1.1rem;
  font-weight: 600;
  font-family: MsPaint;
  line-height: 100%;

  color: white;
  background: #2b7aedbb;
  box-shadow: 2px 2px 2px black;
  text-shadow: 1px 1px 1px black;

  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    border: none;
    opacity: 0.6;

    cursor: initial;
  }
  &:hover:not([disabled]),
  :focus:not([disabled]) {
    color: ${Colors.onFocus.css};
    background: #1a6febbb;

    outline: none;

    &:active {
      box-shadow: 1px 1px 1px black;
      transform: translate(1px, 1px);
    }
  }
`;

const IconContainer = styled.div`
  max-height: 90%;
  padding-left: 0.5em;
`;

interface Props extends React.HTMLProps<HTMLButtonElement> {
  icon?: string;
  children?: MReactChild;
}

export function AppButton(props: Props) {
  const buttonRef = useRef<HTMLButtonElement>();

  useOnEnterClick({
    ref: buttonRef,
    callback: () => {
      buttonRef.current?.click();
    },
  });

  return (
    //@ts-ignore
    <Root {...props} ref={buttonRef}>
      {props.children}
      {props.icon && (
        <IconContainer>
          <AppIcon size={"1.5rem"} icon={props.icon}></AppIcon>
        </IconContainer>
      )}
    </Root>
  );
}
