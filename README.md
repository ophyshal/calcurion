# Calcurion

A-Level Maths & Further Maths practice site — free topic questions with worked solutions.

## Structure

- `index.html` — home (Further, Maths, Papers, Worksheets, Books)
- `lessons.html` — lessons listing (driven by `lessons/manifest.json`)
- `worksheets.html` — worksheets listing (driven by `worksheets/manifest.json`)
- `topics/` — one HTML page per topic (questions + answers)
- `css/`, `js/` — styles and scripts
- `lessons/pdfs/` — place lesson PDFs here (see `lessons/README.md`)
- `worksheets/pdfs/` — place worksheet PDFs here (see `worksheets/README.md`)

## Adding books (Books section)

The **Books** section on the homepage is for your store links. It is ready for live use; do not leave instructional notes on the public page.

1. Open `index.html` and find the section with `id="books"`.
2. Each book is an `<article class="book-card">` block. Edit:
   - Cover style: `book-cover`, `book-cover-alt`, or `book-cover-gold` (optional mark letter inside)
   - Title: the `<h3>`
   - Subtitle: `.book-meta`
   - Description: `.book-desc`
   - Buy link: set `href` on the `<a class="btn btn-primary book-buy">` to your Amazon/store URL, and change the button text if you like (e.g. `Buy on Amazon`).
3. To add another book, copy a full `<article class="book-card">…</article>` block and paste it inside `.book-grid`, then edit as above.
4. To remove a book, delete its entire `<article class="book-card">…</article>` block.

Example buy button:

```html
<a href="https://www.amazon.co.uk/dp/YOUR-ASIN" class="btn btn-primary book-buy" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
```

## Lessons

See `lessons/README.md` for adding PDF lessons and updating `manifest.json`.

## Notes

- Questions are original exam-style practice materials.
- Not affiliated with any exam board.
