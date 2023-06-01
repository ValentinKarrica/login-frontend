import { LoginForm } from "@/components";
import { Alert } from "@/elements";
import { useAuthentication } from "@/hooks";
import { LoginFormFields } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const {
    isAuthenticated,
    loginMutate,
    loginIsLoading,
    loginError,
    verifyTokenError,
  } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/dashboard`);
    }
  });

  const handleSubmit = (loginFormFields: LoginFormFields) => {
    loginMutate(loginFormFields);
  };

  return (
    <>
      <Alert error={verifyTokenError} />
      <LoginForm
        alert = {<Alert error={loginError} />}
        loading={loginIsLoading}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
