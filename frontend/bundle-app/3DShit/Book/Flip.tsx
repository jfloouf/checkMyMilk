import React from "react";
import styled, { css, keyframes } from "styled-components";

const WrapperAnim = css`
  ${keyframes`
        50% {
            transform: translateZ(-10px) rotateX(60deg) rotateZ(29deg) rotateY(-180deg);
        }
    `}
`;

const PageAnim = css`
  ${keyframes`
        15% { transform: rotateY(-10deg); }
        50% { transform: rotateY(-2deg); }
        65% { transform: rotateY(10deg); }
        100% { transform: rotateY(0deg); }
    `}
`;

const stepCount = 10;
const targetPixels = 230;

const step = targetPixels / stepCount;

const CustomDiv = styled.div<{
  mIndex: number;
}>`
  ${(props) => `
          background-position-x: ${-step * (props.mIndex + 1)}px;
      `}

  animation: ${PageAnim} 6s ease-in-out infinite;

  /*  border: 1px solid black; */
`;

const FlipRoot = styled.div`
  animation: ${WrapperAnim} 6s ease-in-out infinite;
  height: 350px;
  width: 253px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateZ(-10px) rotateX(60deg) rotateZ(29deg) rotateY(0deg) !important;
  transform-style: preserve-3d;
  transform-origin: 0 0 0;

  & div {
    height: 350px;
    width: 24px;
    position: absolute;
    left: calc(100% - 1px);
    transform-origin: 0 100%;
    transform-style: preserve-3d;
    background-size: 253px 350px;
  }
`;

const FrontAndBack = styled.div`
  left: 0 !important;
  background-position-x: 0;
`;

const Front = styled(FrontAndBack)`
  background-image: url("http://blogs.slj.com/afuse8production/files/2012/06/Hobbit1.jpg");
  box-shadow: inset rgba(255, 255, 255, 0.3) 0px -1px 0 0,
    #35582c 0px 1px 0px 0px;

  & div {
    background-image: url("http://blogs.slj.com/afuse8production/files/2012/06/Hobbit1.jpg");
    box-shadow: inset rgba(255, 255, 255, 0.3) 0px -1px 0 0,
      #35582c 0px 1px 0px 0px;
  }

  & div:empty {
    box-shadow: inset rgba(255, 255, 255, 0.3) -1px -1px 0 0,
      #35582c 1px 1px 0px 0px;
  }
`;

const Back = styled(FrontAndBack)`
  transform: rotateY(0.4deg);
  transform-origin: -100% 0;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/164210/map1_.jpg");

  & div {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/164210/map1_.jpg");
  }
`;

interface Props {}

export function Flip(props: Props) {
  const divs = (index) => {
    if (index < stepCount - 1) {
      return <CustomDiv mIndex={index}>{divs(index + 1)}</CustomDiv>;
    } else {
      return <CustomDiv mIndex={index} />;
    }
  };

  return (
    <FlipRoot>
      <Front>{divs(0)}</Front>
      <Back>{divs(0)}</Back>
    </FlipRoot>
  );
}
