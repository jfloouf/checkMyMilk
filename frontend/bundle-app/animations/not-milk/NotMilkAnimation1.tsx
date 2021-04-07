import React from "react";
import styled, { css, keyframes } from "styled-components";

const animDurationInS = 10;
const itemWidth = "200px";

const Root = styled.div`
  margin: auto;
  display: flex;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  justify-content: center;
  align-items: center;
`;

const rotateDeg = 90;
const RotateAnim = css`
  ${keyframes` 
      0% {
          transform: rotateY(-${rotateDeg}deg) rotateZ(0deg);
      }
     
      85% {
        transform: rotateY(-${rotateDeg}deg) rotateZ(1892deg);
      }

      89% {
        transform: rotateY(-${rotateDeg}deg) rotateZ(1888deg);
      }


      93% {
        transform: rotateY(-${rotateDeg}deg) rotateZ(1892deg);
      }

      100% {
        transform: rotateY(-${rotateDeg}deg) rotateZ(1890deg);
      }
  `}
`;

const FadeoutAnim = css`
  ${keyframes` 
      0% {
          opacity: 1;
      }
     
      100% {
          opacity: 0;
      }
  `}
`;

const BounceAnim = css`
  ${keyframes` 
      0% {
          transform: rotateX(90deg) scale(1);
      }
      50% {
          transform: rotateX(90deg) scale(1.3);
      }

      100% {
          transform: rotateX(90deg) scale(1);
      }
  `}
`;

const TextList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 700px;
  width: 700px;
  border-radius: 50%;
  padding: 1rem;
  box-sizing: border-box;

  transform-origin: 50% 50%;
  perspective: 10000px;
  transform-style: preserve-3d;
  perspective-origin: center;
  animation: ${RotateAnim} ${animDurationInS}s ease-in-out forwards;
`;

const PageTextItem = styled.li<{
  mIndex: number;
  mTotal: number;
}>`
  position: absolute;
  /* 
  display: flex; */

  /* width: ${itemWidth}; */
  height: 100%;

  transform-style: preserve-3d;
  transform-origin: center;

  ${({ mIndex, mTotal }) => `
    transform: rotateZ(${(mIndex / mTotal) * 360}deg) rotateY(90deg);
  `}
`;

const PageText = styled.p`
  font-size: 2.5rem;
  text-shadow: 2px 2px black;
  transform: rotateX(90deg);
`;

const IsMilkText = styled(PageText)`
  color: green;
  animation: ${FadeoutAnim} 2s ease-in forwards;
  animation-delay: ${animDurationInS - 1}s;
`;

const NotMilkText = styled(PageText)<{
  mIndex: number;
  mTotal: number;
}>`
  color: red;
  animation: ${BounceAnim} 0.5s ease-in-out 5;
  animation-delay: ${animDurationInS}s;
`;

const Arrow = styled.div`
  width: 4rem;
  height: 2rem;
  background: black;
  margin: auto 0 auto 0.5rem;

  clip-path: polygon(
    40% 0%,
    40% 20%,
    100% 20%,
    100% 80%,
    40% 80%,
    40% 100%,
    0% 50%
  );
  box-sizing: border-box;

  position: absolute;
  transform: translateX(${itemWidth});
`;

interface Props {}

export function NotMilkAnimation1(props: Props) {
  const count = 14;

  const texts = () => {
    return Array(count)
      .fill(0)
      .map((_, i) => {
        if (i === 0) {
          return (
            <PageTextItem mIndex={i} mTotal={count}>
              <NotMilkText>Not milk</NotMilkText>
            </PageTextItem>
          );
        }

        return (
          <PageTextItem mIndex={i} mTotal={count}>
            <IsMilkText>Milk</IsMilkText>
          </PageTextItem>
        );
      });
  };

  return (
    <Root>
      <TextList>{texts()}</TextList>
      <Arrow></Arrow>
    </Root>
  );
}
