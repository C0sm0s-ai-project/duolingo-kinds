/* ================= DATOS ================= */
const COLORS = [
  {n:'rojo',h:'#e53935'},{n:'azul',h:'#1e88e5'},{n:'amarillo',h:'#fdd835'},
  {n:'verde',h:'#43a047'},{n:'naranja',h:'#fb8c00'},{n:'rosa',h:'#ec407a'},
  {n:'morado',h:'#8e24aa'},{n:'café',h:'#795548'}
];
// Animales para la lección "Animales y su color"
const ANIMALS = [
  {e:'🐸',n:'la rana',c:'verde'},{e:'🐥',n:'el pollito',c:'amarillo'},
  {e:'🦊',n:'el zorro',c:'naranja'},{e:'🐷',n:'el cerdito',c:'rosa'},
  {e:'🐳',n:'la ballena',c:'azul'},{e:'🐻',n:'el oso',c:'café'},
  {e:'🐞',n:'la catarina',c:'rojo'}
];
// Animales para "Nombres de animales" y "Repite animales"
const ZOO = [
  {id:'perro',e:'🐶',art:'el perro',w:'perro',sound:'guau guau',ok:['perro','perrito']},
  {id:'gato',e:'🐱',art:'el gato',w:'gato',sound:'miau miau',ok:['gato','gatito']},
  {id:'vaca',e:'🐮',art:'la vaca',w:'vaca',sound:'muuu muuu',ok:['vaca']},
  {id:'cerdito',e:'🐷',art:'el cerdito',w:'cerdito',sound:'oink oink',ok:['cerdito','cerdo','puerquito']},
  {id:'pollito',e:'🐥',art:'el pollito',w:'pollito',sound:'pío pío',ok:['pollito','pollo']},
  {id:'rana',e:'🐸',art:'la rana',w:'rana',sound:'croac croac',ok:['rana','ranita']},
  {id:'pato',e:'🦆',art:'el pato',w:'pato',sound:'cuac cuac',ok:['pato','patito']},
  {id:'oveja',e:'🐑',art:'la oveja',w:'oveja',sound:'beee beee',ok:['oveja','ovejita']},
  {id:'caballo',e:'🐴',art:'el caballo',w:'caballo',sound:'ji ji ji',ok:['caballo','caballito']},
  {id:'leon',e:'🦁',art:'el león',w:'león',sound:'grrr grrr',ok:['leon','leoncito']},
  {id:'mono',e:'🐵',art:'el mono',w:'mono',sound:'uh uh, ah ah',ok:['mono','monito']},
  {id:'elefante',e:'🐘',art:'el elefante',w:'elefante',sound:'pruuu',ok:['elefante']}
];
// Letras: L = letra, sp = cómo se dice, w = palabra de ejemplo, e = dibujo
const LETTERS = [
  {L:'A',sp:'a',w:'avión',e:'✈️'},{L:'B',sp:'be',w:'ballena',e:'🐳'},{L:'C',sp:'ce',w:'casa',e:'🏠'},
  {L:'D',sp:'de',w:'dado',e:'🎲'},{L:'E',sp:'e',w:'elefante',e:'🐘'},{L:'F',sp:'efe',w:'flor',e:'🌸'},
  {L:'G',sp:'ge',w:'gato',e:'🐱'},{L:'H',sp:'hache',w:'helado',e:'🍦'},{L:'I',sp:'i',w:'iguana',e:'🦎'},
  {L:'J',sp:'jota',w:'jirafa',e:'🦒'},{L:'K',sp:'ka',w:'koala',e:'🐨'},{L:'L',sp:'ele',w:'luna',e:'🌙'},
  {L:'M',sp:'eme',w:'mono',e:'🐵'},{L:'N',sp:'ene',w:'nube',e:'☁️'},{L:'Ñ',sp:'eñe',w:'piña',e:'🍍'},
  {L:'O',sp:'o',w:'oso',e:'🐻'},{L:'P',sp:'pe',w:'perro',e:'🐶'},{L:'Q',sp:'cu',w:'queso',e:'🧀'},
  {L:'R',sp:'erre',w:'ratón',e:'🐭'},{L:'S',sp:'ese',w:'sol',e:'☀️'},{L:'T',sp:'te',w:'tortuga',e:'🐢'},
  {L:'U',sp:'u',w:'uva',e:'🍇'},{L:'V',sp:'ve',w:'vaca',e:'🐮'},{L:'W',sp:'doble ve',w:'wifi',e:'📶'},
  {L:'X',sp:'equis',w:'taxi',e:'🚕'},{L:'Y',sp:'ye',w:'yema',e:'🥚'},{L:'Z',sp:'zeta',w:'zapato',e:'👟'}
];
const VOWELS = LETTERS.filter(l => 'AEIOU'.includes(l.L));
const STICKERS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
                  '🐷','🐸','🐵','🐔','🐧','🐦','🐥','🦆','🦉','🐢','🐙','🐳'];
const REWARDS = [
  {days:3,  key:'sombrero', name:'un sombrero'},
  {days:7,  key:'lentes',   name:'unos lentes'},
  {days:14, key:'corona',   name:'una corona'},
  {days:30, key:'trofeo',   name:'un trofeo'}
];
const QUESTIONS_PER_LESSON = 5;
const PRAISE = ['¡Muy bien!','¡Excelente!','¡Eso es!','¡Genial!','¡Bravo!'];
const POSES = ['hola','feliz','sorprendido','llorando','escribiendo'];
const IMG = n => `lorito-${n}.webp`;
POSES.forEach(n => { new Image().src = IMG(n); });

// Palabras que aceptamos al escuchar cada color (el niño puede pronunciar distinto)
const SYN = {
  rojo:['rojo','roja'], azul:['azul'], amarillo:['amarillo','amarilla'], verde:['verde'],
  naranja:['naranja','anaranjado','naranjado'], rosa:['rosa','rosado','rosita'],
  morado:['morado','morada','violeta'], cafe:['cafe','marron']
};

/* ================= ACCESORIOS DE LORITO (dibujados) ================= */
const C = {cafe:'#292421', coral:'#F4775F', turq:'#78C7C0', amar:'#FFC95C', vain:'#FFF0D0'};
const ART = {
  sombrero: `<svg viewBox="0 0 120 110"><ellipse cx="60" cy="92" rx="54" ry="13" fill="${C.turq}" stroke="${C.cafe}" stroke-width="5"/><path d="M30 92V22Q30 12 40 12H80Q90 12 90 22V92Q60 104 30 92Z" fill="${C.turq}" stroke="${C.cafe}" stroke-width="5" stroke-linejoin="round"/><path d="M30 74Q60 86 90 74V90Q60 102 30 90Z" fill="${C.coral}" stroke="${C.cafe}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="60" cy="14" rx="30" ry="6" fill="#9ADAD3" stroke="${C.cafe}" stroke-width="4"/></svg>`,
  corona: `<svg viewBox="0 0 120 100"><path d="M10 90V34L36 58L60 14L84 58L110 34V90Z" fill="${C.amar}" stroke="${C.cafe}" stroke-width="5" stroke-linejoin="round"/><rect x="10" y="72" width="100" height="18" fill="${C.coral}" stroke="${C.cafe}" stroke-width="5" stroke-linejoin="round"/><circle cx="10" cy="32" r="7" fill="${C.coral}" stroke="${C.cafe}" stroke-width="4"/><circle cx="60" cy="12" r="7" fill="${C.coral}" stroke="${C.cafe}" stroke-width="4"/><circle cx="110" cy="32" r="7" fill="${C.coral}" stroke="${C.cafe}" stroke-width="4"/><circle cx="35" cy="81" r="4" fill="${C.turq}"/><circle cx="60" cy="81" r="4" fill="${C.turq}"/><circle cx="85" cy="81" r="4" fill="${C.turq}"/></svg>`,
  lentes: `<svg viewBox="0 0 150 64"><path d="M62 26Q75 16 88 26" fill="none" stroke="${C.cafe}" stroke-width="6" stroke-linecap="round"/><rect x="5" y="10" width="58" height="46" rx="20" fill="${C.turq}" fill-opacity=".55" stroke="${C.cafe}" stroke-width="6"/><rect x="87" y="10" width="58" height="46" rx="20" fill="${C.turq}" fill-opacity=".55" stroke="${C.cafe}" stroke-width="6"/><path d="M17 24L31 17M99 24L113 17" stroke="#fff" stroke-opacity=".85" stroke-width="5" stroke-linecap="round"/></svg>`,
  trofeo: `<svg viewBox="0 0 100 120"><path d="M26 20H8Q6 50 30 58" fill="none" stroke="${C.cafe}" stroke-width="6" stroke-linecap="round"/><path d="M74 20H92Q94 50 70 58" fill="none" stroke="${C.cafe}" stroke-width="6" stroke-linecap="round"/><path d="M24 8H76V44Q76 72 50 74Q24 72 24 44Z" fill="${C.amar}" stroke="${C.cafe}" stroke-width="5" stroke-linejoin="round"/><rect x="43" y="74" width="14" height="18" fill="${C.amar}" stroke="${C.cafe}" stroke-width="5"/><rect x="26" y="92" width="48" height="16" rx="5" fill="${C.coral}" stroke="${C.cafe}" stroke-width="5"/><path d="M50 22L55 34L68 35L58 43L62 56L50 49L38 56L42 43L32 35L45 34Z" fill="${C.vain}" stroke="${C.cafe}" stroke-width="3" stroke-linejoin="round"/></svg>`
};
// Posiciones (en % de la imagen): cabeza [x, y, giro, ancho], ojos [x, y, giro, ancho], trofeo [x, y, ancho, giro]
const AN = {
  hola:        {head:[60,18,12,34],  eyes:[70,35,14,62],  cup:[88,86,24,8]},
  feliz:       {head:[52,16,-14,34], eyes:[56,27,-16,60], cup:[90,88,24,-8]},
  sorprendido: {head:[55,15,-5,34],  eyes:[55.5,32.5,-6,58], cup:[90,90,24,6]},
  llorando:    {head:[43,14,-6,34],  eyes:[55,33,-11,56], cup:[88,90,24,6]},
  escribiendo: {head:[60,18,6,34],   eyes:[57,48,9,52],   cup:[90,78,22,6]}
};
function wearing() {
  const s = state.streak;
  return {hat: s >= 14 ? 'corona' : s >= 3 ? 'sombrero' : null, glasses: s >= 7, trophy: s >= 30};
}
function accHTML(pose, still) {
  const a = AN[pose] || AN.hola, w = wearing(), k = still ? ' still' : '';
  let h = '';
  if (w.glasses) h += `<span class="ac gl${k}" style="left:${a.eyes[0]}%;top:${a.eyes[1]}%;width:${a.eyes[3]}%;--r:${a.eyes[2]}deg">${ART.lentes}</span>`;
  if (w.hat) h += `<span class="ac hat${k}" style="left:${a.head[0]}%;top:${a.head[1]}%;width:${a.head[3]}%;--r:${a.head[2]}deg">${ART[w.hat]}</span>`;
  if (w.trophy) h += `<span class="ac tr${k}" style="left:${a.cup[0]}%;top:${a.cup[1]}%;width:${a.cup[2]}%;--r:${a.cup[3]}deg">${ART.trofeo}</span>`;
  return h;
}
// Lorito con su ropa: cls = m (inicio), l (lección), f (final)
function lorito(pose, cls) {
  return `<span class="lw ${cls || ''}" data-pose="${pose}"><img class="lp" src="${IMG(pose)}" alt="Lorito"><span class="acs">${accHTML(pose)}</span></span>`;
}
function setPose(root, pose) {
  const el = root && root.querySelector ? (root.classList.contains('lw') ? root : root.querySelector('.lw')) : null;
  if (!el) return;
  el.dataset.pose = pose;
  el.querySelector('.lp').src = IMG(pose);
  el.querySelector('.acs').innerHTML = accHTML(pose, true);   // sin repetir la animación de entrada
}

/* ================= UTILIDADES ================= */
const app = document.getElementById('app');
const $ = id => document.getElementById(id);
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(p => p[1]);
const pick = a => a[Math.floor(Math.random() * a.length)];
const today = () => new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD local
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const BGS = ['var(--coral)','var(--turquesa)','var(--amarillo)','var(--durazno)'];

function load() {
  try { return JSON.parse(localStorage.getItem('lorito')) || {}; } catch (e) { return {}; }
}
function save() {
  try { localStorage.setItem('lorito', JSON.stringify(state)); } catch (e) {}
}
const state = Object.assign({streak: 0, last: '', stickers: [], done: {}, voice: {}, mute: false}, load());
state.done = state.done || {};
state.voice = state.voice || {};

// Cambia de pantalla con una animación suave
function render(html) {
  app.innerHTML = html;
  app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
}

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
  if (/natural|neural|enhanced|premium|wavenet/i.test(v.name)) s += 40;
  if (/google/i.test(v.name)) s += 10;
  // "natural": prefiere voces en línea (suenan mejor pero tardan en responder)
  // "rapida": prefiere voces guardadas en el celular (responden al instante)
  if (state.voice.mode === 'rapida') { if (v.localService !== false) s += 60; }
  else if (v.localService === false) s += 15;
  return s;
}
function pickVoice(onlyLocal) {
  if (!onlyLocal && state.voice.uri) {
    const v = VOICES.find(x => x.voiceURI === state.voice.uri);
    if (v) return v;
  }
  const pool = onlyLocal ? VOICES.filter(v => v.localService !== false) : VOICES;
  return [...pool].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}
let lastU, sayId = 0;   // se guarda la frase en curso: si no, Chrome a veces la "olvida" y no avisa cuando termina
// Con el primer toque se "despierta" la voz del celular, para que la primera frase no tarde
function warmUp() {
  try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
}
document.addEventListener('pointerdown', warmUp, {once: true});
function say(text, onend) {
  try {
    const ss = speechSynthesis;
    const id = ++sayId;                      // cada frase nueva anula a las anteriores
    const busy = ss.speaking || ss.pending;
    if (busy) ss.cancel();
    let finished = false;
    const done = () => { if (finished) return; finished = true; if (onend) onend(); };
    const speak = voice => {
      const u = new SpeechSynthesisUtterance(text);
      lastU = u;
      if (voice) { try { u.voice = voice; } catch (e) {} u.lang = voice.lang; } else u.lang = 'es-MX';
      u.rate = state.voice.rate || 0.95;
      u.pitch = state.voice.pitch || 1;     // 1 = tono sin procesar (suena menos artificial)
      u.onend = done;
      u.onerror = e => {
        // si falló una voz en línea (por ejemplo sin internet), se repite con una voz del celular
        if (voice && voice.localService === false && e && e.error !== 'canceled' && e.error !== 'interrupted') {
          const loc = pickVoice(true);
          if (loc && loc !== voice && id === sayId) return speak(loc);
        }
        done();
      };
      ss.speak(u);
    };
    const v = (navigator.onLine === false) ? (pickVoice(true) || pickVoice()) : pickVoice();
    busy ? setTimeout(() => { id === sayId ? speak(v) : done(); }, 60) : speak(v);   // Chrome ignora un speak() pegado a un cancel()
  } catch (e) { if (onend) onend(); }
}

/* ---------- Sonidos (se pueden apagar en la pantalla Voz) ---------- */
let actx;
function ac() {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  } catch (e) { return null; }
}
function tone(f, t0, d, type, g, f2) {
  const c = ac(); if (!c || state.mute) return;
  try {
    const o = c.createOscillator(), v = c.createGain(), t = c.currentTime + t0;
    o.type = type || 'sine';
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    v.gain.setValueAtTime(0.0001, t);
    v.gain.exponentialRampToValueAtTime(g || 0.12, t + 0.02);
    v.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(v); v.connect(c.destination);
    o.start(t); o.stop(t + d + 0.05);
  } catch (e) {}
}
function buzz(ms) { try { if (!state.mute && navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
const sfx = {
  ok()    { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.22, 'triangle', 0.14)); buzz(40); },
  bad()   { tone(300, 0, 0.18, 'sine', 0.1, 220); tone(220, 0.15, 0.22, 'sine', 0.08, 180); },
  tap()   { tone(660, 0, 0.07, 'sine', 0.08, 880); },
  chirp() { tone(1300, 0, 0.09, 'sine', 0.1, 1900); tone(1700, 0.12, 0.1, 'sine', 0.1, 1200); tone(1500, 0.26, 0.12, 'sine', 0.09, 2100); },
  win()   { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.1, 0.25, 'triangle', 0.13)); buzz([60, 40, 60]); },
  star()  { tone(1319, 0, 0.15, 'triangle', 0.1); tone(1760, 0.1, 0.25, 'triangle', 0.1); }
};
function confetti() {
  const cols = ['#F4775F', '#78C7C0', '#FFC95C', '#F4C4A8', '#7A958F'], emo = ['⭐', '🌈', '🦜', '🎈'];
  for (let i = 0; i < 38; i++) {
    const s = document.createElement('span');
    s.className = 'confeti';
    if (i % 6 === 0) { s.textContent = emo[(i / 6) % emo.length]; s.style.fontSize = '26px'; }
    else {
      const w = 8 + Math.random() * 8;
      s.style.cssText += `width:${w}px;height:${w * (Math.random() < .5 ? 1 : 1.6)}px;background:${cols[i % cols.length]};border-radius:${Math.random() < .4 ? '50%' : '3px'};border:2px solid #292421;`;
    }
    s.style.left = Math.random() * 96 + 'vw';
    s.style.animationDelay = Math.random() * 0.8 + 's';
    s.style.animationDuration = 1.8 + Math.random() * 1.2 + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3800);
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
// ¿Alguna de las frases escuchadas contiene alguna de las palabras aceptadas? (tolerante con la pronunciación infantil)
function matchWords(alts, list) {
  const L = list.map(norm);
  return alts.some(t => {
    const n = norm(t), compact = n.replace(/ /g, '');
    const words = n.split(' ').filter(Boolean);
    return L.some(s =>
      compact.includes(s) ||
      (s.length >= 4 && words.some(w => w.length >= 3 && lev(w, s) <= 1)));
  });
}
const matchColor = (alts, name) => matchWords(alts, SYN[norm(name)] || [name]);
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
const colorOpts = correct => {
  const pool = shuffle(COLORS.filter(c => c.n !== correct.n)).slice(0, 2);
  return shuffle([correct, ...pool]).map(c => ({id: c.n, bg: c.h}));
};
const letterOpts = (correct, pool) => {
  const bgs = shuffle(BGS);
  return shuffle([correct, ...shuffle(pool.filter(l => l.L !== correct.L)).slice(0, 2)])
    .map((l, i) => ({id: l.L, top: l.L, low: l.L.toLowerCase(), bg: bgs[i]}));
};
const zooOpts = correct => {
  const bgs = shuffle(BGS);
  return shuffle([correct, ...shuffle(ZOO.filter(z => z.id !== correct.id)).slice(0, 2)])
    .map((z, i) => ({id: z.id, e: z.e, bg: bgs[i]}));
};
const letterQ = (l, pool) => ({
  kind: 'letter', speak: `Toca la letra ${l.sp}`,
  right: `${pick(PRAISE)} La letra ${l.sp}, de ${l.w}`,
  reveal: `<span class="rve">${l.e}</span><span><b>${l.L}</b> de ${l.w}</span>`,
  options: letterOpts(l, pool), answer: l.L
});

const LESSONS = [
  {id:'colores', title:'Colores', ico:'🎨',
   make: () => shuffle(COLORS).slice(0, QUESTIONS_PER_LESSON).map(c => ({
     kind:'color', speak:`Toca el color ${c.n}`, right:`${pick(PRAISE)} Es el ${c.n}`,
     options: colorOpts(c), answer: c.n}))},
  {id:'animales', title:'Animales y su color', ico:'🐸',
   make: () => shuffle(ANIMALS).slice(0, QUESTIONS_PER_LESSON).map(a => ({
     kind:'color', speak:`¿De qué color es ${a.n}?`, right:`${pick(PRAISE)} ${cap(a.n)} es ${a.c}`,
     big:`<div class="animal">${a.e}</div>`,
     options: colorOpts(COLORS.find(c => c.n === a.c)), answer: a.c}))},
  {id:'repite', title:'Repite colores', ico:'🎤',
   voz: () => shuffle(COLORS).slice(0, QUESTIONS_PER_LESSON).map(c => ({
     visual:`<div class="swatch" style="background:${c.h}"></div>`,
     intro:`Mira, este es el color ${c.n}. ¡Repite conmigo: ${c.n}!`,
     label:c.n, accept:SYN[norm(c.n)] || [c.n], good:`¡Muy bien! Dijiste ${c.n}`}))},
  {id:'vocales', title:'Vocales', ico:'🅰️',
   make: () => shuffle(VOWELS).slice(0, QUESTIONS_PER_LESSON).map(l => letterQ(l, VOWELS))},
  {id:'zoo', title:'Nombres de animales', ico:'🐶',
   make: () => shuffle(ZOO).slice(0, QUESTIONS_PER_LESSON).map(z => ({
     kind:'emoji', speak:`Toca ${z.art}`, right:`${pick(PRAISE)} Es ${z.art}. ${cap(z.sound)}`,
     reveal:`<span class="rve">${z.e}</span><span>${cap(z.art)} hace <b>${z.sound}</b></span>`,
     options: zooOpts(z), answer: z.id}))},
  {id:'repite2', title:'Repite animales', ico:'🗣️',
   voz: () => shuffle(ZOO).slice(0, QUESTIONS_PER_LESSON).map(z => ({
     visual:`<div class="animal">${z.e}</div>`,
     intro:`Mira, ${z.art}. ¡Repite conmigo: ${z.w}!`,
     label:z.w, accept:z.ok, good:`¡Muy bien! Dijiste ${z.w}`}))},
  {id:'abc', title:'Abecedario', ico:'🔤',
   make: () => shuffle(LETTERS).slice(0, QUESTIONS_PER_LESSON).map(l => letterQ(l, LETTERS))}
];
const LOCKED = [
  {id:'escribir', title:'Escribir', ico:'✏️'},
  {id:'silabas', title:'Sílabas', ico:'🧩'}
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
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sfx.tap(); go[b.dataset.go](); });
}

function home() {
  const nx = nextReward();
  const pct = nx ? Math.min(100, state.streak / nx.days * 100) : 100;
  const triste = !!state.last && gapDays() >= 2 && !consolado;
  render(`
    <header>
      <div class="streak"><span class="fl">🔥</span> ${state.streak}</div>
      <div class="bar"><i id="barfill" style="width:0"></i></div>
      <div class="goal" title="Siguiente premio">${ART[nx ? nx.key : 'trofeo']}</div>
    </header>
    <div class="hero">
      <div class="mascot" id="mascot">${lorito(triste ? 'llorando' : 'hola', 'm')}</div>
      <div class="bubble" id="miss">${missMessage(triste)}</div>
    </div>
    <div class="path" id="path"></div>
    ${navBar('home')}`);
  requestAnimationFrame(() => requestAnimationFrame(() => { const b = $('barfill'); if (b) b.style.width = pct + '%'; }));
  buildPath();
  wireNav();
  const mascot = $('mascot');
  let sad = triste;
  mascot.onclick = () => {
    mascot.classList.add('hablando');
    setTimeout(() => mascot.classList.remove('hablando'), 1600);
    sfx.chirp();
    if (sad) {
      sad = false; consolado = true;
      setPose(mascot, 'feliz');
      $('miss').textContent = missMessage(false);
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
  // la siguiente lección es la primera que aún no se ha hecho; si ya hizo todas, la que menos veces ha hecho
  const open = items.filter(it => !it.locked);
  const least = open.find(it => !(state.done[it.id])) ||
    open.reduce((m, it) => (state.done[it.id] || 0) < (state.done[m.id] || 0) ? it : m, open[0]);
  box.innerHTML = `<div class="pin" style="width:${w}px;height:${H}px">
    <svg width="${w}" height="${H}"><path class="trail" d="${d}"/></svg>
    ${items.map((it, i) => {
      const n = state.done[it.id] || 0, st = starsFor(n), p = pts[i];
      const cls = it.locked ? 'lock' : (n > 0 ? 'hecho' : '') + (it === least ? ' next' : '');
      const label = it.locked
        ? `${it.title}<small>Pronto</small>`
        : `${it.title}<div class="st">${'⭐'.repeat(st)}${'☆'.repeat(3 - st)}</div>`;
      return `<button class="node ${cls}" data-i="${i}" style="left:${p.x - 48}px;top:${p.y - 48}px;--d:${i * 60}ms">${it.locked ? '🔒' : it.ico}</button>
        <div class="nl" style="left:${p.x - 75}px;top:${p.y + 54}px;--d:${i * 60 + 80}ms">${label}</div>`;
    }).join('')}
  </div>`;
  box.querySelectorAll('.node').forEach(b => b.onclick = () => {
    const it = items[+b.dataset.i];
    if (it.locked) {
      b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 450);
      sfx.bad(); say('¡Muy pronto!');
    } else { sfx.tap(); startLesson(it); }
  });
  // lleva el camino hasta la lección que sigue
  const nx = box.querySelector('.next');
  if (nx) box.scrollTop = Math.max(0, nx.offsetTop - box.clientHeight / 2 + 48);
}

function optHTML(kind, o, k) {
  const base = `data-c="${esc(o.id)}" style="background:${o.bg};--d:${k * 70}ms"`;
  if (kind === 'letter') return `<button class="opt sq" ${base}><b>${o.top}</b><i>${o.low}</i></button>`;
  if (kind === 'emoji') return `<button class="opt sq emo" ${base}>${o.e}</button>`;
  return `<button class="opt" ${base}></button>`;
}

function startLesson(lesson) {
  if (lesson.voz) return voiceLesson(lesson);
  const qs = lesson.make();
  let i = 0, locked = false, wrong = 0, alive = true;   // alive=false cuando el niño sale con ✖
  function show() {
    const q = qs[i];
    locked = false; wrong = 0;
    render(`
      <div class="top">
        <button class="x" id="salir">✖</button>
        <div class="prog"><i style="width:${i / qs.length * 100}%"></i></div>
      </div>
      <div class="q">
        <div class="row">${lorito('hola', 'l')}<button class="say" id="oir">🔊</button></div>
        ${q.big || ''}
        <div class="reveal" id="rv"></div>
        <div class="opts">${q.options.map((o, k) => optHTML(q.kind, o, k)).join('')}</div>
      </div>`);
    $('salir').onclick = () => { alive = false; try { speechSynthesis.cancel(); } catch (e) {} home(); };
    $('oir').onclick = () => { sfx.tap(); say(q.speak); };
    setTimeout(() => { if (alive) say(q.speak); }, 150);
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      if (b.dataset.c === q.answer) {
        locked = true; b.classList.add('ok'); sfx.ok();
        setPose($('app'), 'feliz');
        if (q.reveal) $('rv').innerHTML = q.reveal;
        document.querySelectorAll('.opt').forEach(x => { if (x !== b) x.classList.add('dim'); });
        let moved = false;
        const t0 = Date.now();
        const go = () => { if (moved || !alive) return; moved = true; i++; i < qs.length ? show() : finish(lesson.id); };
        say(q.right, () => setTimeout(go, Math.max(500, 1500 - (Date.now() - t0))));
        setTimeout(go, 5000);
      } else {
        wrong++;
        b.classList.add('bad'); sfx.bad(); say('¡Inténtalo otra vez!');
        setTimeout(() => b.classList.remove('bad'), 450);
        if (wrong >= 2) {   // pista amable: la respuesta correcta late
          const right = [...document.querySelectorAll('.opt')].find(x => x.dataset.c === q.answer);
          if (right) right.classList.add('pulse');
        }
      }
    });
  }
  show();
}

/* Lección con micrófono: Lorito dice la palabra y el niño la repite (como un loro) */
function voiceLesson(lesson) {
  const items = lesson.voz();
  let i = 0, attempts = 0, busy = false, rec = null, alive = true;   // alive=false cuando el niño sale con ✖
  const stop = () => { try { rec && rec.abort(); } catch (e) {} };

  function next() { if (!alive) return; i++; i < items.length ? show() : finish(lesson.id); }

  function show() {
    const it = items[i];
    attempts = 0; busy = false;
    render(`
      <div class="top">
        <button class="x" id="salir">✖</button>
        <div class="prog"><i style="width:${i / items.length * 100}%"></i></div>
      </div>
      <div class="q">
        <div class="row">${lorito('hola', 'l')}<button class="say" id="oir">🔊</button></div>
        <div id="vis">${it.visual}</div>
        <div class="hint" id="hint">Toca el micrófono y repite: <b>${esc(it.label)}</b></div>
        <button class="mic" id="mic">🎤</button>
        <button class="skip" id="skip" hidden>Siguiente ➜</button>
      </div>`);
    const setHint = (main, small) => { $('hint').innerHTML = main + (small ? `<small>${esc(small)}</small>` : ''); };
    const showSkip = () => { $('skip').hidden = false; };
    const setMic = on => $('mic').classList.toggle('on', on);

    $('salir').onclick = () => { alive = false; stop(); try { speechSynthesis.cancel(); } catch (e) {} home(); };
    $('oir').onclick = () => { sfx.tap(); say(it.intro); };
    $('skip').onclick = () => { sfx.tap(); stop(); next(); };
    setTimeout(() => { if (alive) say(it.intro); }, 150);

    function good() {
      sfx.ok();
      setPose($('app'), 'feliz');
      $('vis').classList.add('ok');
      setHint(`¡Muy bien! Dijiste <b>${esc(it.label)}</b> 🎉`);
      say(it.good);
      setTimeout(next, 2000);
    }
    function miss() {
      attempts++;
      if (attempts >= 2) {
        setHint(`¡No pasa nada! Lo hacemos juntos: <b>${esc(it.label)}</b>`);
        say(`¡No pasa nada! Lo hacemos juntos: ${it.label}`);
        showSkip();
      } else {
        setHint(`¡Casi! Escucha otra vez: <b>${esc(it.label)}</b>`);
        say(`¡Casi! Escucha otra vez: ${it.label}. ¡Inténtalo!`);
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
      busy = true; sfx.tap();
      try { speechSynthesis.cancel(); } catch (e) {}   // para que el micrófono no escuche a Lorito
      setMic(true);
      setHint('Te escucho… 👂');
      rec = listen(
        alts => { busy = false; setMic(false); matchWords(alts, it.accept) ? good() : miss(); },
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
  confetti(); sfx.win();
  let pose = 'feliz', extra = '';
  if (r.first) {
    extra = `<div class="sticker">${r.sticker}</div><div>¡Nueva pegatina!</div>`;
    if (r.reward) {
      pose = 'sorprendido';
      extra += `<div class="rw">${ART[r.reward.key]}</div><div>¡Lorito ganó ${r.reward.name}!</div>`;
      setTimeout(sfx.star, 700);
    }
    say(r.reward ? `¡Muy bien! Lorito ganó ${r.reward.name}` : '¡Muy bien! Ganaste una pegatina');
  } else {
    say('¡Muy bien!');
  }
  render(`<div class="center">
    <h1>¡Terminaste! 🎉</h1>
    ${lorito(pose, 'f')}
    ${extra}
    <button class="big" id="seguir" style="justify-content:center">Seguir ➜</button></div>`);
  $('seguir').onclick = () => { sfx.tap(); home(); };
}

function albumScreen() {
  const slots = STICKERS.map((_, idx) => {
    const s = state.stickers[idx];
    return s ? `<div class="slot" style="--d:${idx * 30}ms">${s}</div>` : '<div class="slot vacio">?</div>';
  }).join('');
  render(`
    <div class="top"><h2 style="margin:4px 0">📒 Mis pegatinas</h2></div>
    <div class="album">${slots}</div>
    ${navBar('album')}`);
  wireNav();
}

function voiceScreen() {
  loadVoices();
  const cur = pickVoice();
  const rate = state.voice.rate || 0.95, pitch = state.voice.pitch || 1, rapida = state.voice.mode === 'rapida';
  render(`
    <div class="top"><h2 style="margin:4px 0">🔊 Voz de Lorito</h2></div>
    <div class="vbox">
      <div class="tip">Prueba los dos modos: la voz <b>natural</b> suena mejor pero tarda un poco en responder; la <b>rápida</b> responde al instante. También puedes elegir otra voz de la lista. Para voces mejores: Ajustes de Android → Texto a voz → Google → Instalar datos de voz → Español (México).</div>
      <div class="sl"><label>Velocidad <span id="rv">${rate}</span></label><input type="range" id="rate" min="0.7" max="1.1" step="0.05" value="${rate}"></div>
      <div class="sl"><label>Tono <span id="pv">${pitch}</span></label><input type="range" id="pitch" min="0.9" max="1.5" step="0.05" value="${pitch}"></div>
      <button class="big nav2" id="modo" style="justify-content:center;margin-bottom:12px">${rapida ? '⚡ Voz: rápida (sin esperar)' : '🌿 Voz: natural (necesita internet)'}</button>
      <button class="big alt" id="probar" style="justify-content:center">🔊 Probar voz</button>
      <button class="big nav2" id="snd" style="justify-content:center;margin-top:12px"></button>
      <div class="vlist">
        ${VOICES.length ? VOICES.map((v, i) => `<button class="vopt ${cur && v.voiceURI === cur.voiceURI ? 'on' : ''}" data-i="${i}">${esc(v.name)}<small>${esc(v.lang)}${v.localService ? '' : ' · en línea'}</small></button>`).join('')
          : '<div class="tip">No encontré voces en español en este celular.</div>'}
      </div>
    </div>
    ${navBar('voz')}`);
  wireNav();
  const test = () => say('¡Hola! Soy Lorito. ¿Jugamos a aprender los colores?');
  const paintSnd = () => { $('snd').textContent = state.mute ? '🔕 Sonidos: apagados' : '🔔 Sonidos: encendidos'; };
  paintSnd();
  $('snd').onclick = () => { state.mute = !state.mute; save(); paintSnd(); sfx.chirp(); };
  $('modo').onclick = () => { state.voice.mode = rapida ? 'natural' : 'rapida'; delete state.voice.uri; save(); voiceScreen(); setTimeout(test, 100); };
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
