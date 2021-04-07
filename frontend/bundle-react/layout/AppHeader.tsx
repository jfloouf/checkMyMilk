import React from "react";
import styled from "styled-components";
import { Dimensions } from "../../bundle-app/design/Dimensions";

const Root = styled.header`
  grid-area: app-header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0.8rem 2vw;
  box-sizing: border-box;

  @media screen and (min-width: 1200px) {
    /*  padding-left: calc(${Dimensions.USER_WIDGET_WIDTH} + 2vw); */
  }
`;
interface Props {
  children?: React.ReactNode;
}

export function AppHeader(props: Props) {
  return <Root>{props.children}</Root>;
}
