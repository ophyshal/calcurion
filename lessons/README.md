# Calcurion Lessons

Add lesson PDFs here so they appear on the site.

## How to add a lesson

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
  "id": "cp1-complex-intro",
  "title": "Complex Numbers — Introduction",
  "module": "core-pure-1",
  "moduleLabel": "Core Pure 1",
  "file": "pdfs/core-pure-1/complex-numbers-intro.pdf",
  "description": "Argand diagrams, modulus and argument.",
  "pages": 8,
  "topic": "Complex Numbers"
}
```

3. Refresh the Lessons page on the site — the new card will appear automatically.

## File naming

Use clear names, e.g. `matrices-inverses.pdf`, `binomial-expansion.pdf`.
Avoid spaces; use hyphens.

## Notes

- PDFs are served from this folder (relative paths in the manifest).
- Lessons are independent of any exam board. See the site footer disclaimer.
