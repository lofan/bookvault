# BookVault V1

BookVault is a GitHub Pages-friendly book discovery and learning library.

## Features
- Instant client-side search
- Search title, author, ISBN, category, tags and concepts
- Category filters
- Responsive cards
- Book detail modal
- Book Summary
- Key Lessons
- Key Concepts
- Practical Takeaways
- Who Should Read This?
- Chapter Summary
- Difficulty and Practical Value
- Dark mode
- Static JSON data
- GitHub Pages workflow

## Run locally

Because the app loads JSON with `fetch()`, use a local static server.

### Python
```bash
python -m http.server 8000
```
Open `http://localhost:8000`

## GitHub Pages
1. Create a GitHub repository (for example `bookvault`).
2. Upload the project and push to `main`.
3. Go to **Settings → Pages**.
4. Select **GitHub Actions** under Build and deployment.
5. The included workflow will deploy the site.

## Add a book

Edit `data/books.json` and follow the existing record format.

## Copyright

Use original summaries and paraphrases. Do not reproduce substantial copyrighted text. Use only legitimate reading or purchase sources if links are added later.

## Roadmap
- V2: AI-assisted summaries
- V3: EPUB/PDF ingestion
- V4: Personal library and reading progress
- V5: Book → Knowledge → Framework → AI Skill
