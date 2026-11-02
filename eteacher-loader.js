(() => {
  if(document.getElementById('eteacher-loader-marker'))return;
  const marker=document.createElement('meta');marker.id='eteacher-loader-marker';document.head.append(marker);
  const style=document.createElement('link');style.rel='stylesheet';style.href='/eteacher.css';document.head.append(style);
  const knowledge=document.createElement('script');knowledge.src='/eteacher-knowledge.js';knowledge.onload=()=>{const widget=document.createElement('script');widget.src='/eteacher.js';document.body.append(widget);};knowledge.onerror=()=>{const link=document.createElement('a');link.href='mailto:fzk.gsss.sitoguno@punjabeducation.gov.in';link.className='et-fallback';link.textContent='E-Teacher · Email school';document.body.append(link);};document.body.append(knowledge);
})();
