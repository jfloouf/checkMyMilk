import React from "react";
import styled from "styled-components";
import Colors from "../../bundle-app/design/Colors";
import { EnumType } from "../../bundle-logic/types/EnumType";
import { SPARoute } from "../../bundle-logic/types/SPARoute";

const LinkButton = styled.button<{
  mSelected?: boolean;
}>`
  padding: 0;
  background: transparent;
  border: none;
  font-size: clamp(1.4rem, 1.1vw, 1.6rem);
  font-weight: 540;
  color: gray;
  /*   padding-bottom: 0.1rem; */
  color: black;

  font-family: MSPaint;

  cursor: pointer;

  &:hover,
  :focus {
    outline: none;
    color: ${Colors.onFocus.css};
  }

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  ${(props) => `
        border-bottom: ${props.mSelected ? "1px solid black" : "none"};
  `}
`;
interface Props<T extends EnumType> {
  route: SPARoute<T>;
  onClick(route: T);
  currentRoute: T;
}

export function SPALink<T extends EnumType>(props: Props<T>) {
  const { routeConstant, title } = props.route;

  function isSelected() {
    return props.currentRoute === routeConstant;
  }

  return (
    <LinkButton
      onClick={() => props.onClick(routeConstant)}
      mSelected={isSelected()}
    >
      {title}
    </LinkButton>
  );
}
