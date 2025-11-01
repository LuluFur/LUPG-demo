// Small JS for navigation, year, smooth scroll and basic form UX
document.addEventListener('DOMContentLoaded',function(){
  // nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('primaryNav');
  navToggle && navToggle.addEventListener('click',function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(navList.classList.contains('show')){
          navList.classList.remove('show');
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // basic client-side validation feedback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      // let browser perform default mailto action; we'll just show a quick validation
      const email = document.getElementById('email');
      if(email && !email.checkValidity()){
        e.preventDefault();
        email.focus();
        alert('Please enter a valid email address.');
      }
    });
  }

  // Theme & contrast toggles (persist single mode in localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const contrastToggle = document.getElementById('contrastToggle');
  const body = document.body;

  // Modes: 'default' | 'dark' | 'high-contrast'
  function setMode(mode){
    // clear both classes first
    body.classList.remove('dark');
    body.classList.remove('high-contrast');

    if(mode === 'dark'){
      body.classList.add('dark');
      localStorage.setItem('site-mode','dark');
      if(themeToggle) themeToggle.setAttribute('aria-pressed','true');
      if(contrastToggle) contrastToggle.setAttribute('aria-pressed','false');
    } else if(mode === 'high-contrast'){
      body.classList.add('high-contrast');
      localStorage.setItem('site-mode','high-contrast');
      if(themeToggle) themeToggle.setAttribute('aria-pressed','false');
      if(contrastToggle) contrastToggle.setAttribute('aria-pressed','true');
    } else {
      localStorage.setItem('site-mode','default');
      if(themeToggle) themeToggle.setAttribute('aria-pressed','false');
      if(contrastToggle) contrastToggle.setAttribute('aria-pressed','false');
    }
  }

  function applyPreferences(){
    const storedMode = localStorage.getItem('site-mode');
    if(storedMode){
      setMode(storedMode);
      return;
    }

    // if no stored preference, respect system dark preference
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      setMode('dark');
    } else {
      setMode('default');
    }
  }

  applyPreferences();

  if(themeToggle){
    themeToggle.addEventListener('click',function(){
      // toggle between dark and default; ensure high-contrast is off
      const active = body.classList.contains('dark');
      setMode(active ? 'default' : 'dark');
    });
  }

  if(contrastToggle){
    contrastToggle.addEventListener('click',function(){
      // toggle between high-contrast and default; ensure dark is off
      const active = body.classList.contains('high-contrast');
      setMode(active ? 'default' : 'high-contrast');
    });
  }

  // Continuous marquee for partner logos (accessible) using requestAnimationFrame
  // rAF-based animation avoids CSS loop jumps by advancing transform per-frame.
  (function initMarquee(){
    const marquees = document.querySelectorAll('.marquee');
    marquees.forEach(mq => {
      const track = mq.querySelector('.marquee-track');
      if(!track) return;

      // Prevent double-initialization
      if(mq.__marqueeInitialized) return;
      mq.__marqueeInitialized = true;

  // Duplicate items to produce a seamless loop
  const items = Array.from(track.children);
  items.forEach(item => track.appendChild(item.cloneNode(true)));

  // state (use scrollWidth for accurate content width including images)
  let singleWidth = Math.max(1, track.scrollWidth / 2);
      let speed = Number(mq.dataset.speed) || 16; // px per second
      let offset = 0; // current offset into singleWidth
      let paused = false;
      let rafId = null;
      let lastTime = performance.now();

      // ensure GPU-accelerated transform
      track.style.willChange = 'transform';

      function step(now){
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        if(!paused){
          offset += speed * dt;
          // wrap by subtracting singleWidth to avoid large modulo jumps and preserve fractional part
          while(offset >= singleWidth) offset -= singleWidth;
          // avoid integer rounding to keep smooth subpixel motion
          track.style.transform = `translate3d(${-offset}px,0,0)`;
        }
        rafId = requestAnimationFrame(step);
      }

      function start(){
        if(rafId) return;
        lastTime = performance.now();
        rafId = requestAnimationFrame(step);
      }
      function stop(){ if(rafId){ cancelAnimationFrame(rafId); rafId = null; }}

      function pause(){ paused = true; }
      function resume(){ paused = false; }

      function recompute(){
        // preserve progress proportionally when singleWidth changes
        const oldWidth = singleWidth;
        singleWidth = Math.max(1, track.scrollWidth / 2);
        if(oldWidth > 0){
          const progress = (offset % oldWidth) / oldWidth;
          offset = progress * singleWidth;
        } else {
          offset = 0;
        }
        // ensure immediate transform update to avoid visual jump (keep fractional offset)
        track.style.transform = `translate3d(${-offset}px,0,0)`;
      }

      // Ensure images inside the track are loaded before computing widths and starting animation
      function imagesLoaded(el, cb){
        const imgs = Array.from(el.querySelectorAll('img'));
        if(imgs.length === 0) return cb();
        let remaining = imgs.length;
        imgs.forEach(img => {
          if(img.complete && img.naturalWidth !== 0){
            remaining--; if(remaining === 0) cb();
          } else {
            img.addEventListener('load', ()=>{ remaining--; if(remaining === 0) cb(); });
            img.addEventListener('error', ()=>{ remaining--; if(remaining === 0) cb(); });
          }
        });
      }

      // Pause/resume on hover & focus for accessibility
      mq.addEventListener('mouseenter', pause);
      mq.addEventListener('mouseleave', resume);
      mq.addEventListener('focusin', pause);
      mq.addEventListener('focusout', resume);

      // Recompute on load and resize (throttled)
      window.addEventListener('load', recompute);
      window.addEventListener('resize', ()=>{
        clearTimeout(mq.__marqueeResize);
        mq.__marqueeResize = setTimeout(()=>{
          recompute();
        }, 120);
      });

      // Start after images are loaded so width measurements are correct
      imagesLoaded(track, ()=>{
        recompute();
        start();
      });
    });
  })();
});
