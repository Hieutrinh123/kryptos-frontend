export function limitParagraphWordCount(
  paragraph: string,
  wordCount: number = 20
): string {
  const tokens = paragraph.split(" ");
  if (tokens.length > 20) {
    return tokens.slice(0, wordCount).join(" ") + " ...";
  }
  return paragraph;
}
