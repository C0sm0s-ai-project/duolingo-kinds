/* ================= DATOS ================= */
const COLORS = [
  {n:'rojo',h:'#e53935'},{n:'azul',h:'#1e88e5'},{n:'amarillo',h:'#fdd835'},
  {n:'verde',h:'#43a047'},{n:'naranja',h:'#fb8c00'},{n:'rosa',h:'#ec407a'},
  {n:'morado',h:'#8e24aa'},{n:'café',h:'#795548'}
];
const ANIMALS = [
  {e:'🐸',n:'la rana',c:'verde'},{e:'🐥',n:'el pollito',c:'amarillo'},
  {e:'🦊',n:'el zorro',c:'naranja'},{e:'🐷',n:'el cerdito',c:'rosa'},
  {e:'🐳',n:'la ballena',c:'azul'},{e:'🐻',n:'el oso',c:'café'},
  {e:'🐞',n:'la catarina',c:'rojo'}
];
const STICKERS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
                  '🐷','🐸','🐵','🐔','🐧','🐦','🐥','🦆','🦉','🐢','🐙','🐳'];
const REWARDS = [
  {days:3, emoji:'🎩', name:'un sombrero'},
  {days:7, emoji:'🕶️', name:'unos lentes'},
  {days:14, emoji:'👑', name:'una corona'},
  {days:30, emoji:'🏆', name:'un trofeo'}
];
const QUESTIONS_PER_LESSON = 5;

/* Expresiones de Lorito: hola, feliz, sorprendido, llorando, escribiendo */
const IMG = n => `lorito-${n}.webp`;
['hola','feliz','sorprendido','llorando','escribiendo'].forEach(n => { new Image().src = IMG(n); });

/* ================= UTILIDADES ================= */
const app = document.getElementById('app');
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(p => p[1]);
const today = () => new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD local
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

function load() {
  try { return JSON.parse(localStorage.getItem('lorito')) || {}; } catch (e) { return {}; }
}
function save() {
  try { localStorage.setItem('lorito', JSON.stringify(state)); } catch (e) {}
}
const state = Object.assign({streak: 0, last: '', stickers: []}, load());

function say(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-MX'; u.rate = 0.85; u.pitch = 1.3;
    speechSynthesis.speak(u);
  } catch (e) {}
}
let actx;
function beep(ok) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [523, 659, 784] : [330, 262];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = f; o.type = 'sine';
      o.connect(g); g.connect(actx.destination);
      const t = actx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.start(t); o.stop(t + 0.22);
    });
  } catch (e) {}
}
function confetti() {
  const set = ['🎉','⭐','🌈','🎈','✨','🦜'];
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('span');
    s.className = 'confeti';
    s.textContent = set[i % set.length];
    s.style.left = Math.random() * 95 + 'vw';
    s.style.animationDelay = Math.random() * 0.8 + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}

/* ================= RACHA Y PREMIOS ================= */
const nextReward = () => REWARDS.find(r => r.days > state.streak);
const currentAccessory = () => [...REWARDS].reverse().find(r => r.days <= state.streak);

// La racha nunca se pierde: si falta días, Lorito se pone triste y el niño lo consuela tocándolo.
let consolado = false;
const gapDays = () => state.last ? daysBetween(state.last, today()) : 0;
function missMessage(triste) {
  if (!state.last) return '¡Hola! Vamos a jugar 🦜';
  if (triste) return '¡Tu loro te extrañó! Tócalo 💚';
  if (gapDays() >= 2) return '¡Qué bueno que volviste! 🌈';
  if (gapDays() === 0) return '¡Ya jugaste hoy! Puedes jugar más 🌟';
  return '¡Qué bueno verte otra vez! 🌈';
}
function awardDay() {
  if (state.last === today()) return {first: false};
  state.streak += 1;
  state.last = today();
  const sticker = STICKERS[(state.stickers.length) % STICKERS.length];
  state.stickers.push(sticker);
  const reward = REWARDS.find(r => r.days === state.streak) || null;
  save();
  return {first: true, sticker, reward};
}

/* ================= LECCIONES ================= */
function optionsFor(correct) {
  const others = shuffle(COLORS.filter(c => c.n !== correct)).slice(0, 2);
  return shuffle([COLORS.find(c => c.n === correct), ...others]);
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const LESSONS = [
  {
    id: 'colores', title: 'Colores', ico: '🎨',
    make: () => shuffle(COLORS).slice(0, QUESTIONS_PER_LESSON).map(c => ({
      speak: `Toca el color ${c.n}`, right: `¡Muy bien! Es el ${c.n}`,
      options: optionsFor(c.n), answer: c.n, big: ''
    }))
  },
  {
    id: 'animales', title: 'Animales y su color', ico: '🐸',
    make: () => shuffle(ANIMALS).slice(0, QUESTIONS_PER_LESSON).map(a => ({
      speak: `¿De qué color es ${a.n}?`, right: `¡Muy bien! ${cap(a.n)} es ${a.c}`,
      options: optionsFor(a.c), answer: a.c, big: a.e
    }))
  }
];

/* ================= PANTALLAS ================= */
function home() {
  const nx = nextReward();
  const pct = nx ? Math.min(100, state.streak / nx.days * 100) : 100;
  const acc = currentAccessory();
  const triste = !!state.last && gapDays() >= 2 && !consolado;
  app.innerHTML = `
    <header>
      <div class="streak">🔥 <b>${state.streak}</b></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="goal">${nx ? nx.emoji : '🏆'}</div>
    </header>
    <div class="miss" id="miss">${missMessage(triste)}</div>
    <div class="mascot" id="mascot">
      ${acc ? `<span class="acc">${acc.emoji}</span>` : ''}
      <img class="pic" id="pic" src="${IMG(triste ? 'llorando' : 'hola')}" alt="Lorito">
    </div>
    <div class="lessons">
      ${LESSONS.map(l => `<button class="big" data-lesson="${l.id}"><span class="ico">${l.ico}</span>${l.title}</button>`).join('')}
      <button class="big off"><span class="ico">🔤</span><div>Letras<small>Pronto</small></div></button>
      <button class="big off"><img class="mini" src="${IMG('escribiendo')}" alt=""><div>Escribir<small>Pronto</small></div></button>
      <button class="big alt" id="album"><span class="ico">📒</span>Mis pegatinas</button>
    </div>`;
  const mascot = document.getElementById('mascot');
  let sad = triste;
  mascot.onclick = () => {
    mascot.classList.add('hablando');
    setTimeout(() => mascot.classList.remove('hablando'), 1600);
    if (sad) {
      sad = false; consolado = true;
      document.getElementById('pic').src = IMG('feliz');
      document.getElementById('miss').textContent = missMessage(false);
      beep(true);
      say('¡Qué bueno que volviste!');
    } else {
      say('¡Hola! Soy Lorito. ¿Jugamos?');
    }
  };
  document.querySelectorAll('[data-lesson]').forEach(b =>
    b.onclick = () => startLesson(LESSONS.find(l => l.id === b.dataset.lesson)));
  document.getElementById('album').onclick = albumScreen;
}

function startLesson(lesson) {
  const qs = lesson.make();
  let i = 0, locked = false;
  function show() {
    const q = qs[i];
    app.innerHTML = `
      <div class="top">
        <button class="x" id="salir">✖</button>
        <div class="prog"><i style="width:${i / qs.length * 100}%"></i></div>
      </div>
      <div class="q">
        <div class="row">
          <img class="lm" id="lm" src="${IMG('hola')}" alt="Lorito">
          <button class="say" id="oir">🔊</button>
        </div>
        ${q.big ? `<div class="animal">${q.big}</div>` : ''}
        <div class="opts">
          ${q.options.map(o => `<button class="opt" data-c="${o.n}" style="background:${o.h}"></button>`).join('')}
        </div>
      </div>`;
    locked = false;
    document.getElementById('salir').onclick = home;
    document.getElementById('oir').onclick = () => say(q.speak);
    setTimeout(() => say(q.speak), 350);
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      if (b.dataset.c === q.answer) {
        locked = true; b.classList.add('ok'); beep(true); say(q.right);
        const lm = document.getElementById('lm');
        if (lm) lm.src = IMG('feliz');
        setTimeout(() => { i++; i < qs.length ? show() : finish(); }, 1700);
      } else {
        b.classList.add('bad'); beep(false); say('¡Inténtalo otra vez!');
      }
    });
  }
  show();
}

function finish() {
  const r = awardDay();
  confetti(); beep(true);
  let pose = 'feliz', extra = '';
  if (r.first) {
    extra = `<div class="sticker">${r.sticker}</div><div>¡Nueva pegatina!</div>`;
    if (r.reward) {
      pose = 'sorprendido';
      extra += `<div style="font-size:54px;line-height:1">${r.reward.emoji}</div><div>¡Lorito ganó ${r.reward.name}!</div>`;
    }
    say(r.reward ? `¡Muy bien! Lorito ganó ${r.reward.name}` : '¡Muy bien! Ganaste una pegatina');
  } else {
    say('¡Muy bien!');
  }
  app.innerHTML = `<div class="center">
    <h1>¡Terminaste! 🎉</h1>
    <img class="fin" src="${IMG(pose)}" alt="Lorito">
    ${extra}
    <button class="big" id="seguir" style="justify-content:center">Seguir ➜</button></div>`;
  document.getElementById('seguir').onclick = home;
}

function albumScreen() {
  const slots = STICKERS.map((_, idx) => {
    const s = state.stickers[idx];
    return s ? `<div class="slot">${s}</div>` : '<div class="slot vacio">?</div>';
  }).join('');
  app.innerHTML = `
    <div class="top"><button class="x" id="atras">⬅</button><h2 style="margin:0">Mis pegatinas</h2></div>
    <div class="album" style="margin-top:12px">${slots}</div>`;
  document.getElementById('atras').onclick = home;
}

/* ================= ARRANQUE ================= */
home();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
