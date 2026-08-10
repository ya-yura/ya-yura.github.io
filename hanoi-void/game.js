/* HANOI//VOID — dependency-free holographic 3D canvas runtime. */

const TAU = Math.PI * 2;
const SAVE_KEY = 'hanoi-void-save-v1';

function hslToHex(hue, saturation, lightness) {
  const hueToRgb = (p, q, t) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };
  const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const red = Math.round(hueToRgb(p, q, hue + 1 / 3) * 255);
  const green = Math.round(hueToRgb(p, q, hue) * 255);
  const blue = Math.round(hueToRgb(p, q, hue - 1 / 3) * 255);
  return (red << 16) | (green << 8) | blue;
}

// Disk 01 starts at red; the largest disk ends at violet. This makes the stack order legible at a glance.
const COLORS = Array.from({ length: 18 }, (_, index) => hslToHex(index / 17 * 0.83, 0.72, 0.6));
const DIFFICULTIES = [
  { label: 'INITIATE', title: 'Сигнал из пустоты', sector: 'THE SHARD' },
  { label: 'VECTOR', title: 'Петля на изломе', sector: 'THE FRACTURE' },
  { label: 'PARADOX', title: 'Гравитация лжёт', sector: 'THE ORBIT' },
  { label: 'CHAOS', title: 'Нулевая геометрия', sector: 'THE NULL' },
  { label: 'INSANE', title: 'Реальность перегрета', sector: 'THE MAW' },
  { label: 'UNHINGED', title: 'Бог дисков проснулся', sector: 'THE ABYSS' }
];
const ANOMALIES = [
  { id: 'stable', icon: '◈', title: 'STABLE CORE', copy: 'Базовая физика. Никаких оправданий.' },
  { id: 'rift', icon: '⌁', title: 'RIFT GATE', copy: 'Рифтовый стержень принимает диск любого размера.' },
  { id: 'echo', icon: '◎', title: 'ECHO LOOP', copy: 'Каждый шестой ход оставляет в пространстве призрачный след.' },
  { id: 'void', icon: '✦', title: 'VOID SURGE', copy: 'Бездна ускоряет таймер. Ошибка стоит дороже.' }
];

const $ = (id) => document.getElementById(id);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const pad = (value, size = 2) => String(Math.max(0, Math.floor(value))).padStart(size, '0');
const formatTime = (seconds) => `${pad(seconds / 60)}:${pad(seconds % 60)}`;
const cloneState = (state) => state.map((peg) => [...peg]);

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomSeed() {
  return ((Date.now() >>> 0) ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
}

function mulberry32(seed) {
  return () => {
    let value = seed += 0x6d2b79f5;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function applyMove(state, move) {
  const disk = state[move.from].pop();
  state[move.to].push(disk);
  return disk;
}

function encodeState(state) {
  return state.map((peg) => peg.join(',')).join('|');
}

function isGoal(state, goalPeg, diskCount) {
  return state[goalPeg].length === diskCount && state.every((peg, index) => index === goalPeg || peg.length === 0);
}

function isMoveLegal(state, from, to, level, allowQuantum = false) {
  if (from === to || !state[from]?.length) return false;
  if (allowQuantum || level?.riftPeg === to) return true;
  const disk = state[from].at(-1);
  const target = state[to].at(-1);
  return target === undefined || target > disk;
}

function getLegalMoves(state, level, allowQuantum = false) {
  const moves = [];
  for (let from = 0; from < state.length; from += 1) {
    if (!state[from].length) continue;
    for (let to = 0; to < state.length; to += 1) {
      if (isMoveLegal(state, from, to, level, allowQuantum)) moves.push({ from, to });
    }
  }
  return moves;
}

function createLevel(number, requestedSeed) {
  const seed = requestedSeed ?? randomSeed();
  const random = mulberry32(seed);
  const tierIndex = Math.min(DIFFICULTIES.length - 1, Math.floor((number - 1) / 4));
  const difficulty = DIFFICULTIES[tierIndex];
  const diskCount = Math.min(18, 5 + Math.floor((number - 1) * 0.62) + (random() > 0.57 ? 1 : 0));
  const pegCount = number < 4 ? 3 : number < 10 ? (random() > 0.72 ? 4 : 3) : number < 20 ? 4 + (random() > 0.68 ? 1 : 0) : 5 + (random() > 0.7 ? 1 : 0);
  const goalPeg = Math.floor(random() * pegCount);
  const anomaly = number < 4 ? ANOMALIES[0] : ANOMALIES[(number * 11 + Math.floor(random() * 9)) % ANOMALIES.length];
  const riftPeg = anomaly.id === 'rift' ? (goalPeg + 1 + Math.floor(random() * (pegCount - 1))) % pegCount : -1;
  const startState = Array.from({ length: pegCount }, () => []);
  startState[goalPeg] = Array.from({ length: diskCount }, (_, index) => diskCount - index);
  const scrambleMoves = Math.round(7 + diskCount * (2.1 + tierIndex * 0.76) + random() * diskCount * 2.4);
  const scramble = [];
  let previousMove = null;

  for (let index = 0; index < scrambleMoves; index += 1) {
    const moves = getLegalMoves(startState, { riftPeg: -1 }).filter((move) => !previousMove || !(move.from === previousMove.to && move.to === previousMove.from));
    const move = moves[Math.floor(random() * moves.length)] ?? getLegalMoves(startState, { riftPeg: -1 })[0];
    if (!move) break;
    const disk = applyMove(startState, move);
    scramble.push({ ...move, disk });
    previousMove = move;
  }

  return { number, seed, seedLabel: seed.toString(16).toUpperCase().slice(-4).padStart(4, '0'), difficulty, tierIndex, diskCount, pegCount, goalPeg, anomaly, riftPeg, timeScale: anomaly.id === 'void' ? 1.28 : 1, scrambleMoves, startState: cloneState(startState), scramble };
}

function findHint(state, level) {
  const simpleMoves = getLegalMoves(state, level);
  if (!simpleMoves.length) return null;
  if (level.diskCount > 9 || level.pegCount > 4) {
    return simpleMoves.map((move) => {
      const disk = state[move.from].at(-1);
      const targetTop = state[move.to].at(-1);
      let score = disk / level.diskCount + Math.random() * 0.25;
      if (move.to === level.goalPeg) score += 9;
      if (move.from === level.goalPeg) score -= 8;
      if (targetTop === undefined) score += 1;
      if (level.riftPeg === move.to) score += 1.5;
      return { move, score };
    }).sort((a, b) => b.score - a.score)[0].move;
  }

  const startKey = encodeState(state);
  const queue = [{ state: cloneState(state), key: startKey }];
  const parent = new Map([[startKey, null]]);
  const action = new Map();
  let cursor = 0;
  let goalKey = null;
  while (cursor < queue.length && cursor < 11000) {
    const current = queue[cursor++];
    if (isGoal(current.state, level.goalPeg, level.diskCount)) { goalKey = current.key; break; }
    for (const move of getLegalMoves(current.state, level)) {
      const nextState = cloneState(current.state);
      applyMove(nextState, move);
      const nextKey = encodeState(nextState);
      if (parent.has(nextKey)) continue;
      parent.set(nextKey, current.key);
      action.set(nextKey, move);
      queue.push({ state: nextState, key: nextKey });
    }
  }
  if (!goalKey) return simpleMoves[0];
  const path = [];
  let cursorKey = goalKey;
  while (parent.get(cursorKey) !== null) { path.unshift(action.get(cursorKey)); cursorKey = parent.get(cursorKey); }
  return path[0] ?? simpleMoves[0];
}

function safeRead() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch { return null; }
}

function safeWrite(value) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(value)); } catch { /* private mode */ }
}

function cssColor(hex, alpha = 1) {
  const red = (hex >> 16) & 255;
  const green = (hex >> 8) & 255;
  const blue = hex & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

class VoidCanvasRenderer {
  constructor(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = 1;
    this.height = 1;
    this.level = null;
    this.state = null;
    this.pegX = [];
    this.currentPositions = new Map();
    this.targetPositions = new Map();
    this.tweens = [];
    this.effects = [];
    this.elapsed = 0;
    this.fpsTimer = 0;
    this.fpsFrames = 0;
    this.selectedPeg = -1;
    this.hint = null;
    this.drag = null;
    this.camera = { yaw: 0.25, tilt: 0.16 };
    this.stars = Array.from({ length: 100 }, () => ({ x: Math.random(), y: Math.random() * 0.72, r: Math.random() * 1.6 + 0.25, a: Math.random() * 0.65 + 0.2, p: Math.random() * TAU }));
    this.onResize = this.onResize.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    window.addEventListener('resize', this.onResize);
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointerleave', () => this.callbacks.onPegHover?.(-1));
    this.onResize();
    this.animate();
  }

  setLevel(level, state) {
    this.level = level;
    this.state = state;
    this.tweens = [];
    this.effects = [];
    this.pegX = Array.from({ length: level.pegCount }, (_, index) => (index - (level.pegCount - 1) / 2) * (level.pegCount > 5 ? 2.05 : 2.35));
    this.currentPositions.clear();
    this.targetPositions.clear();
    state.forEach((peg, pegIndex) => peg.forEach((disk, stackIndex) => {
      const position = this.diskPosition(pegIndex, stackIndex);
      this.currentPositions.set(disk, { ...position });
      this.targetPositions.set(disk, { ...position });
    }));
  }

  diskPosition(pegIndex, stackIndex) {
    return { x: this.pegX[pegIndex], y: 0.35 + stackIndex * 0.255, z: 0 };
  }

  syncState(state, options = {}) {
    this.state = state;
    const targets = new Map();
    state.forEach((peg, pegIndex) => peg.forEach((disk, stackIndex) => targets.set(disk, this.diskPosition(pegIndex, stackIndex))));
    targets.forEach((target, disk) => {
      const previous = this.currentPositions.get(disk) ?? target;
      this.targetPositions.set(disk, target);
      if (options.animate === false) this.currentPositions.set(disk, { ...target });
      else this.tweens.push({ disk, from: { ...previous }, to: { ...target }, started: performance.now(), duration: options.duration ?? 420, movedDisk: options.movedDisk });
    });
  }

  setSelectedPeg(index) { this.selectedPeg = index; }

  showHint(move) { this.hint = { ...move, until: performance.now() + 3600 }; }

  project(x, y, z) {
    const unit = Math.min(this.width / Math.max(11, this.level?.pegCount * 2.3 + 3), this.height / 8.1);
    return { x: this.width / 2 + x * unit, y: this.height * 0.74 - y * unit, scale: unit, depth: 0 };
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  onPointerDown(event) {
    this.drag = { x: event.clientX, y: event.clientY, moved: false };
    this.canvas.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event) {
    if (this.drag) {
      const dx = event.clientX - this.drag.x;
      const dy = event.clientY - this.drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) this.drag.moved = true;
      if (this.drag.moved) {
        this.camera.yaw += dx * 0.006;
        this.camera.tilt = clamp(this.camera.tilt + dy * 0.0017, -0.04, 0.32);
        this.drag.x = event.clientX;
        this.drag.y = event.clientY;
      }
    }
    if (!this.drag?.moved) this.callbacks.onPegHover?.(this.pickPeg(event));
  }

  onPointerUp(event) {
    if (this.drag && !this.drag.moved) this.callbacks.onPegClick?.(this.pickPeg(event));
    this.drag = null;
  }

  pickPeg(event) {
    if (!this.level) return -1;
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let closest = -1;
    let distance = Infinity;
    this.pegX.forEach((worldX, index) => {
      const screen = this.project(worldX, 1.7, 0);
      const current = Math.abs(screen.x - x);
      if (current < distance) { distance = current; closest = index; }
    });
    return distance < Math.max(56, this.width / 12) ? closest : -1;
  }

  spawnBurst(position, color = 0x70e4ed, size = 18) {
    const particles = [];
    for (let index = 0; index < size; index += 1) {
      const angle = Math.random() * TAU;
      particles.push({ x: position.x, y: position.y, z: position.z ?? 0, vx: Math.cos(angle) * (0.3 + Math.random() * 0.8), vy: 0.7 + Math.random() * 1.4, vz: Math.sin(angle) * (0.3 + Math.random() * 0.8) });
    }
    this.effects.push({ particles, color, age: 0, life: 0.82 });
  }

  drawPolygon(points, fill, stroke = null, lineWidth = 1) {
    const ctx = this.ctx;
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  }

  drawLine(from, to, stroke, lineWidth = 1, glow = 0) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    if (glow) { ctx.shadowColor = stroke; ctx.shadowBlur = glow; }
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
    ctx.restore();
  }

  drawBackground() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#fff9e9'); gradient.addColorStop(0.58, '#f8f0d7'); gradient.addColorStop(1, '#f1e5c3');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, this.width, this.height);
    const blueBlob = ctx.createRadialGradient(this.width * 0.16, this.height * 0.12, 0, this.width * 0.16, this.height * 0.12, this.width * 0.48);
    blueBlob.addColorStop(0, 'rgba(112, 205, 224, .28)'); blueBlob.addColorStop(1, 'rgba(112, 205, 224, 0)');
    ctx.fillStyle = blueBlob; ctx.fillRect(0, 0, this.width, this.height);
    const pinkBlob = ctx.createRadialGradient(this.width * 0.86, this.height * 0.25, 0, this.width * 0.86, this.height * 0.25, this.width * 0.36);
    pinkBlob.addColorStop(0, 'rgba(255, 155, 112, .2)'); pinkBlob.addColorStop(1, 'rgba(255, 155, 112, 0)');
    ctx.fillStyle = pinkBlob; ctx.fillRect(0, 0, this.width, this.height);
    this.stars.forEach((star) => {
      const pulse = 0.68 + Math.sin(this.elapsed * 1.4 + star.p) * 0.32;
      ctx.fillStyle = `rgba(86, 101, 132, ${star.a * pulse * .32})`;
      ctx.beginPath(); ctx.arc(star.x * this.width, star.y * this.height, star.r, 0, TAU); ctx.fill();
    });
    ctx.save();
    ctx.strokeStyle = 'rgba(39, 48, 76, .1)'; ctx.lineWidth = 2;
    for (let index = 0; index < 5; index += 1) {
      ctx.beginPath();
      ctx.arc(this.width * (.12 + index * .22), this.height * 1.02, this.width * (.16 + index * .012), Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(39, 48, 76, .3)'; ctx.font = '700 10px monospace'; ctx.fillText('PLAYFIELD / 04', 18, this.height - 18);
    ctx.fillStyle = 'rgba(39, 48, 76, .18)'; ctx.font = '9px monospace'; ctx.fillText('KEEP IT LIGHT', this.width - 95, 24);
    ctx.setLineDash([2, 8]); ctx.strokeStyle = 'rgba(39, 48, 76, .12)'; ctx.lineWidth = 1;
    for (let index = 0; index < 4; index += 1) {
      ctx.beginPath(); ctx.moveTo(18, this.height * (.18 + index * .14)); ctx.lineTo(this.width - 18, this.height * (.18 + index * .14)); ctx.stroke();
    }
    ctx.restore();
  }

  drawPlatform() {
    const width = Math.max(8.6, (this.level.pegCount - 1) * 2.35 + 2.8);
    const left = this.project(-width / 2, 0, 0);
    const right = this.project(width / 2, 0, 0);
    const unit = left.scale;
    const x = left.x;
    const y = left.y - unit * .1;
    const w = right.x - left.x;
    const h = unit * .42;
    const ctx = this.ctx;
    ctx.save();
    ctx.shadowColor = 'rgba(39, 48, 76, .28)'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#e3d2a8'; ctx.strokeStyle = '#27304c'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(18, h * .3)); ctx.fill(); ctx.stroke();
    ctx.shadowColor = 'transparent'; ctx.fillStyle = 'rgba(255, 255, 255, .28)';
    ctx.beginPath(); ctx.roundRect(x + 9, y + 7, w - 18, Math.max(3, h * .13), 4); ctx.fill();
    ctx.restore();
  }

  drawPeg(index) {
    const x = this.pegX[index];
    const isGoal = index === this.level.goalPeg;
    const isRift = index === this.level.riftPeg;
    const color = isGoal ? 0x55c878 : isRift ? 0x9b73ff : 0x55627d;
    const base = this.project(x, 0.13, 0);
    const unit = base.scale;
    const baseRadius = unit * .7;
    const ctx = this.ctx;
    ctx.save();
    ctx.shadowColor = 'rgba(39, 48, 76, .3)'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 7;
    ctx.fillStyle = isGoal ? '#67d388' : isRift ? '#ab8aff' : '#d0c39c'; ctx.strokeStyle = '#27304c'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(base.x - baseRadius, base.y - unit * .1, baseRadius * 2, unit * .22, unit * .11); ctx.fill(); ctx.stroke();
    ctx.restore();
    const bottom = this.project(x, 0.18, 0);
    const top = this.project(x, 5.5, 0);
    const rodWidth = Math.max(7, unit * .13);
    ctx.save();
    ctx.fillStyle = isGoal ? '#55c878' : isRift ? '#9b73ff' : '#55627d'; ctx.strokeStyle = '#27304c'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(bottom.x - rodWidth / 2, top.y, rodWidth, bottom.y - top.y, rodWidth / 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, .42)'; ctx.beginPath(); ctx.roundRect(bottom.x - rodWidth * .19, top.y + 8, Math.max(2, rodWidth * .18), bottom.y - top.y - 17, rodWidth * .1); ctx.fill();
    ctx.restore();
    const topRadius = unit * (isGoal || isRift ? .54 : .42);
    ctx.save();
    ctx.fillStyle = isGoal ? '#6fe090' : isRift ? '#b497ff' : '#71809e'; ctx.strokeStyle = '#27304c'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(top.x, top.y, topRadius * .44, 0, TAU); ctx.fill(); ctx.stroke();
    if (isGoal || isRift) {
      ctx.strokeStyle = isGoal ? '#55c878' : '#9b73ff'; ctx.lineWidth = 3; ctx.setLineDash([5, 6]);
      ctx.beginPath(); ctx.arc(top.x, top.y, topRadius * 1.08 + Math.sin(this.elapsed * 3) * 2, 0, TAU); ctx.stroke();
    }
    ctx.restore();
    const label = this.project(x, -0.02, 0);
    ctx.save(); ctx.fillStyle = '#27304c'; ctx.font = '700 9px monospace'; ctx.textAlign = 'center'; ctx.fillText(`${pad(index + 1, 2)}${isGoal ? ' / CORE' : ''}`, label.x, label.y + unit * .62); ctx.restore();
  }

  drawDisk(disk, position) {
    const ctx = this.ctx;
    const projected = this.project(position.x, position.y, position.z);
    const width = 0.26 + disk * 0.042;
    const radius = projected.scale * width;
    const height = Math.max(10, projected.scale * 0.28);
    const color = COLORS[(disk - 1) % COLORS.length];
    const selected = this.selectedPeg >= 0 && this.state?.[this.selectedPeg]?.at(-1) === disk;
    ctx.save();
    if (selected) { ctx.shadowColor = cssColor(color); ctx.shadowBlur = 20; }
    ctx.fillStyle = cssColor(color, .97); ctx.strokeStyle = '#27304c'; ctx.lineWidth = selected ? 4 : 3;
    ctx.beginPath(); ctx.roundRect(projected.x - radius, projected.y - height * .5, radius * 2, height, Math.min(12, height * .35)); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, .48)'; ctx.beginPath(); ctx.ellipse(projected.x - radius * .42, projected.y - height * .18, Math.max(3, radius * .22), Math.max(2, height * .12), -.25, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(39, 48, 76, .18)'; ctx.beginPath(); ctx.roundRect(projected.x - radius * .72, projected.y + height * .15, radius * 1.44, Math.max(2, height * .12), 4); ctx.fill();
    ctx.restore();
  }

  drawHint() {
    if (!this.hint || this.hint.until < performance.now()) return;
    const from = this.project(this.pegX[this.hint.from], 5.9, 0);
    const to = this.project(this.pegX[this.hint.to], 5.9, 0);
    const ctx = this.ctx;
    ctx.save(); ctx.strokeStyle = '#55c878'; ctx.fillStyle = '#55c878'; ctx.lineWidth = 4; ctx.setLineDash([7, 8]);
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.quadraticCurveTo((from.x + to.x) / 2, Math.min(from.y, to.y) - 58, to.x, to.y); ctx.stroke(); ctx.setLineDash([]);
    const angle = Math.atan2(to.y - from.y, to.x - from.x); ctx.beginPath(); ctx.arc(to.x, to.y, 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff9e9'; ctx.beginPath(); ctx.arc(to.x - Math.cos(angle) * 3, to.y - Math.sin(angle) * 3, 3, 0, TAU); ctx.fill(); ctx.restore();
  }

  drawEffects(delta) {
    this.effects = this.effects.filter((effect) => {
      effect.age += delta;
      const alpha = clamp(1 - effect.age / effect.life, 0, 1);
      effect.particles.forEach((particle) => { particle.x += particle.vx * delta; particle.y += particle.vy * delta; particle.z += particle.vz * delta; particle.vy -= 1.5 * delta; const point = this.project(particle.x, particle.y, particle.z); this.ctx.fillStyle = cssColor(effect.color, alpha); this.ctx.beginPath(); this.ctx.arc(point.x, point.y, Math.max(2, point.scale * .07), 0, TAU); this.ctx.fill(); });
      return effect.age < effect.life;
    });
  }

  draw(delta) {
    this.drawBackground();
    if (!this.level) return;
    this.drawGrid();
    this.drawPlatform();
    for (let index = 0; index < this.level.pegCount; index += 1) this.drawPeg(index);
    [...this.currentPositions.entries()].sort((a, b) => a[1].y - b[1].y).forEach(([disk, position]) => this.drawDisk(disk, position));
    this.drawHint();
    this.drawEffects(delta);
    const vignette = this.ctx.createRadialGradient(this.width / 2, this.height * .45, this.width * .18, this.width / 2, this.height * .5, this.width * .73);
    vignette.addColorStop(0, 'rgba(0,0,0,0)'); vignette.addColorStop(1, 'rgba(2,3,9,.58)'); this.ctx.fillStyle = vignette; this.ctx.fillRect(0, 0, this.width, this.height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = Math.min(0.05, 1 / 60);
    const now = performance.now();
    this.elapsed += delta;
    this.fpsTimer += delta; this.fpsFrames += 1;
    if (this.fpsTimer > 1) { this.callbacks.onFps?.(Math.round(this.fpsFrames / this.fpsTimer)); this.fpsTimer = 0; this.fpsFrames = 0; }
    this.tweens = this.tweens.filter((tween) => {
      const progress = clamp((now - tween.started) / tween.duration, 0, 1);
      const eased = 1 - (1 - progress) ** 3;
      const position = { x: tween.from.x + (tween.to.x - tween.from.x) * eased, y: tween.from.y + (tween.to.y - tween.from.y) * eased, z: tween.from.z + (tween.to.z - tween.from.z) * eased };
      if (tween.disk === tween.movedDisk) position.y += Math.sin(progress * Math.PI) * .78;
      this.currentPositions.set(tween.disk, position);
      if (progress >= 1) this.currentPositions.set(tween.disk, { ...tween.to });
      return progress < 1;
    });
    this.draw(delta);
  }
}

class HanoiVoidGame {
  constructor() {
    this.refs = { scene: $('scene'), levelNumber: $('level-number'), difficulty: $('difficulty-chip'), levelTitle: $('level-title'), sector: $('sector-name'), diskCount: $('disk-count'), pegCount: $('peg-count'), seed: $('seed-value'), progress: $('progress-bar'), anomalyIcon: $('anomaly-icon'), anomalyTitle: $('anomaly-title'), anomalyCopy: $('anomaly-copy'), mission: $('mission-copy'), hover: $('hover-copy'), selection: $('selection-readout'), selectionCopy: $('selection-copy'), goal: $('goal-copy'), combo: $('combo-copy'), score: $('score-copy'), objectiveCopy: $('objective-copy'), objectiveProgress: $('objective-progress'), objectiveLeft: $('objective-left'), moveCopy: $('move-copy'), time: $('time-copy'), moves: $('moves-copy'), best: $('best-copy'), streak: $('streak-copy'), history: $('move-history'), historyCount: $('history-count'), status: $('status-copy'), fps: $('fps-copy'), pause: $('pause-overlay'), toast: $('toast'), modal: $('complete-modal'), completeScore: $('complete-score'), completeMoves: $('complete-moves'), completeTime: $('complete-time'), completeCopy: $('complete-copy') };
    this.powerups = { rewind: 3, scan: 2, quantum: 1, stasis: 1 };
    this.soundEnabled = true;
    this.audioContext = null;
    this.toastTimer = null;
    this.lastFrame = performance.now();
    this.uiTimer = 0;
    this.level = null;
    this.state = null;
    this.selectedPeg = -1;
    this.moveLocked = false;
    this.paused = false;
    this.completed = false;
    this.elapsed = 0;
    this.moves = 0;
    this.combo = 0;
    this.score = 0;
    this.freezeRemaining = 0;
    this.history = [];
    this.moveLog = [];
    this.bestScores = {};
    this.renderer = new VoidCanvasRenderer(this.refs.scene, { onPegClick: (index) => this.handlePeg(index), onPegHover: (index) => this.handleHover(index), onFps: (fps) => { this.refs.fps.textContent = `${fps} FPS`; } });
    this.restoreOrStart();
    this.bindEvents();
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  restoreOrStart() {
    const saved = safeRead();
    this.bestScores = saved?.bestScores ?? {};
    this.powerups = { ...this.powerups, ...(saved?.powerups ?? {}) };
    if (saved?.levelNumber && saved.state && saved.seed) this.loadLevel(saved.levelNumber, saved);
    else this.loadLevel(1);
  }

  bindEvents() {
    $('btn-new').addEventListener('click', () => { this.playTone(330, .08); this.loadLevel(this.level.number + 1); });
    $('btn-reset').addEventListener('click', () => { this.playTone(170, .08); this.loadLevel(this.level.number, null, { forceNewSeed: true }); this.toast('РАСКЛАД ПЕРЕСОБРАН'); });
    $('btn-pause').addEventListener('click', () => this.togglePause());
    $('btn-sound').addEventListener('click', () => this.toggleSound());
    $('btn-next').addEventListener('click', () => { this.hideModal(); this.loadLevel(this.level.number + 1); });
    $('btn-replay').addEventListener('click', () => { this.hideModal(); this.loadLevel(this.level.number, { seed: this.level.seed }); });
    document.querySelectorAll('[data-boost]').forEach((button) => button.addEventListener('click', () => this.usePowerup(button.dataset.boost)));
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') { event.preventDefault(); this.togglePause(); return; }
      if (event.key.toLowerCase() === 'r') { this.loadLevel(this.level.number, null, { forceNewSeed: true }); return; }
      if (event.key.toLowerCase() === 'z') { this.usePowerup('rewind'); return; }
      const index = Number(event.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < (this.level?.pegCount ?? 0)) this.handlePeg(index);
    });
  }

  loadLevel(number, checkpoint = null, options = {}) {
    const seed = options.forceNewSeed ? undefined : checkpoint?.seed;
    this.level = createLevel(number, seed);
    this.state = checkpoint?.state ? checkpoint.state.map((peg) => [...peg]) : cloneState(this.level.startState);
    this.elapsed = checkpoint?.elapsed ?? 0;
    this.moves = checkpoint?.moves ?? 0;
    this.combo = checkpoint?.combo ?? 0;
    this.score = checkpoint?.score ?? 0;
    this.history = checkpoint?.history ?? [];
    this.moveLog = checkpoint?.moveLog ?? [];
    this.selectedPeg = -1; this.moveLocked = false; this.paused = false; this.completed = false; this.freezeRemaining = 0;
    this.refs.modal.hidden = true; this.refs.pause.hidden = true;
    this.renderer.setLevel(this.level, this.state);
    this.renderUI();
    this.saveCheckpoint();
  }

  handleHover(index) {
    if (index < 0 || this.paused || this.moveLocked) { this.refs.hover.textContent = 'Кликни по стержню, чтобы выбрать диск'; return; }
    const top = this.state[index]?.at(-1);
    this.refs.hover.textContent = top ? `Стержень ${pad(index + 1, 2)} / диск ${pad(top, 2)}` : `Стержень ${pad(index + 1, 2)} / пусто`;
  }

  handlePeg(index) {
    if (index < 0 || this.paused || this.moveLocked || this.completed) return;
    this.playTone(190 + index * 40, .045);
    if (this.selectedPeg < 0) {
      if (!this.state[index].length) { this.toast('Пустой стержень. Выбери источник с диском.'); return; }
      this.selectedPeg = index; this.renderer.setSelectedPeg(index); this.refs.selection.classList.add('active'); this.refs.selectionCopy.textContent = `Источник ${pad(index + 1, 2)} выбран`; this.refs.status.textContent = 'Диск в квантовом захвате'; return;
    }
    if (this.selectedPeg === index) { this.clearSelection(); return; }
    const from = this.selectedPeg;
    if (!isMoveLegal(this.state, from, index, this.level)) {
      this.combo = 0; this.refs.status.textContent = 'Конфликт массы — ход невозможен'; this.toast('Слишком большой диск. Не насилуй геометрию.'); this.playTone(80, .12, 'sawtooth'); this.clearSelection(); this.renderUI(); return;
    }
    this.commitMove(from, index, false);
  }

  commitMove(from, to, quantum = false) {
    const disk = this.state[from].at(-1);
    const move = { from, to, disk, quantum };
    applyMove(this.state, move); this.history.push({ ...move }); this.moveLog.push({ ...move }); this.moves += 1; this.combo += 1; this.score = this.calculateScore(); this.clearSelection(); this.refs.status.textContent = quantum ? 'Квантовый импульс принят' : 'Ход принят — продолжай'; this.moveLocked = true;
    this.renderer.syncState(this.state, { animate: true, movedDisk: disk, duration: quantum ? 570 : 410 });
    this.renderer.spawnBurst(this.renderer.diskPosition(to, this.state[to].length - 1), quantum ? 0xff9b70 : COLORS[(disk - 1) % COLORS.length], quantum ? 28 : 11);
    this.playTone(260 + disk * 24, quantum ? .18 : .08, quantum ? 'triangle' : 'sine');
    if (this.level.anomaly.id === 'echo' && this.moves % 6 === 0) this.renderer.spawnBurst(this.renderer.diskPosition(to, this.state[to].length - 1), 0xa998ff, 18);
    this.renderUI(); this.saveCheckpoint();
    window.setTimeout(() => { this.moveLocked = false; if (isGoal(this.state, this.level.goalPeg, this.level.diskCount)) this.completeLevel(); }, quantum ? 620 : 465);
  }

  undoMove() {
    if (!this.history.length || this.moveLocked || this.completed) { this.toast('REWIND пуст — нечего отменять.'); return; }
    const move = this.history.pop(); applyMove(this.state, { from: move.to, to: move.from }); this.moveLog.pop(); this.moves = Math.max(0, this.moves - 1); this.combo = 0; this.score = this.calculateScore(); this.renderer.syncState(this.state, { animate: true, movedDisk: move.disk, duration: 350 }); this.refs.status.textContent = 'Последний импульс стёрт'; this.playTone(155, .13, 'triangle'); this.renderUI(); this.saveCheckpoint();
  }

  usePowerup(type) {
    if (this.paused || this.completed) return;
    if (!this.powerups[type]) { this.toast('Инструмент разряжен. Ищи следующий сектор.'); return; }
    if (type === 'rewind') { if (!this.history.length || this.moveLocked) { this.toast('REWIND пуст — нечего отменять.'); return; } this.powerups.rewind -= 1; this.undoMove(); return; }
    if (type === 'scan') { const hint = findHint(this.state, this.level); if (!hint) { this.toast('Сканер не видит траекторию.'); return; } this.powerups.scan -= 1; this.renderer.showHint(hint); this.refs.status.textContent = `SCAN: ${pad(hint.from + 1, 2)} → ${pad(hint.to + 1, 2)}`; this.toast(`ТРАЕКТОРИЯ: СТЕРЖЕНЬ ${hint.from + 1} → ${hint.to + 1}`); this.playTone(480, .2); this.renderUI(); this.saveCheckpoint(); return; }
    if (type === 'quantum') { if (this.selectedPeg < 0) { this.toast('Сначала выбери источник для QUANTUM.'); return; } this.powerups.quantum -= 1; const target = this.level.goalPeg === this.selectedPeg ? (this.selectedPeg + 1) % this.level.pegCount : this.level.goalPeg; this.commitMove(this.selectedPeg, target, true); this.refs.status.textContent = 'Квантовый импульс: правило отменено'; return; }
    if (type === 'stasis') { this.powerups.stasis -= 1; this.freezeRemaining = 12; this.refs.status.textContent = 'STASIS активен: время заморожено'; this.toast('ВРЕМЯ ЗАМОРОЖЕНО НА 12 СЕКУНД'); this.playTone(620, .3); this.renderUI(); this.saveCheckpoint(); }
  }

  clearSelection() { this.selectedPeg = -1; this.renderer.setSelectedPeg(-1); this.refs.selection.classList.remove('active'); this.refs.selectionCopy.textContent = 'Выбери источник'; }
  calculateScore() { return Math.max(0, Math.round(1800 + this.level.number * 170 - this.moves * (10 + this.level.tierIndex * 2) - this.elapsed * 3 + this.combo * 22)); }

  togglePause() { if (this.completed) return; this.paused = !this.paused; this.refs.pause.hidden = !this.paused; this.refs.status.textContent = this.paused ? 'Протокол приостановлен' : 'Система стабильна'; $('btn-pause').textContent = this.paused ? '▶' : 'Ⅱ'; this.playTone(this.paused ? 130 : 300, .08); }
  toggleSound() { this.soundEnabled = !this.soundEnabled; $('btn-sound').textContent = this.soundEnabled ? '♫' : '×'; $('btn-sound').setAttribute('aria-label', this.soundEnabled ? 'Выключить звук' : 'Включить звук'); if (this.soundEnabled) this.playTone(440, .08); }

  completeLevel() {
    if (this.completed) return;
    this.completed = true; this.score = this.calculateScore() + Math.max(0, this.combo * 40);
    const key = String(this.level.number); this.bestScores[key] = Math.max(this.bestScores[key] ?? 0, this.score); this.powerups.scan += 1; if (this.level.number % 3 === 0) this.powerups.stasis += 1;
    this.renderer.spawnBurst({ x: this.renderer.pegX[this.level.goalPeg], y: 3.8, z: 0 }, 0xb6ff91, 72); this.playTone(640, .18, 'triangle'); window.setTimeout(() => this.playTone(920, .24), 120);
    this.refs.completeScore.textContent = pad(this.score, 6); $('complete-moves').textContent = pad(this.moves, 3); this.refs.completeTime.textContent = formatTime(this.elapsed); this.refs.completeCopy.textContent = this.level.anomaly.id === 'void' ? 'Ты пережил ускоренный разлом. Это уже неприлично.' : 'Геометрия признала поражение.'; this.refs.modal.hidden = false; this.refs.status.textContent = 'Ядро синхронизировано'; this.saveCheckpoint();
  }

  hideModal() { this.refs.modal.hidden = true; }

  renderUI() {
    const level = this.level; const onGoal = this.state[level.goalPeg]?.length ?? 0; const progress = onGoal / level.diskCount;
    this.refs.levelNumber.textContent = pad(level.number); this.refs.difficulty.textContent = level.difficulty.label; this.refs.levelTitle.textContent = level.difficulty.title; this.refs.sector.textContent = level.difficulty.sector; this.refs.diskCount.textContent = pad(level.diskCount); this.refs.pegCount.textContent = pad(level.pegCount); this.refs.seed.textContent = level.seedLabel; this.refs.progress.style.width = `${clamp(level.number / 24, .08, 1) * 100}%`; this.refs.objectiveProgress.style.width = `${progress * 100}%`;
    this.refs.anomalyIcon.textContent = level.anomaly.icon; this.refs.anomalyTitle.textContent = level.anomaly.title; this.refs.anomalyCopy.textContent = level.anomaly.copy; this.refs.mission.textContent = level.anomaly.id === 'rift' ? 'Рифтовый стержень меняет правила.' : 'Найди путь к зелёному ядру'; this.refs.goal.textContent = `Башня ${pad(level.goalPeg + 1, 2)} / собрать полностью`; this.refs.objectiveLeft.textContent = `${pad(level.diskCount - onGoal, 2)} дисков вне цели`; this.refs.moveCopy.textContent = `ХОД ${pad(this.moves, 3)}`; this.refs.combo.textContent = `x${pad(Math.max(1, this.combo))}`; this.refs.score.textContent = pad(this.score, 6); this.refs.time.textContent = formatTime(this.elapsed); this.refs.moves.textContent = pad(this.moves, 3); this.refs.best.textContent = this.bestScores[String(level.number)] ? pad(this.bestScores[String(level.number)], 6) : '—'; this.refs.streak.textContent = String(this.combo); this.refs.historyCount.textContent = `${this.moveLog.length} / ∞`;
    if (this.freezeRemaining > 0) this.refs.status.textContent = `STASIS ${this.freezeRemaining.toFixed(1)}s`;
    this.refs.objectiveCopy.textContent = level.riftPeg >= 0 ? 'Перенеси все диски в башню с зелёным маяком. Фиолетовый рифт принимает любой размер.' : 'Перенеси все диски в башню с зелёным маяком. Большой диск не может лежать на маленьком.';
    this.renderHistory(); Object.entries(this.powerups).forEach(([key, count]) => { const element = $(`${key}-count`); if (element) element.textContent = pad(count); }); document.querySelectorAll('[data-boost]').forEach((button) => { button.disabled = (this.powerups[button.dataset.boost] ?? 0) < 1; });
  }

  renderHistory() { this.refs.history.innerHTML = this.moveLog.length ? this.moveLog.slice(-7).reverse().map((move) => `<li><strong>${pad(move.from + 1, 2)} → ${pad(move.to + 1, 2)}</strong> / D${pad(move.disk, 2)}${move.quantum ? ' / Q' : ''}</li>`).join('') : '<li class="empty-history">История появится здесь</li>'; }
  saveCheckpoint() { safeWrite({ levelNumber: this.level.number, seed: this.level.seed, state: this.state, elapsed: this.elapsed, moves: this.moves, combo: this.combo, score: this.score, history: this.history, moveLog: this.moveLog, powerups: this.powerups, bestScores: this.bestScores }); }
  toast(message) { window.clearTimeout(this.toastTimer); this.refs.toast.textContent = message; this.refs.toast.classList.add('visible'); this.toastTimer = window.setTimeout(() => this.refs.toast.classList.remove('visible'), 2200); }

  playTone(frequency, duration, type = 'sine') {
    if (!this.soundEnabled) return; const AudioContext = window.AudioContext || window.webkitAudioContext; if (!AudioContext) return; this.audioContext ??= new AudioContext(); if (this.audioContext.state === 'suspended') this.audioContext.resume(); const oscillator = this.audioContext.createOscillator(); const gain = this.audioContext.createGain(); oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime); oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, frequency * .72), this.audioContext.currentTime + duration); gain.gain.setValueAtTime(.0001, this.audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.06, this.audioContext.currentTime + .008); gain.gain.exponentialRampToValueAtTime(.0001, this.audioContext.currentTime + duration); oscillator.connect(gain).connect(this.audioContext.destination); oscillator.start(); oscillator.stop(this.audioContext.currentTime + duration + .02);
  }

  tick(now) {
    const delta = Math.min(.05, (now - this.lastFrame) / 1000); this.lastFrame = now;
    if (!this.paused && !this.completed) { if (this.freezeRemaining > 0) this.freezeRemaining = Math.max(0, this.freezeRemaining - delta); else this.elapsed += delta * this.level.timeScale; this.score = this.calculateScore(); this.uiTimer += delta; if (this.uiTimer > .12) { this.renderUI(); this.uiTimer = 0; } if (Math.floor(this.elapsed) % 5 === 0 && Math.floor(this.elapsed) !== Math.floor(this.elapsed - delta * this.level.timeScale)) this.saveCheckpoint(); }
    requestAnimationFrame(this.tick);
  }
}

const game = new HanoiVoidGame();
window.hanoiVoid = game;
