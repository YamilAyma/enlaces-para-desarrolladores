# Component: Link Card

Links must not be displayed as simple text. They must be rendered as interactive, rich cards.

## Visual Specification
- **Style**: Bento-grid style card.
- **Background**: Glassmorphism or solid white/dark with subtle border.
- **Hover**: Scale up slightly (`scale-105`) and glow with the Primary Brand Color (Acid Green).

## Data Enrichment (Open Graph)
When rendering a link, the application should attempt to fetch its Open Graph (OG) metadata.

### Required Fields
1.  **og:image**: Display as the card cover or thumbnail.
2.  **og:title**: The main label of the card.
3.  **og:description**: A short excerpt below the title (truncate if necessary).

### Fallback Strategy
If OG data cannot be fetched (CORS issues, no tags):
- Use the text from the `README.md` as the title.
- Use a generic placeholder image (or the project logo) as the thumbnail.
- Use the domain name as the description.

## Tech Implementation
- Use a library or API route to fetch OG tags server-side to avoid CORS issues on the client.
- Suggestions: `open-graph-scraper`, `cheerio`, or dedicated metadata APIs.
