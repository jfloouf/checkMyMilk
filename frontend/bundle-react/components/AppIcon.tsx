import React from "react";
import styled from "styled-components";
import { asArray } from "../../bundle-logic/utility/ArrayUtility";

const Root = styled.svg`
  ${(props) => `
    fill: ${props.color || "black"};
    width: ${props.width};
    height: ${props.height};
  `}

  max-height: 100%;
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
  stroke-width: 0;
  &:active {
    outline: none;
  }
`;

const Path = styled.path``;

interface Props {
  icon: string | string[];
  size?: string;
  color?: string;
  //...
  selected?: boolean;
  className?: string;
}

export function AppIcon(props: Props) {
  const { className } = props;

  return (
    <Root
      width={props.size || "32px"}
      height={props.size || "32px"}
      viewBox="0 0 1024 1024"
      className={className}
    >
      {asArray(props.icon).map((path, i) => (
        <Path key={i} d={path}></Path>
      ))}
    </Root>
  );
}
