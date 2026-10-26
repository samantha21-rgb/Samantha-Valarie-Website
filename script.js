const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

$('#year').textContent = new Date().getFullYear();

// Soft pointer light, disabled for touch-first devices.
const glow = $('.cursor-glow');
if (matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});
} else {
  glow.style.display = 'none';
}

// Navigation panel
const menuButton = $('.menu-toggle');
const menuPanel = $('.menu-panel');
function closeMenu() {
  menuButton.setAttribute('aria-expanded','false');
  menuPanel.classList.remove('open');
  menuPanel.setAttribute('aria-hidden','true');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuPanel.classList.toggle('open', !isOpen);
  menuPanel.setAttribute('aria-hidden', String(isOpen));
  document.body.classList.toggle('menu-open', !isOpen);
});
$$('.menu-panel a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); closeLetter(); }
});

// Interactive constellation worlds
const worlds = {
  curiosity: {
    count:'WORLD 01 / 05', eyebrow:'THE OPEN DOOR', title:'Curiosity<br>is a compass.',
    description:'I like following a question just to see where it goes. New ideas, unfamiliar places, unexpected conversations — they remind me that the world is bigger than the version I already know.',
    tag:'ALWAYS ASKING WHY', symbol:'✳'
  },
  softness: {
    count:'WORLD 02 / 05', eyebrow:'A DIFFERENT KIND OF STRENGTH', title:'Softness is<br>not weakness.',
    description:'I want to be kind without abandoning myself. To care deeply, set boundaries, change my mind, and keep a tender heart in a world that sometimes mistakes tenderness for fragility.',
    tag:'GENTLE, NOT SMALL', symbol:'☾'
  },
  dreams: {
    count:'WORLD 03 / 05', eyebrow:'THE UNWRITTEN MAP', title:'Dream bigger<br>than the plan.',
    description:'Some dreams are destinations. Others are tiny sparks that ask me to try something new. I am learning to make plans, stay open, and let the journey surprise me.',
    tag:'ROOM FOR THE UNEXPECTED', symbol:'✦'
  },
  joy: {
    count:'WORLD 04 / 05', eyebrow:'THE GOOD, ORDINARY MAGIC', title:'Let the little<br>things be huge.',
    description:'A favourite song. A laugh that comes out too loud. A sky that makes me stop walking. I never want to get so busy building a life that I forget to actually live it.',
    tag:'COLLECTING SMALL WONDERS', symbol:'♡'
  },
  growth: {
    count:'WORLD 05 / 05', eyebrow:'NOT FINISHED. NOT LOST.', title:'In progress<br>is a place.',
    description:'I am allowed to learn out loud, to outgrow old versions of myself, and to begin again without turning every detour into a failure. Becoming is the whole point.',
    tag:'STILL BECOMING', symbol:'∞'
  }
};
const nodeButtons = $$('.planet-node');
nodeButtons.forEach(btn => btn.addEventListener('click', () => {
  nodeButtons.forEach(n => n.classList.toggle('active', n === btn));
  const w = worlds[btn.dataset.world];
  $('#world-count').textContent = w.count;
  $('#world-eyebrow').textContent = w.eyebrow;
  $('#world-title').innerHTML = w.title;
  $('#world-description').textContent = w.description;
  $('#world-tag').textContent = w.tag;
  $('.world-symbol').textContent = w.symbol;
  $('.world-card').animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
}));

// Letter modal
const letterModal = $('#letter-modal');
function closeLetter() {
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden','true');
}
$('#open-letter').addEventListener('click', () => {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden','false');
  $('.close-letter').focus();
});
$('.close-letter').addEventListener('click', closeLetter);
letterModal.addEventListener('click', e => { if (e.target === letterModal) closeLetter(); });

// Entrance reveals: no content hidden if JS/observer is unavailable.
const revealTargets = $$('.manifesto-grid, .section-heading, .universe-layout, .quote-section blockquote, .notes-grid, .future-content, .closing-title');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  revealTargets.forEach(el => observer.observe(el));
} else revealTargets.forEach(el => el.classList.add('visible'));

// Keep decorative orbit responsive and subtly interactive on desktop.
const scene = $('.orbital-scene');
if (matchMedia('(pointer:fine)').matches) {
  $('.hero').addEventListener('pointermove', e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    scene.style.marginLeft = `${x*12}px`;
    scene.style.marginTop = `${y*12}px`;
  }, {passive:true});
}
