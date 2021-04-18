import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Flip } from "../Book/Flip";

const WrapperAnim = css`
  ${keyframes`
        50% {
            transform: rotateY(-180deg);
        }
    `}
`;

const PageAnim = css`
  ${keyframes`
        0% { transform: rotateY(0deg); }
        15% { transform: rotateY(-10deg); }
        50% { transform: rotateY(-2deg); }
        65% { transform: rotateY(10deg); }
        100% { transform: rotateY(0deg); }
    `}
`;

const BackPageAnim = css`
  ${keyframes`
        0% { transform: rotateY(0deg); }
        15% { transform: rotateY(10deg); }
        50% { transform: rotateY(2deg); }
        65% { transform: rotateY(-10deg); }
        100% { transform: rotateY(-0deg); }
    `}
`;

const stepCount = 10;

const Root = styled.div`
  animation: ${WrapperAnim} 6s ease-in-out infinite;
  height: 100%;
  width: 50%;
  position: absolute;

  transform-style: preserve-3d;
  transform-origin: 0 0 0;
`;

const FlipFlap = styled.div<{
  mWidth: number;
  mFullWidth: number;
  mIndex: number;
}>`
  ${(props) => `
      width: ${props.mWidth}px;
      background-size: ${props.mFullWidth}px 100%;
      background-position-x: -${props.mIndex * props.mWidth}px;

      ${
        props.mIndex > 0
          ? `
            left: calc(100% - 1px);
          `
          : ``
      }
  `}

  animation: ${PageAnim} 6s ease-in-out infinite;

  height: 100%;

  position: absolute;
  transform-origin: 0 100%;
  box-sizing: border-box;

  transform-style: preserve-3d;
  /* backface-visibility: hidden; */
  border: 1px solid black;
`;

const FrontFlipFlap = styled(FlipFlap)`
  background-image: url("http://blogs.slj.com/afuse8production/files/2012/06/Hobbit1.jpg");
  box-shadow: inset rgba(255, 255, 255, 0.3) 0px -1px 0 0,
    #35582c 0px 1px 0px 0px;

  &:empty {
    box-shadow: inset rgba(255, 255, 255, 0.3) -1px -1px 0 0,
      #35582c 1px 1px 0px 0px;
  }
`;

const BackFlipFlap = styled(FlipFlap)`
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/164210/map1_.jpg");
  animation: ${BackPageAnim} 6s ease-in-out infinite;
  
`;

const FlipWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;

  perspective: 1000px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

const BackFlipWrapper = styled(FlipWrapper)`
    transform: rotateX(180deg);
    
`;


interface Props {}

export function FlipII(props: Props) {
  const rootRef = useRef<HTMLDivElement>();

  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (rootRef.current) {
      const node = rootRef.current;
      setWidth(node.clientWidth);
    }
  }, [rootRef.current]);

  const flapWidth = (index: number) => {
    return width / stepCount;
  };

  const frontFlaps = (index: number = 0) => {
    const flapWidth = width / stepCount;

    if (index < stepCount - 1) {
      return (
        <FrontFlipFlap mIndex={index} mWidth={flapWidth} mFullWidth={width}>
          {frontFlaps(index + 1)}
        </FrontFlipFlap>
      );
    } else {
      return (
        <FrontFlipFlap mIndex={index} mWidth={flapWidth} mFullWidth={width} />
      );
    }
  };

  const backFlaps = (index: number = 0) => {
    const flapWidth = width / stepCount;

    if (index < stepCount - 1) {
      return (
        <BackFlipFlap mIndex={index} mWidth={flapWidth} mFullWidth={width}>
          {backFlaps(index + 1)}
        </BackFlipFlap>
      );
    } else {
      return (
        <BackFlipFlap mIndex={index} mWidth={flapWidth} mFullWidth={width} />
      );
    }
  };

  return (
    <Root ref={rootRef}>
      {width && (
        <>
          <FlipWrapper>
            {frontFlaps()}
          </FlipWrapper>
          <BackFlipWrapper>
            {backFlaps()}
          </BackFlipWrapper>
    
        </>
      )}
    </Root>
  );
}
