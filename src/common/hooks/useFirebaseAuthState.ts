import { firebaseAuth } from "#/config/firebase";
import { User } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type AuthHookResult = [User | undefined, boolean, Error | undefined];
export function useFirebaseAuthState(): AuthHookResult {
  const [user, loading, error] = useAuthState(firebaseAuth);
  return [user ?? undefined, loading, error];
}

export function useAuthStateWithRedirect(): AuthHookResult {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.replace("/").then();
    }
  }, [user, router, error, loading]);

  return [user ?? undefined, loading, error];
}
