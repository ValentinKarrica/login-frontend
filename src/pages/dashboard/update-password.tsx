import { UpdatePasswordForm } from "@/components";
import { Alert, Button } from "@/elements";
import { useAuthentication, useUpdatePassword } from "@/hooks";
import { UpdatePasswordFields } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UpdatePassword = () => {
  const { mutate, error, isLoading } = useUpdatePassword();
  const { credentials, isAuthenticated, isAuthenticatedVerify } =
    useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isAuthenticatedVerify) router.push("/");
  }, [isAuthenticated, isAuthenticatedVerify]);

  const handleSubmit = (updatePasswordFields: UpdatePasswordFields) => {
    mutate({
      updatePasswordFields,
      token: credentials.token,
    });
  };

  return (
    <div>
      <Button onClick={() => router.push("/dashboard")}>Back</Button>
      <UpdatePasswordForm
        loading={isLoading}
        alert={<Alert error={error} />}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdatePassword;
