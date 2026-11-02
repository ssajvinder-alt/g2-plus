(() => {
  'use strict';
  const thoughts = [
    'A little progress each day can take you further than one perfect start.',
    'Ask one more question today; curiosity opens the next door.',
    'Your effort matters, even before the result arrives.',
    'Learn to understand, and let your marks follow your growth.',
    'Kindness is a lesson you can practise in every classroom.',
    'A mistake becomes useful when you discover what it can teach you.',
    'Begin with what you know, then take one brave step further.',
    'Give your attention to today’s work, one task at a time.',
    'Your questions can help someone else learn too.',
    'Make room for both hard work and a healthy rest.',
    'Read a page, explore an idea, and share something you discover.',
    'The courage to try is a skill you can build every day.',
    'Respect the people learning beside you; everyone starts somewhere.',
    'Small, honest efforts build a strong foundation.',
    'Listen carefully; a new idea may begin with another person’s voice.',
    'Practise patiently, and notice how far you have come.',
    'You do not need every answer to begin learning.',
    'Create something today, even if your first attempt is simple.',
    'Let your next choice bring you closer to the person you want to become.',
    'A helpful classmate makes the whole classroom stronger.',
    'Choose understanding over rushing to finish.',
    'Be proud of improvement, however small it seems.',
    'Use what you learn to make someone’s day better.',
    'Turn a difficult task into a few manageable steps.',
    'Honesty in your work builds confidence in yourself.',
    'Your imagination deserves practice as much as your memory.',
    'When you need help, asking is a step forward.',
    'Bring care to your work and kindness to your words.',
    'Today is another chance to build a useful habit.',
    'Compare your progress with yesterday, and plan your next step.',
    'Protect your study time, your health, and your curiosity.',
    'Think carefully before you share; good information helps everyone.',
    'A book can introduce you to a world you have not yet imagined.',
    'Make space for a classmate who has not had a turn.',
    'An open mind can find a lesson in an unexpected place.',
    'Preparation gives your confidence something solid to stand on.',
    'Learning a skill takes time; give yourself permission to practise.',
    'Pay attention to the details, but keep your bigger goal in view.',
    'Use your strengths, and keep working on what challenges you.',
    'Taking responsibility for a mistake is the beginning of repair.',
    'Leave the classroom a little better than you found it.',
    'Every subject offers another way to understand the world.',
    'A thoughtful answer begins with careful listening.',
    'Choose a goal you can act on today.',
    'Your voice matters; use it with confidence and respect.',
    'Teamwork grows when everyone has a chance to contribute.',
    'Celebrate a friend’s progress as warmly as your own.',
    'Good habits make tomorrow’s work a little easier.',
    'Discovering what you do not know is part of becoming wiser.',
    'Try a different approach when the first one does not work.',
    'Let creativity turn an ordinary task into an opportunity.',
    'Care for the spaces where you learn, play, and share meals.',
    'Keep your promises, especially the small ones.',
    'A patient explanation can make a difficult idea feel possible.',
    'Take the first step before worrying about the whole journey.',
    'Learn from feedback, then give yourself another chance to try.',
    'A balanced day includes learning, movement, and rest.',
    'Make your work meaningful by knowing why it matters.',
    'Let respect guide you when opinions differ.',
    'You can build something valuable with what you learn today.'
  ];
  function thoughtForDate(date) {
    const day = Math.floor((date.getTime() + 19800000) / 86400000);
    return thoughts[((day % thoughts.length) + thoughts.length) % thoughts.length];
  }
  function updateThought() {
    const now = new Date();
    document.getElementById('daily-thought').textContent = thoughtForDate(now);
    document.getElementById('thought-date').textContent = new Intl.DateTimeFormat('en-IN',{dateStyle:'full',timeZone:'Asia/Kolkata'}).format(now);
  }
  updateThought();
  setInterval(updateThought, 60000);
  document.addEventListener('visibilitychange', () => {if (!document.hidden) updateThought();});
  const tabs = [...document.querySelectorAll('[role="tab"][data-panel]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex = selected ? 0 : -1;
      document.getElementById(button.dataset.panel).hidden = !selected;
    });
    if (focus) tab.focus();
    if (tab.dataset.panel === 'ebooks') loadBooks();
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown',event => {
      let index;
      if (event.key === 'ArrowRight') index = (i+1)%tabs.length;
      if (event.key === 'ArrowLeft') index = (i+tabs.length-1)%tabs.length;
      if (event.key === 'Home') index=0;
      if (event.key === 'End') index=tabs.length-1;
      if (index !== undefined) {event.preventDefault();selectTab(tabs[index],true);}
    });
  });
  function followHash() {
    const tab = tabs.find(t => '#'+t.dataset.panel === location.hash);
    if (tab) {selectTab(tab);document.getElementById('student-hub').scrollIntoView({block:'start'});}
  }
  window.addEventListener('hashchange',followHash);
  const form = document.getElementById('book-filters');
  const classFilter = document.getElementById('book-class');
  const sessionFilter = document.getElementById('book-session');
  const search = document.getElementById('book-search');
  const list = document.getElementById('book-list');
  const status = document.getElementById('book-status');
  const more = document.getElementById('book-more');
  let books=[],limit=36,loaded=false,loading=false;
  function enableFilters(enabled) { [classFilter,sessionFilter,search].forEach(control=>{control.disabled=!enabled;}); }
  enableFilters(false);
  function drawBooks() {
    const q=search.value.trim().toLocaleLowerCase();
    const filtered=books.filter(b=>(!classFilter.value || String(b.class)===classFilter.value) && (!sessionFilter.value || b.session===sessionFilter.value) && (!q || (b.title+' '+b.session+' class '+b.class).toLocaleLowerCase().includes(q)));
    list.replaceChildren();
    for (const book of filtered.slice(0,limit)) {
      const card=document.createElement('article');card.className='card book-card';
      const meta=document.createElement('span');meta.className='number';meta.textContent='CLASS '+book.class+' · '+book.session;
      const title=document.createElement('h3');title.textContent=book.title;
      const link=document.createElement('a');link.href=book.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open / download PDF ↗';link.setAttribute('aria-label',book.title+' — Class '+book.class+', '+book.session+' — open PDF');
      card.append(meta,title,link);list.append(card);
    }
    status.textContent=filtered.length ? 'Showing '+Math.min(limit,filtered.length)+' of '+filtered.length+' book links.' : 'No matching books. Try another class, session, or search term; the official catalogue links are below.';
    more.hidden=limit>=filtered.length;
  }
  form.addEventListener('submit',e=>e.preventDefault());
  [classFilter,sessionFilter].forEach(e=>e.addEventListener('change',()=>{limit=36;drawBooks();}));
  search.addEventListener('input',()=>{limit=36;drawBooks();});
  more.addEventListener('click',()=>{limit+=36;drawBooks();});
  async function loadBooks() {
    if (loaded || loading) return;
    loading=true;status.textContent='Loading book links from PSEB…';
    try {
      const response=await fetch('/api/books',{signal:AbortSignal.timeout(25000)});
      const data=await response.json();
      if (!response.ok || !Array.isArray(data.books) || !data.books.length) throw Error('unavailable');
      books=data.books.filter(b=>{try{return ['http:','https:'].includes(new URL(b.url).protocol);}catch{return false;}});
      [...new Set(books.map(b=>b.session))].sort().reverse().forEach(s=>{const option=document.createElement('option');option.value=s;option.textContent=s;sessionFilter.append(option);});
      loaded=true;enableFilters(true);drawBooks();
      const failed=data.sources.filter(s=>!s.available);
      document.getElementById('book-sync').textContent=(data.stale?'Showing the last available list. ':'')+'Catalogue checked: '+new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeZone:'Asia/Kolkata'}).format(new Date(data.checkedAt))+'. '+(failed.length?'Some PSEB session pages could not be read; use their official links above.':'Links collected from all listed PSEB session pages.');
    } catch {enableFilters(false);status.textContent='The searchable book list is unavailable because PSEB is not allowing this connection. Open an official session catalogue above to choose your class and download its books.';}
    finally {loading=false;}
  }
  document.getElementById('book-retry').addEventListener('click',()=>{if(!loading){loaded=false;books=[];sessionFilter.length=1;loadBooks();}});
  followHash();
})();
