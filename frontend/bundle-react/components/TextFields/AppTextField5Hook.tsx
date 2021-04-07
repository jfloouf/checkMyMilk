import React, { useState } from "react";
import {
  Path,

  RegisterOptions,
  UseFormRegister
} from "react-hook-form";
import UUID from "../../../bundle-logic/utility/UUID";
import {
  TextFieldInput,
  TextFieldLabel,
  TextFieldRoot
} from "./SharedTextFieldStyling";

/* interface Numeric extends DefaultTextFieldProps {
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
 */

interface Props<T> {
  name: Path<T>;
  type?: "text" | "number";
  label?: string;

  register: UseFormRegister<T>;
  options?: RegisterOptions;
}
export function AppTextField5Form<T>(props: Props<T>) {
  const [id] = useState(UUID.generate().value);

  return (
    <TextFieldRoot>
      {props.label && (
        <TextFieldLabel htmlFor={id}>{props.label}</TextFieldLabel>
      )}
      <TextFieldInput
        id={id}
        type={props.type}
        {...props.register(props.name, props.options)}
        /*         value={props.value}
        className={props.className}
        maxLength={localMaxCharacters()}
        onChange={localOnChange} */
      ></TextFieldInput>
    </TextFieldRoot>
  );
}
