import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../../../bundle-app/design/Colors";
import UUID from "../../../bundle-logic/utility/UUID";
import { useOnEnterClick } from "../../hooks/GeneralHooks";

/*
@Deprecated
*/

const Label = styled.label`
  font-size: 0.8em;
  line-height: 1.5em;
  transition: color 0.3s;
  grid-area: label;
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    ". label"
    "checkbox input"
    ". helpertext";

  position: relative;
  font-size: 1.5rem;
  /*   gap: 0.5rem; */
  width: 100%;
  padding: 0;

  /*  max-width: 400px; */
  color: black;
  align-items: center;
  justify-content: center;
  &:focus-within {
    & label {
      color: ${Colors.onFocus.css};
    }
    & p {
      opacity: 1;
    }
  }
`;

const Input = styled.input`
  grid-area: input;
  display: flex;

  width: 100%;
  min-width: 100%;
  max-width: 1000px;
  height: 2.3rem;
  box-sizing: border-box;
  padding: 0.6rem;
  font-size: 1em;

  border: none;
  border-bottom: 1px solid black;

  color: black;
  background: #a0d2d940;
  transition: border-color 0.1s;

  &:focus,
  &:hover {
    outline: none;
  }
  &::placeholder {
    opacity: 0.7;
  }
  &:disabled {
    filter: brightness(0.7);
    opacity: 0.5;
  }

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
/* 
const LeadingIcon = styled(AppIcon)`
  margin-right: 0.3em;
  padding: auto;
  margin-top: auto;
  margin-bottom: auto;
`; */

const HelperText = styled.p`
  font-size: 0.6em;
  margin-top: 0.3em;
  opacity: 0;
  transition: opacity 0.1s, color 0.1s;
  grid-area: helpertext;
`;

interface DefaultProps {
  label?: string;
  value?: string;
  helperText?: string;
  placeholder?: string;

  onSubmit?();
  focus?: boolean;
  /* toggleable?: boolean; */
}

/* interface Custom extends DefaultProps {
  type: "_number" | "_password" | "_email" | "_text";
  onChange?(e: React.ChangeEvent<HTMLInputElement>)
}
 */
interface Numeric extends DefaultProps {
  type: "number";
  onChange?(value: number);
  minValue?: number;
  maxValue?: number;
  filter?(input: number): number;
}

interface NonNumeric extends DefaultProps {
  type?: "text" | "password" | "email";
  onChange?(value: string);
  maxCharacters?: number;
  filter?(input: string): string;
}

export function AppTextField(props: Numeric | NonNumeric) {
  const [id] = useState(UUID.generate().value);
  const inputRef = useRef<HTMLInputElement>();
  const [toggleState, setToggleState] = useState<boolean>(false);

  useOnEnterClick({
    ref: inputRef,
    callback: props.onSubmit,
  });

  useEffect(() => {
    if (inputRef.current && props.focus) {
      inputRef.current.focus();
    }
  });

  function localOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!props.onChange) return;

    let value: string = e.currentTarget.value;

    if (props.type === "number") {
      let num = Number(value);
      if (props.filter) {
        num = props.filter(num);
      }
      /* value = value.replace(/\D/g, ""); */

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
  /* 
  const type = () => {
    if (props.type === "number") return "text";
    return props.type;
  }; */

  const localMaxCharacters = () => {
    if ("maxCharacters" in props) return props.maxCharacters;
    else if ("maxValue" in props) {
      if (props.maxValue) {
        return ("" + props.maxValue).length;
      } else return null;
    }
  };
  const { className } = props as any;

  return (
    <Root className={className}>
      {/*    {props.toggleable && (
        <AppCheckbox
          onClick={() => setToggleState(!toggleState)}
          checked={toggleState}
        ></AppCheckbox>
      )} */}
      {props.label && <Label htmlFor={id}>{props.label}</Label>}
      <Input
        id={id}
        placeholder={props.placeholder}
        value={props.value}
        maxLength={localMaxCharacters()}
        /* size={props.maxCharacters} */
        type={props.type}
        onChange={localOnChange}
        ref={inputRef}
        /* disabled={props.toggleable && !toggleState} */
      />
      {props.helperText && <HelperText>{props.helperText}</HelperText>}
    </Root>
  );
}

/*
   {props.leadingIcon && (
          <LeadingIcon icon={props.leadingIcon}></LeadingIcon>
        )}
*/

/*
 {props.trailingIcon && <Icon icon={props.trailingIcon}></Icon>}
*/
