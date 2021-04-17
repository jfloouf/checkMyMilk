import React from "react";
import styled from "styled-components";
import { Book } from "./Book";
import { Flip } from "./Flip";

/* 
https://codepen.io/_fbrz/pen/whxbF
*/

const Root = styled.div`
  border: 2px solid red;
  width: 500px;
  height: 320px;

  margin: auto;
  position: relative;
`;
interface Props {}

export function SomeBookShit(props: Props) {
  return (
    <Root>
      <Book></Book>
      <Flip></Flip>
    </Root>
  );
}
