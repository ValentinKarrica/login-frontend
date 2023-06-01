import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useLoginMutation,
  useSignUpMutation,
  useVerifyTokenMutation,
} from "@/services";
import {
  Credentials,
  LoginError,
  LoginFormFields,
  SignUpError,
  SignUpFormFields,
  VerifyTokenError,
  VerifyTokenVar,
} from "@/types";
import { AxiosError } from "axios";

interface AuthenticationReturnType {
  credentials: Credentials;
  logOut: () => void;
  isAuthenticated: boolean;
  isAuthenticatedVerify: boolean;
  signUpMutate: (signUpFormFields: SignUpFormFields) => void;
  signUpIsLoading: boolean;
  signUpIsSuccess: boolean;
  signUpError: AxiosError<SignUpError> | null;
  loginMutate: (loginFormFields: LoginFormFields) => void;
  loginIsLoading: boolean;
  loginIsSuccess: boolean;
  loginError: AxiosError<LoginError> | null;
  verifyTokenError: AxiosError<VerifyTokenError> | null;
}

const AuthenticationContext = createContext<any>(null);

const useAuthenticationProvider = (): AuthenticationReturnType => {
  const [test, setTest] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedVerify, setIsAuthenticatedVerify] = useState(false);
  const [isVerifyTokenConfirm, setIsVerifyTokenConfirm] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    token: "",
    user: {
      _id: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      photo: "",
      passwordConfirm: "",
      passwordChangedAt: new Date(),
    },
  });
  const {
    mutate: signUpMutate,
    data: signUpData,
    isLoading: signUpIsLoading,
    isSuccess: signUpIsSuccess,
    error: signUpError,
  } = useSignUpMutation();

  const {
    mutate: loginMutate,
    data: loginData,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
    error: loginError,
  } = useLoginMutation();

  const {
    mutate: verifyTokenMutate,
    data: verifyTokenData,
    isSuccess: verifyTokenIsSuccess,
    error: verifyTokenError,
    isLoading: verifyTokenIsLoading,
    status: verifyTokenStatus,
  } = useVerifyTokenMutation();

  const handleAuthenticationSuccess = (credentials: Credentials) => {
    setIsAuthenticated(true);
    setIsAuthenticatedVerify(true);
    setCredentials(credentials);
    localStorage.setItem("credentials", JSON.stringify(credentials));
  };

  const handleAuthenticationFailure = () => {
    setIsAuthenticated(false);
    setIsAuthenticatedVerify(true);
    localStorage.removeItem("credentials");
  };

  //sign Up Check
  useEffect(() => {
    if (signUpIsSuccess) {
      handleAuthenticationSuccess(signUpData.data);
    }
  }, [signUpIsSuccess]);

  //Login Check
  useEffect(() => {
    if (loginIsSuccess) {
      handleAuthenticationSuccess(loginData.data);
    }
  }, [loginIsSuccess]);

  //Verify Token Check
  useEffect(() => {
    if (verifyTokenStatus === "success") {
      handleAuthenticationSuccess(verifyTokenData.data);
    } else if (verifyTokenStatus === "error") {
      handleAuthenticationFailure();
    }
  }, [verifyTokenIsLoading]);

  //Local store check
  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      verifyTokenMutate(JSON.parse(credentials));
    } else {
      handleAuthenticationFailure();
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("credentials");
    setIsAuthenticated(false);
    setIsAuthenticatedVerify(true);
  };

  return {
    credentials,
    logOut,
    isAuthenticated,
    isAuthenticatedVerify,
    signUpMutate,
    signUpIsLoading,
    signUpIsSuccess,
    signUpError,
    loginMutate,
    loginIsLoading,
    loginIsSuccess,
    loginError,
    verifyTokenError,
  };
};

interface Props {
  children: ReactNode | ReactNode[];
}

export const AuthenticationProvider = ({ children }: Props) => {
  const value = useAuthenticationProvider();

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationReturnType => {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "You cant use useAuthentication() outside of <AuthenticatedProvider />"
    );

  return context;
};
