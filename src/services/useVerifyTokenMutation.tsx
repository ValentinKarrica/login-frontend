import { UseMutationResult, useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Credentials, VerifyTokenError } from "@/types";

const verifyToken = async (credentials: Credentials) => {
  const url = "http://localhost:8000/api/v1/users/verify";
  const response: any = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.token}`,
    },
  });
  return response;
};

export const useVerifyTokenMutation = (): UseMutationResult<
  AxiosResponse<Credentials>,
  AxiosError<VerifyTokenError>,
  Credentials
> => {
  return useMutation(verifyToken);
};
