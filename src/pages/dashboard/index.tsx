import { useEffect } from "react";
import { useAuthentication } from "@/hooks";
import { useRouter } from "next/router";
import { Dashboard } from "@/components";

interface Params {
  params: { userName: string };
}
export default function User({ params }: Params) {
  const router = useRouter();
  const { isAuthenticated, isAuthenticatedVerify } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated && isAuthenticatedVerify) router.push("/");
  }, [isAuthenticated, isAuthenticatedVerify]);

  return <Dashboard />;
}
