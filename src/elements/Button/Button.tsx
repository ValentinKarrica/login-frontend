import styled from "styled-components";
import { Loader } from "../Loader";

const Btn = styled.button<{ fullWidth?: boolean; dis?: boolean }>`
  display: flex;
  font: inherit;
  max-height: 56px;
  flex: ${({ fullWidth }) => (fullWidth ? 1 : "initial")};
  background-color: ${({ theme }) => theme.colors.primary200};
  border: 1px solid ${({ theme }) => theme.colors.brown800};
  color: ${({ theme }) => theme.colors.brown800};
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${({ dis, theme }) =>
    dis &&
    `&:hover {
    background-color: ${theme.colors.primary400};
    color: ${theme.colors.black};
    border-color: ${theme.colors.black};
  }`}
`;

interface Props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  loading,
  children,
  type,
  fullWidth,
  onClick,
  disabled,
}: Props) => {
  return (
    <Btn
      dis={!disabled}
      disabled={disabled}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
    >
      {loading ? <Loader /> : children}
    </Btn>
  );
};
