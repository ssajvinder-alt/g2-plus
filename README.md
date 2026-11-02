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

## Student hub and contact

Official school email: fzk.gsss.sitoguno@punjabeducation.gov.in.
The home-page thought uses 60 original student messages, rotating by the calendar day in Asia/Kolkata (midnight IST). No AI service, secret or scheduled job is needed. Open pages update within one minute of midnight and when returning to the tab.

The PSEB book search calls the Vercel Node function /api/books. It reads PDF links from all seven official session/HSS catalogues, groups them by class and session, and caches successful results for up to an hour at the CDN. Each source page is fetched with an 18-second timeout. Failures show the official catalogue links and partial coverage is disclosed. Books stay on their publisher's servers. Individual PDF availability is not guaranteed by indexing a catalogue. Educare links use https://www.punjabeducare.org/ and its /app page.

Local preview: static pages work with python -m http.server; live book search requires Vercel functions (or a compatible local development environment). Source checks were performed on 2 November 2026.

Live verification: Vercel deployed successfully; PSEB returned HTTP 403 for automated catalogue requests on 2 November 2026. Direct official session links are the primary e-book interface. Search is optional and disabled when PSEB prevents retrieval. The site does not claim an exhaustive local PDF index while upstream retrieval is blocked.
