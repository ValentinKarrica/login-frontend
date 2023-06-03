import { useEffect } from "react";
import { useAuthentication } from "@/hooks";
import { useRouter } from "next/router";
import { Dashboard } from "@/components";
import { Button } from "@/elements";

interface Params {
  params: { userName: string };
}
export default function User({ params }: Params) {
  const router = useRouter();
  const { isAuthenticated, isAuthenticatedVerify } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated && isAuthenticatedVerify) router.push("/");
  }, [isAuthenticated, isAuthenticatedVerify]);

  return (
    <div>
      <Button onClick={() => router.push("/dashboard/update-password")}>
        Update your password
      </Button>
      <Dashboard />;
    </div>
  );
}
