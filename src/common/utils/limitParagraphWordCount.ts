export function limitParagraphWordCount(
  paragraph?: string | null,
  wordCount: number = 20
): string {
  if (!paragraph) {
    return "";
  }
  const tokens = paragraph.split(" ");
  if (tokens.length > 20) {
    return tokens.slice(0, wordCount).join(" ") + " ...";
  }
  return paragraph;
}
