import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useStateWithPropsDefault<T>(
  defaultValue: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return [value, setValue];
}
