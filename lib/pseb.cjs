const CATALOGUE = 'https://www.pseb.ac.in/books';
const sessions = ['2021-22','2022-23','2023-24','2024-25','HSS','2025-26','2026-27'];
const sources = sessions.map((session, i) => ({ session, url: `${CATALOGUE}?catid=${i + 1}` }));
function text(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => {
    const value = n[0].toLowerCase() === 'x' ? parseInt(n.slice(1),16) : Number(n);
    return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : '';
  }).replace(/&(?:amp|nbsp|quot|apos|lt|gt);/g, e => ({'&amp;':'&','&nbsp;':' ','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'}[e])).replace(/\s+/g, ' ').trim();
}
const words = {first:1,second:2,third:3,fourth:4,fifth:5,sixth:6,seventh:7,eight:8,eighth:8,ninth:9,tenth:10,eleventh:11,twelfth:12,twelveth:12};
function parseBooks(html, source) {
  const books = [], seen = new Set();
  let grade = null, recent = '';
  const clean = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  for (const match of clean.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>|<[^>]+>|[^<]+/gi)) {
    const token = match[0];
    if (/^<a\b/i.test(token)) {
      if (!grade) continue;
      const href = token.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      if (!href) continue;
      let url;
      try { url = new URL(text(href[1] || href[2] || href[3] || ''), source.url); } catch { continue; }
      if (!['https:','http:'].includes(url.protocol) || !/\.pdf(?:$|[?#])/i.test(url.href)) continue;
      const title = text(token);
      if (!title || seen.has(url.href)) continue;
      seen.add(url.href);
      books.push({title, class: grade, session: source.session, url:url.href, source:source.url});
    } else if (!token.startsWith('<')) {
      recent = (recent + ' ' + text(token)).slice(-220);
      const m = recent.match(/\bclass\s*[-–:]?\s*(1[0-2]|[1-9])(?:st|nd|rd|th)?\b|\bclass\s+(first|second|third|fourth|fifth|sixth|seventh|eight|eighth|ninth|tenth|eleventh|twelfth|twelveth)\b/i);
      if (m) { grade = m[1] ? Number(m[1]) : words[m[2].toLowerCase()]; recent = ''; }
    }
  }
  return books;
}
async function loadCatalogue(fetcher = fetch) {
  const results = await Promise.all(sources.map(async source => {
    try {
      const response = await fetcher(source.url, {signal:AbortSignal.timeout(18000),headers:{Accept:'text/html'}});
      if (!response.ok) throw Error(`PSEB returned ${response.status}`);
      const html = await response.text();
      const books = parseBooks(html, source);
      if (!books.length) throw Error('No downloadable books could be read from this session.');
      return {source, books, available:true};
    } catch { return {source, books:[], available:false}; }
  }));
  return {books:results.flatMap(r=>r.books), sources:results.map(r=>({...r.source,available:r.available,count:r.books.length})),checkedAt:new Date().toISOString()};
}
module.exports = {CATALOGUE,sources,parseBooks,loadCatalogue};
