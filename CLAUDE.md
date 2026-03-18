# Markdown Formatting

- Max line length is 80 characters.
- Reflow paragraph text to fill lines as close to 80 chars as possible.
- Lines containing URLs or Markdown links may exceed 80 chars — do not break
  inside a link. If non-link text after a link pushes the line over 80 chars,
  move that trailing text to the next line instead.
- Do not reflow code blocks or tables — leave them as-is regardless of line
  length.
- Use `markdownlint` to check blog posts for formatting issues before committing.
- Markdownlint config is in `.markdownlint.json` at the project root (ignores
  URLs and tables for line-length checks).
