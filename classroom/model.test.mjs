import test from 'node:test';
import assert from 'node:assert/strict';
import {newLesson,newPage,lessonForSave,validateLesson,duplicatePage,snapshot,parseRoster,pickWithoutRepeat,safeFilename,timeLeft,formatTime} from './model.mjs';
import {templateList,templateSkeleton} from './templates.mjs';
test('downloadable chapter round trip preserves multiple pages, Unicode and image bytes',()=>{
 const lesson=newLesson();lesson.title='ਪਾਣੀ · जल · Water';lesson.roster='Aman\nSimran';lesson.pages.push(newPage('Practice'));lesson.activePage=1;
 lesson.pages[0].scene={elements:[{id:'note',type:'text',text:'ਪਾਠ',x:12,y:20}],appState:{viewBackgroundColor:'#fff3bf',zoom:{value:1.3}},files:{pic:{id:'pic',dataURL:'data:image/png;base64,AAAA'}}};
 const loaded=validateLesson(JSON.parse(JSON.stringify(lessonForSave(lesson))));
 assert.equal(loaded.title,lesson.title);assert.equal(loaded.pages.length,2);assert.equal(loaded.activePage,1);assert.equal(loaded.pages[0].scene.files.pic.dataURL,lesson.pages[0].scene.files.pic.dataURL);assert.equal(loaded.pages[0].scene.elements[0].text,'ਪਾਠ');assert.equal(loaded.roster,lesson.roster);
});
test('invalid backups are rejected before they replace a lesson',()=>{
 assert.throws(()=>validateLesson({type:'excalidraw',elements:[]}));
 const lesson=newLesson();lesson.pages=[];assert.throws(()=>validateLesson(lesson));
 lesson.pages=[newPage()];lesson.pages.push(lesson.pages[0]);assert.throws(()=>validateLesson(lesson));
 lesson.pages=[newPage()];lesson.pages[0].scene.elements=[null];assert.throws(()=>validateLesson(lesson));
});
test('restored index is an integer in range and unknown app state is discarded',()=>{
 const lesson=newLesson();lesson.pages.push(newPage());lesson.activePage=99;lesson.pages[0].scene.appState={collaborators:{bad:'shape'},zoom:{value:1},viewBackgroundColor:'#fff'};
 assert.equal(validateLesson(lesson).activePage,1);lesson.activePage=.5;assert.equal(validateLesson(lesson).activePage,0);assert.equal(validateLesson(lesson).pages[0].scene.appState.collaborators,undefined);
});
test('duplicating a page makes independently editable contents',()=>{
 const page=newPage('Chapter');page.scene.elements=[{id:'shape',x:20}];const copy=duplicatePage(page);copy.scene.elements[0].x=80;assert.notEqual(page.id,copy.id);assert.equal(page.scene.elements[0].x,20);
});
test('snapshot retains drawing and file data without transient selection state',()=>{
 const data=snapshot([{id:'a'}],{selectedElementIds:{a:true},collaborators:new Map(),viewBackgroundColor:'#fff',zoom:{value:2}},{p:{dataURL:'data:image/png;base64,AA'}});
 assert.equal(data.elements[0].id,'a');assert.equal(data.appState.zoom.value,2);assert.equal(data.appState.collaborators,undefined);assert.ok(data.files.p);
});
test('random picker gives everyone a turn before repeating, with roster cleanup',()=>{
 const names=parseRoster('Aman, Simran\nAman\n\nਗੁਰਪ੍ਰੀਤ');assert.equal(names.length,3);let used=[];const picks=[];for(let i=0;i<3;i++){const p=pickWithoutRepeat(names,used,()=>0);used=p.used;picks.push(p.name);}assert.equal(new Set(picks).size,3);const next=pickWithoutRepeat(names,used,()=>0);assert.equal(next.used.length,1);assert.equal(pickWithoutRepeat([],[],()=>0),null);
});
test('timer uses a deadline even if a hidden tab skips interval ticks',()=>{
 assert.equal(timeLeft(180000,100000),80);assert.equal(timeLeft(180000,999999),0);assert.equal(formatTime(80),'01:20');assert.equal(formatTime(0),'00:00');
});
test('all six lesson starters contain editable text and finite coordinates',()=>{
 assert.equal(templateList.length,6);for(const t of templateList){const shapes=templateSkeleton(t.id,'ਪਾਠ');assert.ok(shapes.length>=4);assert.ok(shapes.some(s=>s.type==='text'));assert.ok(shapes.every(s=>Number.isFinite(s.x)&&Number.isFinite(s.y)));assert.ok(shapes.some(s=>s.label?.text||s.text));}
});
test('download names remove filesystem-reserved characters',()=>{assert.equal(safeFilename('Ch: 1 / Plants?'),'Ch- 1 - Plants-');assert.equal(safeFilename(''),'lesson');});
