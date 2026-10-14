'use strict';
const menu = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const progress = document.getElementById('scrollProgress');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','メニューを開く');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{
  const isOpen=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-expanded',String(!isOpen));
  menu.setAttribute('aria-label',isOpen?'メニューを開く':'メニューを閉じる');
  mobileNav.hidden=isOpen;
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>1080)closeMenu()});
let rafPending=false;
function updateProgress(){const scrollable=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(scrollable>0?window.scrollY/scrollable*100:0)+'%';rafPending=false;}
window.addEventListener('scroll',()=>{if(!rafPending){requestAnimationFrame(updateProgress);rafPending=true;}},{passive:true});
updateProgress();
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.10,rootMargin:'0px 0px -25px 0px'});
  reveals.forEach(el=>observer.observe(el));
}else{reveals.forEach(el=>el.classList.add('is-visible'));}
