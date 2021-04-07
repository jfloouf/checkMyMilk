import React, { useState } from 'react';
import 'reset-css';
import styled from 'styled-components';
import { TestMode } from '../bundle-app/types/TestMode';
import { ModeSelect } from '../bundle-app/components/ModeSelect';
import { AnimationTester} from '../bundle-app/components/AnimationTester';

const Root = styled.div`

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  grid-template-areas: 
    "animation-tester";
  gap: 5rem;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* padding: 2rem; */


  background: #f3eee4;
`


export default function Home() {


  return (
    <Root>
   
      <AnimationTester ></AnimationTester>
    </Root>
  )
}