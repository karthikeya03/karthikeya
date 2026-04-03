import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const phrases = [
  { text: "I build AI-powered apps", color: "#00d4ff" },
  { text: "I solve DSA problems",    color: "#f5a623" },
  { text: "I deploy on AWS",         color: "#a78bfa" },
  { text: "I craft full-stack magic",color: "#00ff88" },
];


const ticker = [
  "React", "TypeScript", "Python", "TensorFlow", "AWS",
  "Docker", "Flask", "Node.js", "PostgreSQL", "Three.js",
  "React", "TypeScript", "Python", "TensorFlow", "AWS",
  "Docker", "Flask", "Node.js", "PostgreSQL", "Three.js",
];

/* ─────────────────────────────────────────
   CSS (all inline)
───────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');

#hero-root { position: relative; min-height: 100vh; overflow: hidden; font-family: 'Syne', sans-serif; }

/* ── Grid BG ── */
#hero-grid-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

/* ── Scan line ── */
#hero-root::after {
  content: '';
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 3px,
    rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px
  );
}

/* ── Orbs ── */
.hero-orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); pointer-events: none; z-index: 0;
  animation: heroOrbDrift 10s ease-in-out infinite alternate;
}
.hero-orb-1 { width:600px;height:600px; background:radial-gradient(circle,rgba(0,212,255,0.12),transparent 70%); top:-200px;left:-150px; }
.hero-orb-2 { width:500px;height:500px; background:radial-gradient(circle,rgba(245,166,35,0.10),transparent 70%); bottom:-150px;right:-100px; animation-delay:-5s; }
.hero-orb-3 { width:300px;height:300px; background:radial-gradient(circle,rgba(167,139,250,0.10),transparent 70%); top:40%;left:45%; animation-delay:-2.5s; }
@keyframes heroOrbDrift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(40px,50px) scale(1.15); }
}

/* ── Layout ── */
.hero-inner {
  position: relative; z-index: 2;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}
@media(max-width:1024px){ .hero-inner{ gap: 1.5rem; padding: 5rem 1.5rem; } }
@media(max-width:768px){
  .hero-inner{
    grid-template-columns:1fr;
    padding: 5.5rem 1.25rem 3rem;
    gap: 1.5rem;
    min-height: auto;
  }
}
@media(max-width:640px){
  .hero-inner{
    grid-template-columns:1fr;
    padding: 5rem 1rem 2rem;
    gap: 1rem;
    min-height: auto;
  }
}
@media(max-width:480px){
  .hero-inner{
    padding: 5rem 0.75rem 1.5rem;
    gap: 0.8rem;
  }
}

/* ── Left ── */
.hero-left { display:flex; flex-direction:column; gap:1.4rem; }

/* ── Status badge ── */
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.4rem 1rem; border-radius: 2rem;
  border: 1px solid rgba(0,255,136,0.3);
  background: rgba(0,255,136,0.06);
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.55);
  width: fit-content;
  animation: heroFadeUp 0.8s ease both;
  position: relative;
  z-index: 10;
  word-break: break-word;
  overflow-wrap: break-word;
}
.hero-badge-dot {
  width:8px; height:8px; border-radius:50%; background:#00ff88;
  animation: greenPulse 2s ease-in-out infinite;
}
@keyframes greenPulse {
  0%,100%{ box-shadow:0 0 0 0 rgba(0,255,136,0.6); }
  50%    { box-shadow:0 0 0 7px rgba(0,255,136,0); }
}

/* ── Name (glitch) ── */
.hero-name-wrap {
  position: relative;
  animation: heroFadeUp 0.8s 0.1s ease both;
}
.hero-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 6.5vw, 6rem);
  line-height: 0.95;
  letter-spacing: 0.04em;
  color: #fff;
  position: relative;
  display: inline-block;
  word-break: break-word;
}
@media(max-width:640px){
  .hero-name{
    font-size: clamp(1.5rem, 5.5vw, 2.5rem);
  }
}
.hero-name::before,
.hero-name::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  font-family: inherit; font-size: inherit;
  line-height: inherit; letter-spacing: inherit;
}
.hero-name::before {
  color: #00d4ff;
  clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
  transform: translateX(-3px);
  animation: glitch1 4s infinite;
}
.hero-name::after {
  color: #f5a623;
  clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%);
  transform: translateX(3px);
  animation: glitch2 4s infinite;
}
@keyframes glitch1 {
  0%,90%,100% { transform:translateX(0); opacity:0; }
  92%          { transform:translateX(-4px); opacity:0.8; }
  94%          { transform:translateX(3px);  opacity:0.8; }
  96%          { transform:translateX(-2px); opacity:0.6; }
  98%          { transform:translateX(0);    opacity:0; }
}
@keyframes glitch2 {
  0%,90%,100% { transform:translateX(0); opacity:0; }
  93%          { transform:translateX(5px);  opacity:0.7; }
  95%          { transform:translateX(-3px); opacity:0.7; }
  97%          { transform:translateX(2px);  opacity:0.5; }
  99%          { transform:translateX(0);    opacity:0; }
}

/* ── Role ── */
.hero-role {
  font-size: clamp(0.95rem,2.5vw,1.5rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #f5a623;
  text-shadow: 0 0 20px rgba(245,166,35,0.5), 0 0 40px rgba(245,166,35,0.2);
  animation: heroFadeUp 0.8s 0.2s ease both;
  display: flex; align-items: center; gap: 0.6rem;
  flex-wrap: wrap;
}
@media(max-width:640px){
  .hero-role{
    font-size: 0.9rem;
    gap: 0.4rem;
  }
}
.role-slash { color: rgba(255,255,255,0.2); font-weight: 300; }

/* ── College ── */
.hero-college {
  font-family: 'DM Mono', monospace;
  font-size: 0.8rem; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.35);
  animation: heroFadeUp 0.8s 0.3s ease both;
  display: flex; align-items: center; gap: 0.5rem;
}

/* ── Typewriter ── */
.hero-typewriter {
  font-family: 'DM Mono', monospace;
  font-size: clamp(0.8rem,2vw,1.25rem);
  height: auto;
  min-height: 2rem;
  display: flex; align-items: center; gap: 0.25rem;
  animation: heroFadeUp 0.8s 0.4s ease both;
  flex-wrap: wrap;
}
@media(max-width:640px){
  .hero-typewriter{
    font-size: 0.75rem;
    height: auto;
  }
}
.tw-prefix { color:rgba(255,255,255,0.25); }
.tw-text   { transition: color 0.4s; }
.tw-cursor {
  display: inline-block;
  width: 2px; height: 1.2em;
  background: currentColor;
  animation: blink 0.75s step-end infinite;
  border-radius: 1px;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── CTA buttons ── */
.hero-ctas {
  display: flex; flex-wrap: wrap; gap: 1.1rem;
  animation: heroFadeUp 0.8s 0.5s ease both;
  padding-top: 0.4rem;
}
@media(max-width:768px){
  .hero-ctas{
    gap: 0.9rem;
  }
}
@media(max-width:640px){
  .hero-ctas{
    gap: 0.75rem;
    flex-direction: column;
  }
  .hero-ctas > * {
    width: 100%;
    justify-content: center;
  }
}
@media(max-width:480px){
  .hero-ctas{
    gap: 0.6rem;
  }
}

/* PRIMARY — gold fire button */
.cta-primary {
  position: relative;
  display: inline-flex; align-items: center; gap: 0.75rem;
  padding: 1.05rem 2.4rem;
  background: linear-gradient(135deg, #f5a623 0%, #ff6b35 60%, #f5a623 100%);
  background-size: 200% 200%;
  color: #0a0a0c; font-weight: 800; font-size: 1rem;
  letter-spacing: 0.04em; font-family: 'Syne', sans-serif;
  border: none; border-radius: 0.875rem; cursor: pointer;
  text-decoration: none; overflow: hidden;
  animation: btnBgShift 3s ease infinite;
  transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s;
  box-shadow: 0 4px 20px rgba(245,166,35,0.3), inset 0 1px 0 rgba(255,255,255,0.25);
  white-space: nowrap;
}
@media(max-width:768px){
  .cta-primary{
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }
}
@media(max-width:640px){
  .cta-primary{
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }
}
@media(max-width:480px){
  .cta-primary{
    padding: 0.8rem 1.2rem;
    font-size: 0.85rem;
  }
}
@keyframes btnBgShift {
  0%,100% { background-position:0% 50%; }
  50%      { background-position:100% 50%; }
}
/* shimmer sweep */
.cta-primary::before {
  content:''; position:absolute; top:0; left:-120%; width:80%; height:100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-15deg);
  transition: left 0.55s cubic-bezier(0.23,1,0.32,1);
}
.cta-primary:hover::before { left:150%; }
/* bottom glow bar */
.cta-primary::after {
  content:''; position:absolute; bottom:-2px; left:20%; right:20%; height:3px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  border-radius:2px; opacity:0;
  transition: opacity 0.3s;
}
.cta-primary:hover::after { opacity:0.6; }
.cta-primary:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 20px 50px rgba(245,166,35,0.5), 0 0 80px rgba(245,166,35,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
}
.cta-primary:active { transform: translateY(-1px) scale(0.99); }

/* icon circle on primary */
.cta-primary .btn-icon {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.23,1,0.32,1);
}
.cta-primary:hover .btn-icon { transform: rotate(20deg) scale(1.15); }

/* SECONDARY — cyan glass button */
.cta-secondary {
  position: relative;
  display: inline-flex; align-items: center; gap: 0.75rem;
  padding: 1.05rem 2.4rem;
  color: rgba(255,255,255,0.8); font-weight: 700; font-size: 1rem;
  letter-spacing: 0.04em; font-family: 'Syne', sans-serif;
  border-radius: 0.875rem; cursor: pointer; text-decoration: none;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
  /* animated gradient border */
  border: 1px solid transparent;
  background-clip: padding-box;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3);
  white-space: nowrap;
}
@media(max-width:768px){
  .cta-secondary{
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }
}
@media(max-width:640px){
  .cta-secondary{
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }
}
@media(max-width:480px){
  .cta-secondary{
    padding: 0.8rem 1.2rem;
    font-size: 0.85rem;
  }
}
/* animated border ring */
.cta-secondary::before {
  content:''; position:absolute; inset:-1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(0,212,255,0.6), rgba(167,139,250,0.4), rgba(0,212,255,0.6));
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.4s;
  animation: secBorderShift 3s linear infinite;
  z-index: -1;
}
@keyframes secBorderShift {
  0%   { background-position:0% 0%; }
  100% { background-position:200% 200%; }
}
.cta-secondary:hover::before { opacity: 1; }
.cta-secondary:hover {
  color: #00d4ff;
  background: rgba(0,212,255,0.07);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.08), inset 0 0 0 1px rgba(0,212,255,0.3);
}
.cta-secondary:active { transform: translateY(-1px); }

.cta-secondary .btn-icon {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.3s;
}
.cta-secondary:hover .btn-icon {
  transform: translateY(-2px);
  background: rgba(0,212,255,0.2);
}


/* ── Right: visual stage ── */
.hero-right {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  height: 100%; min-height: 500px;
  animation: heroFadeUp 0.8s 0.25s ease both;
}

/* ── Profile ring ── */
.profile-ring-wrap {
  position: relative; z-index: 3;
  width: 260px; height: 260px;
}
@media(min-width:640px){ .profile-ring-wrap{width:300px;height:300px;} }

.profile-ring-outer {
  position: absolute; inset: -8px; border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(#0a0a0c,#0a0a0c) padding-box,
              linear-gradient(135deg, #00d4ff, #f5a623, #a78bfa, #00d4ff) border-box;
  animation: ringRotate 6s linear infinite;
}
@keyframes ringRotate { to { transform:rotate(360deg); } }

.profile-ring-mid {
  position: absolute; inset: -3px; border-radius: 50%;
  border: 1px solid rgba(0,212,255,0.2);
  animation: ringRotate 10s linear infinite reverse;
}

.profile-img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255,255,255,0.06);
  position: relative; z-index: 1;
}

/* ── Floating holo-chips ── */
.holo-chip {
  position: absolute; z-index: 4;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.875rem;
  padding: 0.6rem 1rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
  display: flex; align-items: center; gap: 0.5rem;
  animation: chipFloat 4s ease-in-out infinite alternate;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.holo-chip-1 { top: 8%; left: -8%; animation-delay: 0s; border-color:rgba(0,212,255,0.25); }
.holo-chip-2 { top: 8%; right:-8%; animation-delay:-1.5s; border-color:rgba(245,166,35,0.25); }
.holo-chip-3 { bottom:15%;left:-5%; animation-delay:-0.8s; border-color:rgba(167,139,250,0.25); }
.holo-chip-4 { bottom:15%;right:-5%; animation-delay:-2.2s; border-color:rgba(0,255,136,0.25); }
@keyframes chipFloat {
  from { transform:translateY(0) rotate(-1deg); }
  to   { transform:translateY(-12px) rotate(1deg); }
}
@media(max-width:900px){
  .holo-chip-1,.holo-chip-3{left:0}
  .holo-chip-2,.holo-chip-4{right:0}
}

/* ── 3D canvas overlay ── */
.canvas-3d {
  position: absolute; inset: -60px; z-index: 2;
  pointer-events: none;
}

/* ── Ticker ── */
.hero-ticker {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(10,10,12,0.7); backdrop-filter:blur(10px);
  padding: 0.75rem 0; overflow: hidden;
}
.ticker-track {
  display: flex; gap: 3rem;
  animation: tickerScroll 25s linear infinite;
  width: max-content;
}
.ticker-item {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: 'DM Mono', monospace; font-size:0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  white-space: nowrap;
}
.ticker-dot { width:4px;height:4px;border-radius:50%;background:#00d4ff;opacity:0.5; }
@keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ── Floating code floaters ── */
.code-floater {
  position: absolute; font-family:'DM Mono',monospace;
  color: rgba(0,212,255,0.12); font-size:1rem; pointer-events:none; z-index:1;
  animation: floaterAnim var(--dur,4s) ease-in-out infinite alternate;
  animation-delay: var(--del,0s);
}
@keyframes floaterAnim {
  from { transform:translateY(0) rotate(-5deg); opacity:0.4; }
  to   { transform:translateY(-20px) rotate(5deg); opacity:0.15; }
}

/* ── Entrance ── */
@keyframes heroFadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ── Cursor glow ── */
#hero-cursor {
  position:fixed; width:24px;height:24px;border-radius:50%;
  background:rgba(0,212,255,0.15); border:1px solid rgba(0,212,255,0.5);
  pointer-events:none; z-index:9999;
  transform:translate(-50%,-50%);
  transition:transform 0.08s, width 0.3s, height 0.3s, background 0.3s;
  mix-blend-mode:screen;
}
`;

/* ─────────────────────────────────────────
   3D Neural Network (enhanced)
───────────────────────────────────────── */
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const nodeCount = 55;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#f5a623'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#00ff88'),
    ];

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 0.06 + 0.03;
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i*3] - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 3) {
          linePositions.push(
            positions[i*3], positions[i*3+1], positions[i*3+2],
            positions[j*3], positions[j*3+1], positions[j*3+2]
          );
          const c = palette[Math.floor(Math.random() * palette.length)];
          lineColors.push(c.r,c.g,c.b,c.r,c.g,c.b);
        }
      }
    }

    if (nodesRef.current) {
      nodesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      nodesRef.current.geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    }
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      linesRef.current.geometry.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(lineColors), 3));
    }
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    }
    // pulse a single node
    if (pulseRef.current) {
      (pulseRef.current.material as THREE.PointsMaterial).size = 0.12 + Math.sin(t * 3) * 0.06;
      (pulseRef.current.material as THREE.PointsMaterial).opacity = 0.7 + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry />
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.25} />
      </lineSegments>
      {/* single pulse node */}
      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0,0,0]),3]} />
        </bufferGeometry>
        <pointsMaterial color="#00d4ff" size={0.15} transparent opacity={0.9} sizeAttenuation />
      </points>
    </group>
  );
};

/* ─────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────── */
const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex]     = useState(0);
  const [deleting, setDeleting]       = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* typewriter */
  useEffect(() => {
    const current = phrases[phraseIndex].text;
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < current.length)
      t = setTimeout(() => setCharIndex(c => c + 1), 65);
    else if (!deleting && charIndex === current.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && charIndex > 0)
      t = setTimeout(() => setCharIndex(c => c - 1), 28);
    else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex(i => (i + 1) % phrases.length);
    }
    return () => clearTimeout(t);
  }, [charIndex, deleting, phraseIndex]);

  /* custom cursor */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const currentPhrase = phrases[phraseIndex];

  return (
    <>
      <style>{css}</style>
      <div ref={cursorRef} id="hero-cursor" />

      <section id="hero-root">
        <div id="hero-grid-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Floating code chars */}
        {['{ }','</>','01','&&','=>','[ ]','//','**'].map((c, i) => (
          <div key={i} className="code-floater" style={{
            left:`${8 + i * 11}%`, top:`${15 + (i % 4) * 18}%`,
            ['--dur' as any]:`${3+i*0.4}s`, ['--del' as any]:`${i*0.3}s`
          }}>{c}</div>
        ))}

        <div className="hero-inner">
          {/* ── LEFT ── */}
          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Available for opportunities
            </span>

            <div className="hero-name-wrap">
              <h1
                className="hero-name"
                data-text="BANDIKATLA SAI SATYA KARTHIKEYA"
              >
                BANDIKATLA<br />SAI SATYA<br />KARTHIKEYA
              </h1>
            </div>

            <div className="hero-role">
              Full Stack
              <span className="role-slash">/</span>
              AI Developer
            </div>

            <div className="hero-college">
              <i className="fas fa-map-marker-alt" style={{ color: '#f5a623', fontSize: '0.75rem' }} />
              Final-year B.Tech · AU
            </div>

            <div className="hero-typewriter">
              <span className="tw-prefix">›_</span>
              <span className="tw-text" style={{ color: currentPhrase.color }}>
                {currentPhrase.text.slice(0, charIndex)}
              </span>
              <span className="tw-cursor" style={{ color: currentPhrase.color }} />
            </div>

            <div className="hero-ctas">
              <a href="#projects" className="cta-primary">
                <span className="btn-icon"><i className="fas fa-rocket" /></span>
                View Projects
              </a>
              <a
                href="https://drive.google.com/file/d/1Wiw9VPLHhbg_UEFy4xFPcrsXcBjcrtDa/view?usp=drive_link"
                target="_blank" rel="noopener noreferrer"
                className="cta-secondary"
              >
                <span className="btn-icon"><i className="fas fa-download" /></span>
                Resume
              </a>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hero-right">
            {/* 3D canvas */}
            <div className="canvas-3d">
              <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <NeuralNetwork />
              </Canvas>
            </div>

            {/* Profile */}
            <div className="profile-ring-wrap">
              <div className="profile-ring-outer" />
              <div className="profile-ring-mid" />
              <img
                src="/2026.png"
                alt="Karthikeya"
                className="profile-img"
              />
            </div>

            {/* Holo chips */}
            <div className="holo-chip holo-chip-1">
              <i className="fas fa-brain" style={{ color: '#00d4ff' }} />
              MobileNetV2 · TF
            </div>
            <div className="holo-chip holo-chip-2">
              <i className="fab fa-aws" style={{ color: '#f5a623' }} />
              AWS Certified
            </div>
            <div className="holo-chip holo-chip-3">
              <i className="fas fa-code" style={{ color: '#a78bfa' }} />
              500+ LeetCode
            </div>
            <div className="holo-chip holo-chip-4">
              <i className="fas fa-leaf" style={{ color: '#00ff88' }} />
              LeafScanner AI
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="hero-ticker">
          <div className="ticker-track">
            {ticker.map((item, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;