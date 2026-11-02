# G2 Plus — GSSS Sito Gunno

Static school website extracted from the supplied code document. No build step or npm dependencies.

## Missing photographs

The original eight photographs were not included. Add them under assets/ using the mapping in assets/README.md before considering the visual site complete. No replacement photos have been invented.

## Local preview

Run `python -m http.server 8000` in this directory and visit http://localhost:8000.

## GitHub and Vercel

Upload all files from this directory to your chosen GitHub repository, keeping index.html at the repository root.
In Vercel, import that GitHub repository. Choose Framework Preset: Other, leave Build Command empty, and use the repository root as Output Directory. Deploy.

vercel.json enables clean URLs: /school and /campus. The staff link is /school#staff. The original .html links remain supported by Vercel clean URL handling.

Staff filtering, class filtering, mobile navigation and campus photo dialogs use browser JavaScript. No backend or environment variables are required.
