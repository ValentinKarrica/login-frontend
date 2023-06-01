import styled, { keyframes } from "styled-components";
const rotate = keyframes`
0% {
transform: rotate(0);
animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
50% {
transform: rotate(900deg);
animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
100% {
transform: rotate(1800deg);
}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

const LoaderDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  &:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 8px solid #fff;
    border-color: ${({ theme }) =>
      `${theme.colors.primary700} transparent ${theme.colors.brown800} transparent`};
    animation: ${rotate} 1.2s infinite;
  }
`;

export const Loader = () => {
  return (
    <Wrapper>
      <LoaderDiv />
    </Wrapper>
  );
};
