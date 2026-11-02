const DB='gsss-classroom-studio',STORE='lessons';
let opening;
function db(){if(!opening)opening=new Promise((resolve,reject)=>{const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>req.result.createObjectStore(STORE);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});return opening;}
export async function readLocal(){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction(STORE,'readonly');const r=tx.objectStore(STORE).get('current');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function writeLocal(lesson){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction(STORE,'readwrite');tx.objectStore(STORE).put(lesson,'current');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
