import { SignUpForm } from "@/components";
import { Alert } from "@/elements";
import { useAuthentication } from "@/hooks";
import { SignUpFormFields } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const {
    isAuthenticated,
    isAuthenticatedVerify,
    signUpMutate,
    signUpIsLoading,
    signUpError,
  } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated && isAuthenticatedVerify) router.push("/dashboard");
  });

  const handleSubmit = (signUpFormFields: SignUpFormFields) => {
    signUpMutate(signUpFormFields);
  };

  return (
    <SignUpForm
      alert={<Alert error={signUpError} />}
      loading={signUpIsLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpPage;
