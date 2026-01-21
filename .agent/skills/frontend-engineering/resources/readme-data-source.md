# Pattern: README as Database

The "Enlaces para Desarrolladores" project uses the `README.md` file as its primary database. This ensures that updating the content is as simple as editing a markdown file.

## Data Structure
The `README.md` is structured by H3 headings (`###`) acting as **Categories**.
Inside each category, there is a list (`-`) of **Links**.

Example:
```markdown
### 📦 PACKS
- Prompts de sistema: https://example.com
- Freesets - https://freesets.dev/
```

## Parsing Strategy
1.  **Read File**: Fetch the raw content of `README.md`.
2.  **Regex / AST**: Use a markdown parser (or regex) to identify H3 headers.
3.  **Extraction**:
    - **Category**: The text of the H3 header.
    - **Links**: The list items following the header.
    - **Link Data**: Extract the Text (Label) and the URL.

## Implementation Notes
- You may use a server-side method (like `fs` in Next.js `getStaticProps` or API routes) to read the file.
- Do NOT hardcode links in the frontend code. Always read strictly from the `README.md`.
