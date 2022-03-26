import { firebaseAuth } from "#/config/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useFirebaseAuthState() {
  const [user, loading, error] = useAuthState(firebaseAuth);

  useShowAlertEffect(getFirebaseAuthErrorMessage(error), "error");

  return { user: user ?? undefined, loading };
}

export function useAuthStateWithRedirect() {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.replace("/").then();
    }
  }, [user, router, error, loading]);

  useShowAlertEffect(getFirebaseAuthErrorMessage(error), "error");

  return { user: user ?? undefined, loading };
}
