import React from "react";
import styled, { keyframes, css } from "styled-components";

const Root = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

const bounce = bounceHelper(3, 1500, 50, 100);

const Animation = css`
  ${keyframes`
        0% {
            transform: translateZ(8000px);
            opacity: 1;
        }
      
        ${bounce}

        100% {
            opacity: 1;
        }
    `}
`;

function bounceHelper(
  steps: number,
  range: number,
  fromPercentage: number,
  toPercentage: number
) {
  const percentagePoints = toPercentage - fromPercentage;
  const percentPerStep = percentagePoints / (steps - 1);

  const valuePerStep = range / (steps - 1);

  let animation = "";

  for (let i = 0; i < steps; i++) {
    const percent = fromPercentage + percentPerStep * i;
    const value = range - valuePerStep * i;
    const operator = i % 2 === 0 ? "-" : "";
    animation += `
            ${percent}% {
                transform: translateZ(${operator}${value}px);
            }
        `;
  }

  console.log(animation);
  return animation;
}

const GetBannedAnimation = css`
  ${keyframes`
        0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        }
        
        

        100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
    `}
`;

const TextWrapper = styled.p`
  display: flex;
  gap: 1.5rem;
  perspective: 10000px;
  align-items: center;
`;

const animationSpeed = 0.5;

const StyledSpan = styled.span`
  font-size: 5rem;
  text-shadow: 4px 4px white;
  animation: ${Animation} ${animationSpeed}s ease-out forwards;
  transform-style: preserve3d;
  opacity: 0;
`;

const This = styled(StyledSpan)``;

const Is = styled(StyledSpan)`
  animation-delay: ${animationSpeed}s;
`;

const Not = styled(StyledSpan)`
  animation-delay: ${animationSpeed * 2}s;
  font-size: 7rem;
  color: red;
`;
const Milk = styled(StyledSpan)`
  animation-delay: ${animationSpeed * 3}s;
`;

const GetBanned = styled.p`
  animation: ${GetBannedAnimation} 1s ease-in-out forwards;
  animation-delay: ${animationSpeed * 5}s;
  clip-path: polygon(0 0, 0 100%, 0 100%, 0 0);
  font-size: 1.9rem;
  overflow: visible;

  padding: 0.5rem;
`;

interface Props {}

export function NotMilkAnimation2(props: Props) {
  return (
    <Root>
      <TextWrapper>
        <This>This</This>
        <Is>Is</Is>
        <Not>Not</Not>
        <Milk>Milk</Milk>
      </TextWrapper>
      <GetBanned>Are you trying to get banned, motherfucker?</GetBanned>
    </Root>
  );
}
