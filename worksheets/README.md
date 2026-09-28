# Calcurion Worksheets

Add printable worksheet PDFs here so they appear on the site.

## How to add a worksheet

1. Put your PDF in the matching folder under `pdfs/`:
   - `pdfs/core-pure-1/` — Further Maths Core Pure 1
   - `pdfs/core-pure-2/` — Further Maths Core Pure 2
   - `pdfs/pure-1/` — Maths Pure 1
   - `pdfs/pure-2/` — Maths Pure 2
   - `pdfs/further-pure-1/` — Further Pure 1
   - `pdfs/mechanics/` — Mechanics
   - `pdfs/statistics/` — Statistics

2. Open `manifest.json` and add an entry, for example:

```json
{
  "id": "p2-vectors-3d",
  "title": "Vectors (3D)",
  "module": "pure-2",
  "moduleLabel": "Pure 2",
  "file": "pdfs/pure-2/vectors-3d-worksheet.pdf",
  "description": "12 exam-style questions with space to work.",
  "pages": 4,
  "topic": "Vectors (3D)"
}
```

3. Refresh the Worksheets page on the site — the new card will appear automatically.

## File naming

Use clear names, e.g. `matrices-inverses.pdf`, `binomial-expansion.pdf`.
Avoid spaces; use hyphens.

## Notes

- PDFs are served from this folder (relative paths in the manifest).
- Worksheets are independent of any exam board. See the site footer disclaimer.
