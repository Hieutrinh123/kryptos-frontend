import _ from "lodash";

export function nonNil<T>(value: T | undefined | null): value is T {
  return !_.isNil(value);
}
