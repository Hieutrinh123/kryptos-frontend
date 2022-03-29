import { firebaseAuth } from "#/config/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useFirebaseAuthState() {
  const [user, loading, error] = useAuthState(firebaseAuth);

  useShowAlertEffect(getFirebaseAuthErrorMessage(error), "error");

  const handleSignOut = () => signOut(firebaseAuth);

  const isNew = user
    ? user.metadata.lastSignInTime === user.metadata.creationTime
    : undefined;

  return {
    isNew,
    user: user ?? undefined,
    loading,
    signOut: handleSignOut,
  };
}

export function useAuthStateWithRedirect(redirectUrl?: string) {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.replace(redirectUrl ?? "/").then();
    }
  }, [user, router, error, loading, redirectUrl]);

  useShowAlertEffect(getFirebaseAuthErrorMessage(error), "error");

  return { user: user ?? undefined, updating: loading };
}
