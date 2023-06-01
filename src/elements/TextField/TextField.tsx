import { useState } from "react";
import styled from "styled-components";

const InputWrap = styled.div`
  position: relative;
  display: flex;
  height: 56px;
  min-width: 240px;
  margin-top: 16px;
  margin-bottom: 8px;
  background-color: inherit;
  border-radius: 4px;
`;

const Input = styled.input<{ err?: boolean; float: boolean }>`
  cursor: text;
  display: flex;
  width: 100%;
  background-color: inherit;
  border-radius: 4px;
  border: 1px solid white;
  border-color: ${({ float, theme, err }) =>
    err ? "red" : `${float ? theme.colors.primary700 : "rgba(0, 0, 0, 0.4)"}`};
  padding: 15px;
  min-height: 56px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  &:focus {
    outline: none;
  }
  &&:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const Label = styled.div<{ err?: boolean; float: boolean }>`
  position: absolute;
  pointer-events: none;
  border-radius: 2px;
  padding: 0px 6px;
  left: 13px;
  font-style: normal;
  transition: all 0.2s ease;
  background-color: inherit;
  max-width: calc(100% - 32px);
  font-size: ${(props) =>
    props.float ? props.theme.fontSizes.sm : props.theme.fontSizes.md};
  top: ${(props) => (props.float ? "-8px" : "17px")};
  color: ${({ theme, float, err }) =>
    err ? "red" : `${float ? theme.colors.primary700 : "rgba(0, 0, 0, 0.4)"}`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Props {
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  error?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const TextField = ({
  type,
  label,
  required,
  onChange,
  value,
  name,
  id,
  error,
}: Props) => {
  const [isFloat, setIsFloat] = useState(false);
  value && !isFloat && setIsFloat(true);
  const floatHandler = (val: string) => {
    !val && setIsFloat(false);
  };
  const textLabel = `${label} ${required ? "*" : ""}`;
  return (
    <InputWrap>
      <Input
        autoComplete="none"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        float={isFloat}
        err={error}
        onFocus={() => setIsFloat(true)}
        onBlur={(e) => {
          floatHandler(e.target.value);
        }}
        type={type}
      />
      <Label err={error} float={isFloat}>
        {textLabel}
      </Label>
    </InputWrap>
  );
};
