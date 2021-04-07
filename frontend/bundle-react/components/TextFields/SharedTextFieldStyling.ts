import styled from "styled-components";
import Colors from "../../../bundle-app/design/Colors";

export const TextFieldRoot = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;

  &:focus-within {
    & label {
      color: ${Colors.onFocus.css};
    }
  }
`;

export const TextFieldLabel = styled.label``;

export const TextFieldInput = styled.input`
  grid-area: input;
  display: flex;

  width: 100%;
  height: 2.3rem;
  box-sizing: border-box;
  padding: 0.6rem;
  font-size: 1rem;

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
