import React, { useState } from "react";
import styled from "styled-components";
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldLabel,
} from "./SharedTextFieldStyling";
import { DefaultTextFieldProps } from "./DefaultTextFieldProps";
import UUID from "../../../bundle-logic/utility/UUID";

interface Props extends DefaultTextFieldProps {
  type: "text" | "number" | "email" | "password";
  onChange(e: React.ChangeEvent<HTMLInputElement>);
  maxLength?: number;
}

export function CustomTextField(props: Props) {
  const [id] = useState(UUID.generate().value);

  return (
    <TextFieldRoot>
      {props.label && (
        <TextFieldLabel htmlFor={id}>{props.label}</TextFieldLabel>
      )}
      <TextFieldInput
        id={id}
        value={props.value}
        className={props.className}
        maxLength={props.maxLength}
        onChange={props.onChange}
      ></TextFieldInput>
    </TextFieldRoot>
  );
}
