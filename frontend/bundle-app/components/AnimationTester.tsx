import React, { useState } from "react";
import styled from "styled-components";
import { AppButton } from "../../bundle-react/components/AppButton";
import { NotMilkAnimation1 } from "../animations/not-milk/NotMilkAnimation1";
import { TestMode } from "../types/TestMode";
import { ModeSelect } from "./ModeSelect";

const Root = styled.div`
  grid-area: animation-tester;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-areas:
    "animation"
    "controls";

  box-sizing: border-box;
  height: 100%;
  width: 100%;
  /* padding: 2rem; */
  border: 1px solid black;
`;

const Animation = styled.section`
  grid-area: animation;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Controls = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid green;
`;

const Prompt = styled.p``;

interface Props {}

export function AnimationTester(props: Props) {
  const [mode, setMode] = useState(TestMode.NOT_MILK);
  const [testAnimation, setTestAnimation] = useState<boolean>(false);

  function onClick() {
    if (testAnimation) {
      setTestAnimation(false);
      setTimeout(() => {
        setTestAnimation(true);
      }, 200);
    } else {
      setTestAnimation(true);
    }
  }

  const animation = () => {
    switch (mode) {
      case TestMode.NOT_MILK:
        return <NotMilkAnimation1></NotMilkAnimation1>;
      case TestMode.IS_THIS_MILK:
      case TestMode.MILK_BAD:
      case TestMode.MILK_GOOD:
      case TestMode.MILK_OKAY:
        return null;
    }
  };

  const prompt = () => {
    switch (mode) {
      case TestMode.NOT_MILK:
      case TestMode.IS_THIS_MILK:
      case TestMode.MILK_BAD:
      case TestMode.MILK_GOOD:
      case TestMode.MILK_OKAY:
        return "Not yet supported";
    }
  };

  return (
    <Root>
      <Animation>{testAnimation && animation()}</Animation>
      <Controls>
        {testAnimation && <Prompt>{prompt()}</Prompt>}
        <AppButton onClick={onClick}>Test animation</AppButton>
        <ModeSelect selected={mode} onSelect={setMode}></ModeSelect>
      </Controls>
    </Root>
  );
}
