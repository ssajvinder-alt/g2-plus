import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {readLocal,writeLocal} from './storage.mjs';
import {newLesson,newPage,validateLesson} from './model.mjs';
test('browser database saves a multi-page lesson and restores an independent copy',async()=>{
 const lesson=newLesson();lesson.title='ਮੇਰਾ ਪਾਠ';lesson.pages.push(newPage('Practice'));lesson.pages[1].scene.files={image:{dataURL:'data:image/png;base64,AAAA',id:'image'}};
 await writeLocal(lesson);const restored=validateLesson(await readLocal());assert.equal(restored.title,'ਮੇਰਾ ਪਾਠ');assert.equal(restored.pages.length,2);assert.equal(restored.pages[1].scene.files.image.dataURL,'data:image/png;base64,AAAA');restored.title='Changed';assert.equal((await readLocal()).title,'ਮੇਰਾ ਪਾਠ');
});
test('the latest completed save wins when saves are queued together',async()=>{
 const first=newLesson(),second=newLesson();first.title='First';second.title='Latest';await Promise.all([writeLocal(first),writeLocal(second)]);assert.equal((await readLocal()).title,'Latest');
});
