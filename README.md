# Government Senior Secondary School, Sito Gunno

Static school website extracted from the supplied code document. No build step or npm dependencies.

## Photographs

All eight unique school-supplied photographs are included in assets/. Duplicate uploads are omitted.

## Local preview

Run `python -m http.server 8000` in this directory and visit http://localhost:8000.

## GitHub and Vercel

Upload all files from this directory to your chosen GitHub repository, keeping index.html at the repository root.
In Vercel, import that GitHub repository. Choose Framework Preset: Other, leave Build Command empty, and use the repository root as Output Directory. Deploy.

vercel.json enables clean URLs: /school and /campus. The staff link is /school#staff. The original .html links remain supported by Vercel clean URL handling.

Staff filtering, class filtering, mobile navigation and campus photo dialogs use browser JavaScript. No backend or environment variables are required.

## School offerings

Academic streams: Non-Medical, Medical, Commerce, Humanities.
NSQF trades: Beauty & Wellness, Security, IT, Retail; one dedicated lab per trade.
Campus: Computer Lab, Science Lab, Biology Lab, Chemistry Lab, Physics Lab, two Commerce Rooms, Kitchen, Dining Shed, Playground, Basketball Court, Volleyball Ground, Badminton Ground.

Developed by Sunaina Rani, Computer Faculty.
