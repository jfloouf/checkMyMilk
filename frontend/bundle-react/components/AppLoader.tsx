import React from "react";
import styled, { css, keyframes } from "styled-components";

const Rotate = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`;

const Root = styled.div`
  border: 1px solid black;
  border-bottom: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  ${css`
    animation: ${Rotate} 1s linear forwards infinite;
  `}
`;
interface Props {
  className?: string;
}

export function AppLoader(props: Props) {
  return <Root className={props.className}></Root>;
}
