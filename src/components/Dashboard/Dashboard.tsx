import { useAuthentication } from "@/hooks";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 50px;
`;

export const Dashboard = () => {
  const { credentials } = useAuthentication();

  return (
    <MainContainer>
      <Title>
        Welcome to you Account{" "}
        {`${credentials.user.name} ${credentials.user.lastName}`}
      </Title>
    </MainContainer>
  );
};
