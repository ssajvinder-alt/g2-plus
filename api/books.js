const { loadCatalogue } = require('../lib/pseb.cjs');
let cached, expires = 0;
module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).json({error:'Method not allowed'});
  try {
    if (!cached || Date.now() >= expires) {
      const fresh = await loadCatalogue();
      if (fresh.books.length) {cached = fresh; expires = Date.now() + 300000;}
      else if (cached) return res.status(200).json({...cached,stale:true});
      else return res.status(503).json({...fresh,error:'PSEB is temporarily unavailable. Please use the official session links.'});
    }
    res.setHeader('Cache-Control','public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(cached);
  } catch {return res.status(503).json({error:'Book list temporarily unavailable. Please use the official catalogue.'});}
};
