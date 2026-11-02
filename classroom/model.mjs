export const FORMAT='gsss-classroom';
export const MAX_FILE_SIZE=40*1024*1024;
export const id=()=>globalThis.crypto.randomUUID();
export function emptyScene(){return {elements:[],appState:{viewBackgroundColor:'#ffffff',gridSize:null},files:{}};}
export function newPage(title='Untitled page'){return {id:id(),title,scene:emptyScene()};}
export function newLesson(){return {type:FORMAT,version:1,title:'My new chapter',subject:'',className:'',pages:[newPage('Welcome & learning goal')],activePage:0,roster:'',teams:[{id:id(),name:'Team Orange',score:0},{id:id(),name:'Team Blue',score:0}],savedAt:null};}
export function snapshot(elements,appState,files){const zoom=appState.zoom?.value;return {elements:[...elements],appState:{viewBackgroundColor:typeof appState.viewBackgroundColor==='string'?appState.viewBackgroundColor:'#ffffff',gridSize:Number.isFinite(appState.gridSize)&&appState.gridSize>0?appState.gridSize:null,scrollX:Number.isFinite(appState.scrollX)?appState.scrollX:0,scrollY:Number.isFinite(appState.scrollY)?appState.scrollY:0,zoom:{value:Number.isFinite(zoom)?Math.max(.1,Math.min(30,zoom)):1}},files:files||{}};}
export function lessonForSave(lesson){return {...lesson,type:FORMAT,version:1,savedAt:new Date().toISOString()};}
export function validateLesson(data){
 if (!data||data.type!==FORMAT||data.version!==1||!Array.isArray(data.pages)||data.pages.length<1||data.pages.length>150) throw Error('Please choose a Classroom Studio .classroom.json backup. For an Excalidraw file, use Open drawing.');
 const seen=new Set();
 for(const p of data.pages){
  if(!p||typeof p.id!=='string'||seen.has(p.id)||typeof p.title!=='string'||!p.scene||!Array.isArray(p.scene.elements)||p.scene.elements.length>25000||!p.scene.elements.every(e=>e&&typeof e==='object'&&typeof e.id==='string')||!p.scene.files||typeof p.scene.files!=='object')throw Error('This lesson contains an invalid page.');
  seen.add(p.id);
 }
 const result={...data,lang:['en','pa-IN','hi-IN'].includes(data.lang)?data.lang:'en',libraryItems:Array.isArray(data.libraryItems)?data.libraryItems.slice(0,500):[],title:String(data.title||'Imported chapter').slice(0,150),subject:String(data.subject||'').slice(0,100),className:String(data.className||'').slice(0,60),roster:typeof data.roster==='string'?data.roster.slice(0,30000):'',activePage:Math.max(0,Math.min(data.pages.length-1,Math.trunc(Number(data.activePage))||0)),teams:Array.isArray(data.teams)?data.teams.slice(0,8).filter(t=>typeof t?.name==='string'&&Number.isFinite(t.score)).map(t=>({id:id(),name:t.name.slice(0,40),score:t.score})):[]};
 result.pages=result.pages.map(p=>({...p,scene:snapshot(p.scene.elements,p.scene.appState||{},p.scene.files)}));
 return result;
}
export function duplicatePage(page){return {...structuredClone(page),id:id(),title:page.title+' (copy)'};}
export function parseRoster(value){return [...new Set(value.split(/[\n,]+/).map(n=>n.trim()).filter(Boolean))];}
export function pickWithoutRepeat(names,used,random=Math.random){const left=names.filter(n=>!used.includes(n));const pool=left.length?left:names;if(!pool.length)return null;const name=pool[Math.floor(random()*pool.length)];return {name,used:[...(left.length?used:[]),name]};}
export function safeFilename(title){return (title||'lesson').replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').slice(0,90).trim()||'lesson';}
export function timeLeft(deadline,now=Date.now()){return Math.max(0,Math.ceil((deadline-now)/1000));}
export function formatTime(seconds){return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');}
