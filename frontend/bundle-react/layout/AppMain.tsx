import React from "react";
import styled from "styled-components";

const Root = styled.main`
  grid-area: app-main;

  display: flex;
  justify-content: center;
  /*  align-items: center; */

  width: 100%;
  height: 100%;
  /*  padding: 2rem; */
  box-sizing: border-box;

  overflow: auto;
  // SHOULD BE A CONSTANT :)))
`;
interface Props {
  children?: React.ReactNode;
}

export function AppMain(props: Props) {
  return <Root>{props.children}</Root>;
}
