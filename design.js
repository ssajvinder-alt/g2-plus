(() => {
  'use strict';
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar=document.querySelector('.reading-progress');
  let progressFrame=false;
  function progress(){const range=document.documentElement.scrollHeight-window.innerHeight;bar.style.transform='scaleX('+(range>0?Math.min(1,window.scrollY/range):0)+')';progressFrame=false;}
  window.addEventListener('scroll',()=>{if(!progressFrame){progressFrame=true;requestAnimationFrame(progress);}},{passive:true});
  window.addEventListener('resize',progress);progress();
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});observer.unobserve(entry.target);});},{threshold:.08});
    document.querySelectorAll('main>section>.eyebrow,.section-head,.card,.photo-card,.hero-copy,.hero-media,.fact,.school-manifesto>div,.footer-invitation').forEach(el=>observer.observe(el));
  }
  document.querySelectorAll('[data-gallery-view]').forEach(button=>button.addEventListener('click',()=>{const gallery=document.getElementById('campus-gallery');gallery.classList.toggle('is-list',button.dataset.galleryView==='list');document.querySelectorAll('[data-gallery-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
  const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  const canvas=document.querySelector('.pixel-field');
  if (!canvas) return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const frame=canvas.parentElement;let width=0,height=0,pointer=null,raf=null;
  function draw(){raf=null;ctx.clearRect(0,0,width,height);const step=23;for(let y=12,row=0;y<height;y+=step,row++){for(let x=12,col=0;x<width;x+=step,col++){const edge=Math.min(x,width-x,y,height-y);const distance=pointer?Math.hypot(x-pointer.x,y-pointer.y):999;const lit=distance<85;const seed=(row*73+col*37)%23;if(!lit&&(seed>2||edge>65))continue;ctx.fillStyle=lit?'rgba(255,146,47,'+(0.65*(1-distance/100))+')':'rgba(255,189,109,.24)';const size=lit?4:2;ctx.fillRect(x,y,size,size);}}}
  function resize(){width=frame.clientWidth;height=frame.clientHeight;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(frame);else window.addEventListener('resize',resize);resize();
  if(!reduceMotion&&window.matchMedia('(pointer:fine)').matches){frame.addEventListener('pointermove',event=>{const rect=frame.getBoundingClientRect();pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};if(raf===null)raf=requestAnimationFrame(draw);});frame.addEventListener('pointerleave',()=>{pointer=null;if(raf===null)raf=requestAnimationFrame(draw);});}
})();
