import { AxiosError } from "axios";
import styled from "styled-components";

const AlertDiv = styled.div`
  padding: 1rem;
  background: rgb(253, 237, 237);
  color: rgb(95, 33, 32);
  border-radius: 4px;
`;

interface Props {
  error?: AxiosError<{ message: string }, any> | null;
}

export const Alert = ({ error }: Props) => {
  if (error) {
    return (
      <AlertDiv>
        {error?.response ? error?.response?.data.message : error?.message}
      </AlertDiv>
    );
  } else {
    return null;
  }
};
