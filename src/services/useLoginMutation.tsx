import { UseMutationResult, useMutation, useQuery } from "react-query";
import { LoginError, LoginFormFields, Credentials } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const login = async (form: LoginFormFields) => {
  const url = "http://127.0.0.1:8000/api/v1/users/login";
  const response: any = await axios.post(url, form, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response;
};
export const useLoginMutation = (): UseMutationResult<
  AxiosResponse<Credentials>,
  AxiosError<LoginError>,
  LoginFormFields
> => {
  return useMutation(login);
};
