import { UseMutationResult, useMutation } from "react-query";
import { Credentials, SignUpError, SignUpFormFields } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const signUp = async (form: SignUpFormFields) => {
  const url = "http://localhost:8000/api/v1/users/signup";
  const response: any = await axios.post(url, form, {
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
