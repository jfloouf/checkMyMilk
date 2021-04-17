import React from "react";
import styled from "styled-components";
import { BookI } from "./BookI";
import { FlipI } from "./FlipI";

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

export function SomeBookShitI(props: Props) {
  return (
    <Root>
      <BookI></BookI>
      <FlipI></FlipI>
    </Root>
  );
}
