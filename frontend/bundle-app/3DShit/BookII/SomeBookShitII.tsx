import React from "react";
import styled from "styled-components";
import { BookII } from "./BookII";
import { FlipII } from "./FlipII";

/* 
https://codepen.io/_fbrz/pen/whxbF
*/

const Root = styled.div`
  /* border: 2px solid black; */
  background: transparent;

  width: 500px;
  height: 320px;
  position: relative;

  display: flex;
  justify-content: flex-end;

  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(30deg);

  margin: auto;
`;
interface Props {}

export function SomeBookShitII(props: Props) {
  return (
    <Root>
      <BookII></BookII>
      <FlipII></FlipII>
    </Root>
  );
}
