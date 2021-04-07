import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../bundle-app/design/Breakpoints";
import { MReactChild } from "../../bundle-logic/types/MReactChild";

const Root = styled.footer`
  grid-area: app-footer;
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 100%;
  padding: 0.1rem 2vw;
  box-sizing: border-box;
  background: #00000010;

  @media screen and (min-width: ${Breakpoints.width.moveFooterToTop}) {
    justify-content: flex-start;
    padding: 0.2rem;
   /*  border: 1px solid black; */
    background: none;
  }
`;
interface Props {
  children?: MReactChild;
}

export function AppFooter(props: Props) {
  return <Root>{props.children}</Root>;
}
