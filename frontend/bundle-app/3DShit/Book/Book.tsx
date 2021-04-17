import React from "react";
import styled, { css, keyframes } from "styled-components";

const BookAnim = css`
  ${keyframes`
        25% {
            box-shadow: inset rgba(0,0,0,.2) 0px 0 50px -140px;
        }
        50% {
            box-shadow: inset rgba(0,0,0,.2) 0px 0 50px -140px;
        }
        100% {
            box-shadow: inset rgba(0,0,0,.2) 510px 0 50px -140px;
        }
    `}
`;

const Root = styled.div`
  width: 248px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate3d(0px, 0px, -10px);
  transform-style: preserve-3d;
  -webkit-transform-origin: 0 0 0;
`;
const Top = styled.div`
  animation: ${BookAnim} 6s ease-in-out infinite;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/164210/map2.jpg");
  background-size: 100% 100%;
  background-position: 100%;
  box-shadow: inset rgba(0, 0, 0, 0.2) 510px 0 50px -140px;
  height: 350px;
  width: 248px;
  position: absolute;
  left: 0;
  top: 0;
`;
const Bottom = styled.div`
  background: #e7ded1;
  box-shadow: rgba(83, 53, 13, 0.2) 4px 2px 1px, #35582c 1px 1px 0px 0px;
  height: 350px;
  width: 253px;
  position: absolute;
  transform: translateZ(-40px);
  left: 0;
  top: 0;
`;
const Front = styled.div`
  background: -webkit-linear-gradient(top, #fcf6ea, #d8d1c3);
  background-size: 100% 2px;
  box-shadow: inset #c2bba2 3px 0 0px, #35582c -2px 1px 0px 0px;
  height: 40px;
  width: 251px;
  left: -3px;
  position: absolute;
  bottom: -40px;
  transform: rotateX(-90deg);
  transform-origin: 50% 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const Right = styled.div`
  background: -webkit-linear-gradient(left, #ddd2bb, #bdb3a0);
  background-size: 2px 100%;
  box-shadow: inset rgba(0, 0, 0, 0) 0 0 0 20px;
  height: 100%;
  width: 40px;
  position: absolute;
  right: -40px;
  top: 0;
  transform: rotateY(90deg);
  transform-origin: 0 50%;
`;

interface Props {}

export function Book(props: Props) {
  return (
    <Root>
      <Top></Top>
      <Front></Front>
      <Right></Right>
      <Bottom></Bottom>
    </Root>
  );
}
