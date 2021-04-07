import React, { useState } from "react";
import UUID from "../../../bundle-logic/utility/UUID";
import { DefaultTextFieldProps } from "./DefaultTextFieldProps";
import {
  TextFieldInput,
  TextFieldLabel,
  TextFieldRoot,
} from "./SharedTextFieldStyling";

interface Numeric extends DefaultTextFieldProps {
  type: "number";
  onChange(value: number);
  minValue?: number;
  maxValue?: number;
}

interface Text extends DefaultTextFieldProps {
  type?: "text" | "email" | "password";
  onChange(value: string);
  maxCharacters?: number;
}

export function AppTextField5(props: Numeric | Text) {
  const [id] = useState(UUID.generate().value);

  function localOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!props.onChange) return;

    let value: string = e.currentTarget.value;

    if (props.type === "number") {
      let num = Number(value);

      if ("maxValue" in props && num > props.maxValue) {
        return;
      }
      if ("minValue" in props && num < props.minValue) {
        return;
      }

      props.onChange(Number(value));
    } else {
      props.onChange(value);
    }
  }

  const localMaxCharacters = () => {
    if (props.type === "number") {
      if (props.maxValue) return ("" + props.maxValue).length;
      else return null;
    } else return props.maxCharacters;
  };

  return (
    <TextFieldRoot>
      {props.label && (
        <TextFieldLabel htmlFor={id}>{props.label}</TextFieldLabel>
      )}
      <TextFieldInput
        id={id}
        value={props.value}
        className={props.className}
        maxLength={localMaxCharacters()}
        onChange={localOnChange}
      ></TextFieldInput>
    </TextFieldRoot>
  );
}
