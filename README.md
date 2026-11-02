# Government Senior Secondary School, Sito Gunno

School information pages plus an interactive Excalidraw-powered Classroom Studio. Run npm ci then npm run build; deploy the generated dist folder using the included Vercel settings.

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

## Visual design

Redesigned with an original editorial layout inspired by the Anthracite Studio reference: oversized serif typography, monospace labels, pixel details, generous spacing and restrained reveal motion. The school retains its black and royal-orange palette, school-supplied photos and existing features. Fonts use Google Fonts with local system fallbacks. Motion respects reduced-motion preferences. No reference logos, artwork or source code are reused.

## Classroom Studio — /classroom/

The studio embeds Excalidraw 0.18.1 (MIT) with its native pen, shapes, arrows, text, eraser, images, hand/pan, zoom, selection, grouping, library and undo/redo tools. Classroom additions:

- Chapter title, subject and class; multiple independently editable pages with rename, duplicate and deletion.
- Six blank lesson structures: chapter starter, mind map, comparison, Think–Pair–Share, sorting and exit ticket.
- Deadline-based countdown timer with optional chime, random student picker without repeats, up to eight team scores, teacher-authored question/answer reveal, emoji stickers and movable notes.
- Focus mode and full-screen controls. Native drawing toolbar translations: English, Punjabi and Hindi.
- IndexedDB autosave for one current lesson in the same browser. Download an editable .classroom.json backup containing every page and its embedded images; restore it on another computer.
- Current-page PNG, SVG, .excalidraw and browser Print / Save as PDF exports. A lesson backup is the multi-page editable format. Print/PDF exports one page at a time.

This is a local, shared-device classroom tool. It does not implement real-time collaboration, student logins, an AI backend, or guaranteed offline first-load. Teacher roster names and drawings stay local unless the teacher downloads or shares a file. Browser data can be cleared or unavailable; downloadable backups are the durable save option. Native Excalidraw exports differ from Classroom Studio backups.

Build: Node 20+; npm ci, npm test, npm run build. Vite builds only the studio, copies existing school pages into dist, and self-hosts the Excalidraw fonts. The existing api/books.js remains a Vercel function.

Validation: model tests cover editable multi-page round trips including image bytes and Unicode, invalid imports, independent duplication, private transient-state stripping, picker fairness, timer deadlines and six template structures. The production bundle is compiled locally before publication.

## E-Teacher visitor guide

A bottom-screen E-Teacher button is available on the three school pages and in Classroom Studio. The panel is a local, rule-based school-information guide, not a generative AI service or a live teacher. No API key, paid model or server-side chat is used.

The knowledge file uses school-provided profile, streams, four NSQF trades, facilities, professional staff details, dated enrolment totals, official email and the published classroom features. English, Punjabi and Hindi questions are matched to prepared answers; specific class counts and staff entries are read from the embedded dated school records. Responses show their source label and relevant page/resource links.

Unconfirmed admissions requirements, fees, timings, exam dates, staff assignments and other missing facts are referred to the office or the official PSEB resources. Academic-resource guidance does not generate subject solutions. Contact numbers or other personal staff data are not included. Questions are held in page memory and disappear on reload or navigation; they are not sent to an AI or saved.

When school details change, update eteacher-knowledge.js along with the public school pages. Official PSEB links can change, and automated access may be restricted. The guide is not connected to the live ePunjabSchool MIS.
