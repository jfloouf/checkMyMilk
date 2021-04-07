import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../bundle-app/design/Colors";
import UUID from "../../bundle-logic/utility/UUID";

const Root = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;

  width: 100%;
  height: 100%;

  &:focus-within {
    & label {
      color: ${Colors.onFocus.css};
    }
    & p {
      opacity: 1;
    }
  }
`;

const Label = styled.label`
  font-size: 0.8em;
  line-height: 1.5em;
  transition: color 0.3s;
`;

const TextArea = styled.textarea`

    width: 100%;
    min-height: 12rem;
    font-size: 0.9em;
    padding: 0.3em;
    background: #a0d2d940;
    resize: none;

    &:focus,
  &:hover {
    outline: none;
  }
/*   &::placeholder {
    opacity: 0.7;
  } */
  &:disabled {
    filter: brightness(0.7);
    opacity: 0.5;
  }
`;

interface Props {
  label?: string;
  value?: string;
  onChange?(value: string);
}

export function AppTextArea(props: Props) {
  const [id] = useState(UUID.generate().value);

  function localOnChange(e) {
    const value: string = e.target.value;
    props.onChange && props.onChange(value);
  }

  return (
    <Root>
      {props.label && <Label>{props.label}</Label>}
      <TextArea onChange={localOnChange} defaultValue={props.value}></TextArea>
    </Root>
  );
}
