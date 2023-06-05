import { UseMutationResult, useMutation } from "react-query";
import { Credentials, SignUpError, SignUpFormFields } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const signUp = async (form: SignUpFormFields) => {
  const url = "http://127.0.0.1:8000/api/v1/users/signup";
  const response: any = await axios.post(url, form, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const useSignUpMutation = (): UseMutationResult<
  AxiosResponse<Credentials>,
  AxiosError<SignUpError>,
  SignUpFormFields
> => {
  return useMutation(signUp);
};
