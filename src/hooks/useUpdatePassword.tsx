import { useUpdatePasswordMutation } from "@/services";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthentication } from "./useAuthentication";
import { AxiosError } from "axios";
import { UpdatePasswordTypes } from "@/types";

interface UpdatePasswordReturnTypes {
  isLoading: boolean;
  isSuccess: boolean;
  error: AxiosError<{ message: string }> | null;
  mutate: (updatePasswordVar: UpdatePasswordTypes) => void;
}

const UpdatePasswordContext = createContext<any>(null);

const useUpdatePasswordProvider = (): UpdatePasswordReturnTypes => {
  const { isLoading, isSuccess, error, mutate, data } =
    useUpdatePasswordMutation();
  const { handleAuthenticationSuccess } = useAuthentication();

  useEffect(() => {
    if (isSuccess) {
      handleAuthenticationSuccess(data.data);
    }
  }, [isSuccess]);
  return { isLoading, isSuccess, error, mutate };
};
interface Props {
  children: ReactNode | ReactNode[];
}
export const UpdatePasswordProvider = ({ children }: Props) => {
  const value = useUpdatePasswordProvider();
  return (
    <UpdatePasswordContext.Provider value={value}>
      {children}
    </UpdatePasswordContext.Provider>
  );
};

export const useUpdatePassword = () => {
  const context = useContext(UpdatePasswordContext);
  if (!context)
    throw new Error(
      "You cant use useAuthentication() outside of <AuthenticatedProvider />"
    );
  return context;
};
