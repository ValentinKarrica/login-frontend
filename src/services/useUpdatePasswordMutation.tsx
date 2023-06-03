import {
  Credentials,
  UpdatePasswordFields,
  UpdatePasswordTypes,
} from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";

const updatePassword = async (updatePasswordVar: UpdatePasswordTypes) => {
  const url = "http://localhost:8000/api/v1/users/updatePassword";
  const response = await axios.post(
    url,
    updatePasswordVar.updatePasswordFields,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${updatePasswordVar.token}`,
      },
    }
  );

  return response;
};

export const useUpdatePasswordMutation = (): UseMutationResult<
  AxiosResponse<Credentials>,
  AxiosError<{ message: string }>,
  UpdatePasswordTypes
> => {
  return useMutation(updatePassword);
};
