export function contentToExcerpt(
  paragraph?: string | null,
  wordCount: number = 20
): string {
  if (!paragraph) {
    return "";
  }
  const text = paragraph.replace(/(<([^>]+)>)/gi, "");
  const tokens = text.split(" ");
  if (tokens.length > 20) {
    return tokens.slice(0, wordCount).join(" ") + " ...";
  }
  return text;
}
