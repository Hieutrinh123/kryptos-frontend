import { useState } from "react";

type SetStringValueFunction = (value: string) => void;
export function useInputState(
  defaultValue: string
): [string, SetStringValueFunction, string, SetStringValueFunction] {
  const [input, setInput] = useState(defaultValue);
  const [error, setError] = useState("");

  const wrappedSetInput = (value: string) => {
    setError("");
    setInput(value);
  };

  return [input, wrappedSetInput, error, setError];
}
