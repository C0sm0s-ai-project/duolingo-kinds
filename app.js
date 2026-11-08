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
const IMG = n => `lorito-${n}.webp`;
['hola','feliz','sorprendido','llorando','escribiendo'].forEach(n => { new Image().src = IMG(n); });

// Palabras que aceptamos al escuchar cada color (el niño puede pronunciar distinto)
const SYN = {
  rojo:['rojo','roja'], azul:['azul'], amarillo:['amarillo','amarilla'], verde:['verde'],
  naranja:['naranja','anaranjado','naranjado'], rosa:['rosa','rosado','rosita'],
  morado:['morado','morada','violeta'], cafe:['cafe','marron']
};

/* ================= UTILIDADES ================= */
const app = document.getElementById('app');
const $ = id => document.getElementById(id);
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(p => p[1]);
const today = () => new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD local
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function load() {
  try { return JSON.parse(localStorage.getItem('lorito')) || {}; } catch (e) { return {}; }
}
function save() {
  try { localStorage.setItem('lorito', JSON.stringify(state)); } catch (e) {}
}
const state = Object.assign({streak: 0, last: '', stickers: [], done: {}, voice: {}}, load());
state.done = state.done || {};
state.voice = state.voice || {};

/* ---------- Voz de Lorito ---------- */
let VOICES = [];
function loadVoices() {
  try {
    VOICES = speechSynthesis.getVoices().filter(v => /^es/i.test((v.lang || '').replace('_', '-')));
  } catch (e) { VOICES = []; }
}
loadVoices();
try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) {}

function scoreVoice(v) {
  let s = 0;
  const l = (v.lang || '').replace('_', '-').toLowerCase();
  if (l === 'es-mx') s += 30; else if (l === 'es-419') s += 25; else if (l === 'es-us') s += 20; else s += 5;
  if (/natural|neural|online|enhanced|premium|wavenet/i.test(v.name)) s += 40;
  if (v.localService === false) s += 15;   // las voces "en línea" suenan mucho mejor
  if (/google/i.test(v.name)) s += 10;
  return s;
}
function pickVoice() {
  if (state.voice.uri) {
    const v = VOICES.find(x => x.voiceURI === state.voice.uri);
    if (v) return v;
  }
  return [...VOICES].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}
function say(text, onend) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'es-MX';
    u.rate = state.voice.rate || 0.9;
    u.pitch = state.voice.pitch || 1.15;
    if (onend) { u.onend = onend; u.onerror = onend; }
    speechSynthesis.speak(u);
  } catch (e) { if (onend) onend(); }
}

/* ---------- Sonidos y confeti ---------- */
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

/* ---------- Reconocimiento de voz (micrófono) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
function lev(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({length: m + 1}, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[m][n];
}
// ¿Alguna de las frases escuchadas contiene el color? (tolerante con la pronunciación infantil)
function matchColor(alts, name) {
  const key = norm(name);
  const list = SYN[key] || [key];
  return alts.some(t => {
    const n = norm(t), compact = n.replace(/ /g, '');
    const words = n.split(' ').filter(Boolean);
    return list.some(s =>
      compact.includes(s) ||
      (s.length >= 4 && words.some(w => w.length >= 3 && lev(w, s) <= 1)));
  });
}
function listen(onResult, onError) {
  if (!SR) { onError('unsupported'); return null; }
  const r = new SR();
  r.lang = 'es-MX'; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
  let done = false;
  r.onresult = e => {
    done = true;
    const alts = [];
    for (const res of e.results) for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
    onResult(alts);
  };
  r.onerror = e => { if (done) return; done = true; onError(e.error || 'error'); };
  r.onend = () => { if (!done) { done = true; onError('no-speech'); } };
  try { r.start(); } catch (e) { done = true; onError('start'); }
  return r;
}
function errText(err) {
  if (err === 'not-allowed' || err === 'service-not-allowed')
    return ['No tengo permiso del micrófono.', 'Adulto: toca el candado junto a la dirección → Permisos → Micrófono → Permitir.'];
  if (err === 'network') return ['No pude escucharte.', 'El micrófono necesita internet.'];
  if (err === 'unsupported') return ['Este navegador no escucha la voz.', 'Usa Chrome en Android.'];
  if (err === 'audio-capture') return ['No encuentro el micrófono.', 'Revisa que el celular tenga micrófono disponible.'];
  return ['No pude escucharte.', 'Intenta otra vez o toca Siguiente.'];
}

/* ================= RACHA Y PREMIOS ================= */
const nextReward = () => REWARDS.find(r => r.days > state.streak);
const currentAccessory = () => [...REWARDS].reverse().find(r => r.days <= state.streak);

// La racha nunca se pierde: si falta días, Lorito se pone triste y el niño lo consuela tocándolo.
let consolado = false;
const gapDays = () => state.last ? daysBetween(state.last, today()) : 0;
function missMessage(triste) {
  if (!state.last) return '¡Hola! Vamos a jugar 🦜';
  if (triste) return '¡Te extrañé! Tócame 💚';
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
  },
  {id: 'repite', title: 'Repite con Lorito', ico: '🎤', type: 'voz'}
];
const LOCKED = [
  {id: 'letras', title: 'Letras', ico: '🔤'},
  {id: 'escribir', title: 'Escribir', ico: '✏️'},
  {id: 'silabas', title: 'Sílabas', ico: '🧩'}
];
const starsFor = n => n >= 5 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0;

/* ================= PANTALLAS ================= */
const navBar = active => `
  <nav class="nav">
    <button data-go="home" class="${active === 'home' ? 'on' : ''}"><span>🏠</span>Inicio</button>
    <button data-go="album" class="${active === 'album' ? 'on' : ''}"><span>📒</span>Pegatinas</button>
    <button data-go="voz" class="${active === 'voz' ? 'on' : ''}"><span>🔊</span>Voz</button>
  </nav>`;
function wireNav() {
  const go = {home: () => home(), album: () => albumScreen(), voz: () => voiceScreen()};
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go[b.dataset.go]());
}

function home() {
  const nx = nextReward();
  const pct = nx ? Math.min(100, state.streak / nx.days * 100) : 100;
  const acc = currentAccessory();
  const triste = !!state.last && gapDays() >= 2 && !consolado;
  app.innerHTML = `
    <header>
      <div class="streak">🔥 ${state.streak}</div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="goal">${nx ? nx.emoji : '🏆'}</div>
    </header>
    <div class="hero">
      <div class="mascot" id="mascot">
        ${acc ? `<span class="acc">${acc.emoji}</span>` : ''}
        <img class="pic" id="pic" src="${IMG(triste ? 'llorando' : 'hola')}" alt="Lorito">
      </div>
      <div class="bubble" id="miss">${missMessage(triste)}</div>
    </div>
    <div class="path" id="path"></div>
    ${navBar('home')}`;
  buildPath();
  wireNav();
  const mascot = $('mascot');
  let sad = triste;
  mascot.onclick = () => {
    mascot.classList.add('hablando');
    setTimeout(() => mascot.classList.remove('hablando'), 1600);
    if (sad) {
      sad = false; consolado = true;
      $('pic').src = IMG('feliz');
      $('miss').textContent = missMessage(false);
      beep(true);
      say('¡Qué bueno que volviste!');
    } else {
      say('¡Hola! Soy Lorito. ¿Jugamos?');
    }
  };
}

function buildPath() {
  const box = $('path');
  const items = [...LESSONS.map(l => ({...l, locked: false})), ...LOCKED.map(l => ({...l, locked: true}))];
  const w = Math.max(280, box.clientWidth - 28), step = 130, xs = [.5, .27, .5, .73];
  const pts = items.map((_, i) => ({x: xs[i % 4] * w, y: 62 + i * step}));
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i-1], b = pts[i];
    d += ` C${a.x} ${a.y + step / 2} ${b.x} ${b.y - step / 2} ${b.x} ${b.y}`;
  }
  const H = 62 + items.length * step - 20;
  // la lección con menos veces completada es la "siguiente"
  const open = items.filter(it => !it.locked);
  const least = open.reduce((m, it) => (state.done[it.id] || 0) < (state.done[m.id] || 0) ? it : m, open[0]);
  box.innerHTML = `<div class="pin" style="width:${w}px;height:${H}px">
    <svg width="${w}" height="${H}"><path class="trail" d="${d}"/></svg>
    ${items.map((it, i) => {
      const n = state.done[it.id] || 0, st = starsFor(n), p = pts[i];
      const cls = it.locked ? 'lock' : (n > 0 ? 'hecho' : '') + (it === least ? ' next' : '');
      const label = it.locked
        ? `${it.title}<small>Pronto</small>`
        : `${it.title}<div class="st">${'⭐'.repeat(st)}${'☆'.repeat(3 - st)}</div>`;
      return `<button class="node ${cls}" data-i="${i}" style="left:${p.x - 48}px;top:${p.y - 48}px">${it.locked ? '🔒' : it.ico}</button>
        <div class="nl" style="left:${p.x - 75}px;top:${p.y + 54}px">${label}</div>`;
    }).join('')}
  </div>`;
  box.querySelectorAll('.node').forEach(b => b.onclick = () => {
    const it = items[+b.dataset.i];
    if (it.locked) {
      b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 450);
      say('¡Muy pronto!');
    } else startLesson(it);
  });
}

function startLesson(lesson) {
  if (lesson.type === 'voz') return voiceLesson(lesson);
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
    $('salir').onclick = home;
    $('oir').onclick = () => say(q.speak);
    setTimeout(() => say(q.speak), 350);
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      if (b.dataset.c === q.answer) {
        locked = true; b.classList.add('ok'); beep(true); say(q.right);
        const lm = $('lm'); if (lm) lm.src = IMG('feliz');
        setTimeout(() => { i++; i < qs.length ? show() : finish(lesson.id); }, 1700);
      } else {
        b.classList.add('bad'); beep(false); say('¡Inténtalo otra vez!');
      }
    });
  }
  show();
}

/* Lección con micrófono: Lorito dice el color y el niño lo repite (como un loro) */
function voiceLesson(lesson) {
  const items = shuffle(COLORS).slice(0, QUESTIONS_PER_LESSON);
  let i = 0, attempts = 0, busy = false, rec = null;
  const stop = () => { try { rec && rec.abort(); } catch (e) {} };

  function next() { i++; i < items.length ? show() : finish(lesson.id); }

  function show() {
    const c = items[i];
    attempts = 0; busy = false;
    app.innerHTML = `
      <div class="top">
        <button class="x" id="salir">✖</button>
        <div class="prog"><i style="width:${i / items.length * 100}%"></i></div>
      </div>
      <div class="q">
        <div class="row">
          <img class="lm" id="lm" src="${IMG('hola')}" alt="Lorito">
          <button class="say" id="oir">🔊</button>
        </div>
        <div class="swatch" id="sw" style="background:${c.h}"></div>
        <div class="hint" id="hint">Toca el micrófono y repite: <b>${c.n}</b></div>
        <button class="mic" id="mic">🎤</button>
        <button class="skip" id="skip" hidden>Siguiente ➜</button>
      </div>`;
    const intro = `Mira, este es el color ${c.n}. ¡Repite conmigo: ${c.n}!`;
    const setHint = (main, small) => { $('hint').innerHTML = main + (small ? `<small>${esc(small)}</small>` : ''); };
    const showSkip = () => { $('skip').hidden = false; };
    const setMic = on => $('mic').classList.toggle('on', on);

    $('salir').onclick = () => { stop(); try { speechSynthesis.cancel(); } catch (e) {} home(); };
    $('oir').onclick = () => say(intro);
    $('skip').onclick = () => { stop(); next(); };
    setTimeout(() => say(intro), 350);

    function good() {
      beep(true);
      $('lm').src = IMG('feliz');
      $('sw').classList.add('ok');
      setHint(`¡Muy bien! Dijiste <b>${c.n}</b> 🎉`);
      say(`¡Muy bien! Dijiste ${c.n}`);
      setTimeout(next, 2000);
    }
    function miss() {
      attempts++;
      if (attempts >= 2) {
        setHint(`¡No pasa nada! Lo hacemos juntos: <b>${c.n}</b>`);
        say(`¡No pasa nada! Lo hacemos juntos: ${c.n}`);
        showSkip();
      } else {
        setHint(`¡Casi! Escucha otra vez: <b>${c.n}</b>`);
        say(`¡Casi! Escucha otra vez: ${c.n}. ¡Inténtalo!`);
      }
    }
    function problem(err) {
      if (err === 'no-speech' || err === 'aborted') {
        attempts++;
        setHint('No te escuché. Toca el micrófono y habla fuerte 🎤');
        say('No te escuché. ¡Habla fuerte!');
        if (attempts >= 2) showSkip();
      } else {
        const [main, small] = errText(err);
        setHint(main, small);
        say('No pude escucharte. ¡Sigamos!');
        showSkip();
      }
    }
    $('mic').onclick = () => {
      if (busy) return;
      busy = true;
      try { speechSynthesis.cancel(); } catch (e) {}   // para que el micrófono no escuche a Lorito
      setMic(true);
      setHint('Te escucho… 👂');
      rec = listen(
        alts => { busy = false; setMic(false); matchColor(alts, c.n) ? good() : miss(); },
        err => { busy = false; setMic(false); problem(err); }
      );
    };
  }
  show();
}

function finish(lessonId) {
  state.done[lessonId] = (state.done[lessonId] || 0) + 1;
  save();
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
  $('seguir').onclick = home;
}

function albumScreen() {
  const slots = STICKERS.map((_, idx) => {
    const s = state.stickers[idx];
    return s ? `<div class="slot">${s}</div>` : '<div class="slot vacio">?</div>';
  }).join('');
  app.innerHTML = `
    <div class="top"><h2 style="margin:4px 0">📒 Mis pegatinas</h2></div>
    <div class="album">${slots}</div>
    ${navBar('album')}`;
  wireNav();
}

function voiceScreen() {
  loadVoices();
  const cur = pickVoice();
  const rate = state.voice.rate || 0.9, pitch = state.voice.pitch || 1.15;
  app.innerHTML = `
    <div class="top"><h2 style="margin:4px 0">🔊 Voz de Lorito</h2></div>
    <div class="vbox">
      <div class="tip">Si la voz suena robótica, prueba otra de la lista. Para voces mejores: Ajustes de Android → Texto a voz → Google → Instalar datos de voz → Español (México).</div>
      <div class="sl"><label>Velocidad <span id="rv">${rate}</span></label><input type="range" id="rate" min="0.7" max="1.1" step="0.05" value="${rate}"></div>
      <div class="sl"><label>Tono <span id="pv">${pitch}</span></label><input type="range" id="pitch" min="0.9" max="1.5" step="0.05" value="${pitch}"></div>
      <button class="big alt" id="probar" style="justify-content:center">🔊 Probar voz</button>
      <div class="vlist">
        ${VOICES.length ? VOICES.map((v, i) => `<button class="vopt ${cur && v.voiceURI === cur.voiceURI ? 'on' : ''}" data-i="${i}">${esc(v.name)}<small>${esc(v.lang)}${v.localService ? '' : ' · en línea'}</small></button>`).join('')
          : '<div class="tip">No encontré voces en español en este celular.</div>'}
      </div>
    </div>
    ${navBar('voz')}`;
  wireNav();
  const test = () => say('¡Hola! Soy Lorito. ¿Jugamos a aprender los colores?');
  $('probar').onclick = test;
  $('rate').oninput = e => { state.voice.rate = +e.target.value; $('rv').textContent = e.target.value; save(); };
  $('pitch').oninput = e => { state.voice.pitch = +e.target.value; $('pv').textContent = e.target.value; save(); };
  document.querySelectorAll('.vopt').forEach(b => b.onclick = () => {
    state.voice.uri = VOICES[+b.dataset.i].voiceURI; save();
    document.querySelectorAll('.vopt').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    test();
  });
}

/* ================= ARRANQUE ================= */
home();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
