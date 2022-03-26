export function getInitials(name?: string | null) {
  if (!name) {
    return "A";
  }
  if (name.length === 0) {
    return "";
  }
  const tokens = name.split(" ");
  if (tokens.length === 1) {
    return tokens[0][0];
  }
  return tokens[0][0] + tokens[tokens.length - 1][0];
}
