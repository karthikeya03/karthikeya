import { useEffect, useRef, useState, useCallback } from 'react';

const socials = [
  { icon: 'fab fa-github', href: 'https://github.com/karthikeya03', label: 'GitHub' },
  { icon: 'fab fa-linkedin', href: 'http://www.linkedin.com/in/saisatyakarthikeya', label: 'LinkedIn' },
  { icon: 'fas fa-code', href: 'https://leetcode.com/u/03karthikeya03/', label: 'LeetCode' },
  { icon: 'fas fa-utensils', href: 'https://www.codechef.com/users/karthikeya_03', label: 'CodeChef' },
];

/* ─── Inline styles ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

  #contact-section * { box-sizing: border-box; }

  #contact-section {
    position: relative;
    min-height: 100vh;
    padding: 6rem 2rem 4rem;
    overflow: hidden;
    font-family: 'Syne', sans-serif;
    background: transparent;
  }
  @media(max-width:1024px){
    #contact-section{\n      padding: 5rem 1.5rem 3rem;\n    }\n  }\n  @media(max-width:768px){\n    #contact-section{\n      padding: 4rem 1.25rem 2.5rem;\n    }\n  }\n  @media(max-width:640px){\n    #contact-section{\n      padding: 3rem 1rem 2rem;\n    }\n  }\n  @media(max-width:480px){\n    #contact-section{\n      padding: 2rem 0.75rem 1.5rem;\n      min-height: auto;\n    }\n  }

  /* ── Canvas particles ── */
  #contact-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Floating orbs ── */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: orbFloat 8s ease-in-out infinite alternate;
  }
  .orb-1 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%);
    top: -100px; left: -100px;
    animation-delay: 0s;
  }
  .orb-2 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    animation-delay: -4s;
  }
  .orb-3 {
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(180,0,255,0.12) 0%, transparent 70%);
    top: 40%; left: 50%;
    animation-delay: -2s;
  }
  @keyframes orbFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 40px) scale(1.12); }
  }

  /* ── Section header ── */
  .ct-header {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto 4rem;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  @media(max-width: 768px) {
    .ct-header {
      max-width: 100%;
      padding: 0 0.75rem;
    }
  }
  @media(max-width: 480px) {
    .ct-header {
      max-width: 100%;
      padding: 0 0.5rem;
      margin: 0 auto 2rem;
    }
  }
  .ct-tag {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #00d4ff;
    border: 1px solid rgba(0,212,255,0.35);
    padding: 0.35rem 1rem;
    border-radius: 2rem;
    margin-bottom: 1.2rem;
    animation: tagGlow 3s ease-in-out infinite alternate;
  }
  @keyframes tagGlow {
    from { box-shadow: 0 0 8px rgba(0,212,255,0.2); }
    to   { box-shadow: 0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.2); }
  }
  .ct-title {
    font-size: clamp(2rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #f5a623 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: titleShift 5s ease-in-out infinite alternate;
    margin: 0;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  @media(max-width:640px) {
    .ct-title {
      font-size: clamp(1.8rem, 4vw, 3.5rem) !important;
    }
  }
  @media(max-width:480px) {
    .ct-title {
      font-size: clamp(1.4rem, 3vw, 2.5rem) !important;
    }
  }
  @keyframes titleShift {
    from { background-position: 0% 50%; }
    to   { background-position: 100% 50%; }
  }
  .ct-subtitle {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.45);
    margin-top: 0.75rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.9rem;
  }

  /* ── Grid ── */
  .ct-grid {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 3rem;
    align-items: start;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  @media (max-width: 768px) {
    .ct-grid { 
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 0 0.75rem;
    }
  }
  @media (max-width: 480px) {
    .ct-grid { 
      gap: 1.5rem;
      padding: 0 0.5rem;
    }
  }

  /* ── Info cards ── */
  .info-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 1.25rem;
    padding: 1.4rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    cursor: default;
    transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
  }
  @media(max-width:768px) {
    .info-card {
      padding: 1rem 1.2rem;
      gap: 0.9rem;
    }
  }
  @media(max-width:480px) {
    .info-card {
      padding: 0.8rem 1rem;
      gap: 0.8rem;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .info-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .info-card:hover {
    border-color: rgba(0,212,255,0.5);
    transform: translateX(8px);
    box-shadow: -4px 0 30px rgba(0,212,255,0.15), 0 0 40px rgba(0,212,255,0.05);
  }
  .info-card:hover::before { opacity: 1; }
  .info-icon {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: rgba(0,212,255,0.1);
    border: 1px solid rgba(0,212,255,0.25);
    display: flex; align-items: center; justify-content: center;
    color: #00d4ff;
    font-size: 1.1rem;
    flex-shrink: 0;
    transition: all 0.3s;
  }
  @media(max-width:480px) {
    .info-icon {
      width: 40px;
      height: 40px;
      font-size: 0.95rem;
    }
  }
  .info-card:hover .info-icon {
    background: rgba(0,212,255,0.2);
    box-shadow: 0 0 20px rgba(0,212,255,0.4);
  }
  .info-label {
    font-size: 0.7rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 0.2rem;
  }
  @media(max-width:480px) {
    .info-label {
      font-size: 0.6rem;
      letter-spacing: 0.1em;
    }
  }
  .info-value {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.85);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  @media(max-width:768px) {
    .info-value {
      font-size: 0.85rem;
    }
  }
  @media(max-width:480px) {
    .info-value {
      font-size: 0.75rem;
    }
  }
  a.info-value:hover { color: #00d4ff; }

  /* ── Socials ── */
  .socials-row {
    display: flex;
    gap: 0.9rem;
    margin-top: 1.8rem;
    flex-wrap: wrap;
  }
  @media(max-width:480px) {
    .socials-row {
      gap: 0.6rem;
      margin-top: 1.2rem;
    }
  }
  .social-btn {
    position: relative;
    width: 56px; height: 56px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5);
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    overflow: hidden;
  }
  @media(max-width:480px) {
    .social-btn {
      width: 48px;
      height: 48px;
      font-size: 1rem;
      border-radius: 12px;
    }
  }
  .social-btn::after {
    content: attr(data-label);
    position: absolute;
    bottom: -30px;
    left: 50%; transform: translateX(-50%);
    font-size: 0.65rem;
    font-family: 'Space Mono', monospace;
    white-space: nowrap;
    color: #f5a623;
    opacity: 0;
    transition: all 0.3s;
  }
  .social-btn:hover {
    border-color: #f5a623;
    color: #f5a623;
    transform: translateY(-6px) scale(1.1);
    box-shadow: 0 12px 30px rgba(245,166,35,0.25), 0 0 0 1px rgba(245,166,35,0.3);
    background: rgba(245,166,35,0.08);
  }
  .social-btn:hover::after { opacity: 1; bottom: -22px; }

  /* ── 3D Form card ── */
  .form-scene {
    perspective: 1200px;
  }
  .form-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 1.75rem;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out, box-shadow 0.4s;
    will-change: transform;
    width: 100%;
    box-sizing: border-box;
  }
  @media(max-width:768px) {
    .form-card {
      padding: 1.8rem;
    }
  }
  @media(max-width:480px) {
    .form-card {
      padding: 1.2rem;
    }
  }
  .form-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(245,166,35,0.04) 50%, transparent 100%);
    border-radius: inherit;
    pointer-events: none;
  }
  .form-card::after {
    content: '';
    position: absolute;
    top: -1px; left: -1px; right: -1px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, #f5a623, transparent);
    border-radius: 1.75rem 1.75rem 0 0;
  }

  /* ── Input fields ── */
  .field-wrap {
    position: relative;
    margin-bottom: 1.4rem;
  }
  @media(max-width:480px) {
    .field-wrap {
      margin-bottom: 1rem;
    }
  }
  .field-wrap label {
    position: absolute;
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
    color: rgba(255,255,255,0.3);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    font-family: 'Space Mono', monospace;
  }
  @media(max-width:480px) {
    .field-wrap label {
      font-size: 0.8rem;
      left: 0.8rem;
    }
  }
  .field-wrap.textarea-wrap label {
    top: 1.2rem;
    transform: none;
  }
  .field-wrap.active label,
  .field-wrap.filled label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: 0.65rem;
    color: #00d4ff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #0d0d0f;
    padding: 0 0.4rem;
  }
  .ct-input {
    width: 100%;
    padding: 1rem 1.1rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.875rem;
    color: #fff;
    font-size: 0.95rem;
    font-family: 'Syne', sans-serif;
    outline: none;
    transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
    position: relative;
    z-index: 1;
    box-sizing: border-box;
  }
  @media(max-width:480px) {
    .ct-input {
      padding: 0.75rem 0.8rem;
      font-size: 0.85rem;
    }
  }
  .ct-input::placeholder { color: transparent; }
  .ct-input:focus {
    border-color: #00d4ff;
    background: rgba(0,212,255,0.05);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.1), 0 4px 20px rgba(0,212,255,0.08);
  }
  textarea.ct-input {
    resize: none;
    min-height: 140px;
    padding-top: 1rem;
  }
  @media(max-width:480px) {
    textarea.ct-input {
      min-height: 100px;
    }
  }

  /* ── Submit button ── */
  .ct-submit {
    position: relative;
    width: 100%;
    padding: 1.1rem;
    border: none;
    border-radius: 0.875rem;
    background: linear-gradient(135deg, #f5a623, #ff6b35);
    color: #0d0d0f;
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.05em;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-sizing: border-box;
  }
  @media(max-width:480px) {
    .ct-submit {
      padding: 0.8rem;
      font-size: 0.9rem;
    }
  }
  .ct-submit::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }
  .ct-submit:hover::before { left: 100%; }
  .ct-submit:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(245,166,35,0.4), 0 0 60px rgba(245,166,35,0.2);
  }
  .ct-submit:active { transform: translateY(0); }
  .ct-submit.sent {
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    animation: sentPulse 0.6s ease;
  }
  @keyframes sentPulse {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.04); }
    100% { transform: scale(1); }
  }

  /* ── Ripple ── */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: scale(0);
    animation: rippleAnim 0.6s linear;
    pointer-events: none;
  }
  @keyframes rippleAnim {
    to { transform: scale(4); opacity: 0; }
  }

  /* ── Status ── */
  .ct-status {
    text-align: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    margin-top: 0.8rem;
    height: 1.2rem;
    transition: all 0.4s;
  }
  .ct-status.success { color: #00ff88; }
  .ct-status.error   { color: #ff4d6d; }

  /* ── Availability badge ── */
  .avail-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background: rgba(0,255,136,0.07);
    border: 1px solid rgba(0,255,136,0.2);
    font-size: 0.75rem;
    font-family: 'Space Mono', monospace;
    color: rgba(255,255,255,0.5);
    flex-wrap: wrap;
    word-break: break-word;
    overflow-wrap: break-word;
    width: 100%;
    max-width: 300px;
  }
  .avail-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #00ff88;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.6); }
    50%       { box-shadow: 0 0 0 6px rgba(0,255,136,0); }
  }

  /* ── Scanline shimmer ── */
  .form-card .shimmer {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.01) 2px,
      rgba(255,255,255,0.01) 4px
    );
    pointer-events: none;
    z-index: 0;
    border-radius: inherit;
  }

  /* ── Corner accents ── */
  .corner {
    position: absolute;
    width: 20px; height: 20px;
    border-color: rgba(0,212,255,0.4);
    border-style: solid;
  }
  .corner-tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
  .corner-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
  .corner-bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
  .corner-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }
`;

/* ─── Component ─── */
const Contact = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<{ msg: string; type: string } | null>(null);
  const [sent, setSent] = useState(false);
  const rafRef = useRef<number>(0);

  /* ─── Particle canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    const resize = () => {
      const parent = canvas.parentElement!;
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number; da: number;
    }
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.1,
      da: (Math.random() - 0.5) * 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0.05 || p.alpha >= 0.75) p.da *= -1;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      }
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ─── 3D tilt on form card ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = formCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.01)`;
    card.style.boxShadow = `${-dx * 20}px ${dy * 20}px 60px rgba(0,212,255,0.15), 0 0 80px rgba(0,212,255,0.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = formCardRef.current;
    if (!card) return;
    card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.boxShadow = '';
  }, []);

  /* ─── Ripple on button ─── */
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  };

  /* ─── Submit ─── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ msg: '⚠ FILL ALL FIELDS FIRST', type: 'error' });
      return;
    }
    const mailtoLink = `mailto:saisatyakarthikeya.jobs@gmail.com?subject=Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.open(mailtoLink);
    setSent(true);
    setStatus({ msg: '✓ MESSAGE SENT — TALK SOON!', type: 'success' });
    setTimeout(() => { setSent(false); setStatus(null); setForm({ name: '', email: '', message: '' }); }, 4000);
  };

  const isActive = (field: string) => active === field;
  const isFilled = (field: keyof typeof form) => form[field].length > 0;

  return (
    <>
      <style>{css}</style>
      <section id="contact-section" ref={sectionRef}>
        <canvas ref={canvasRef} id="contact-canvas" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Header */}
        <div className="ct-header">
          <div className="ct-tag">// get in touch</div>
          <h2 className="ct-title">Let's Build<br />Something.</h2>
          <p className="ct-subtitle">Open to opportunities, collaborations & conversations.</p>
        </div>

        {/* Grid */}
        <div className="ct-grid">
          {/* Left: Info */}
          <div>
            <a href="mailto:saisatyakarthikeya.jobs@gmail.com" className="info-card" style={{ display: 'flex', textDecoration: 'none' }}>
              <div className="info-icon"><i className="fas fa-envelope" /></div>
              <div>
                <div className="info-label">Email</div>
                <span className="info-value">saisatyakarthikeya.jobs@gmail.com</span>
              </div>
            </a>
            <div className="info-card">
              <div className="info-icon"><i className="fas fa-phone" /></div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">+91 7013796123</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><i className="fas fa-map-marker-alt" /></div>
              <div>
                <div className="info-label">Location</div>
                <div className="info-value">Suramplaem, Andhra Pradesh, India</div>
              </div>
            </div>

            <div className="avail-badge">
              <div className="avail-dot" />
              Available for full-time roles & freelance
            </div>


          </div>

          {/* Right: 3D Form */}
          <div
            className="form-scene"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="form-card" ref={formCardRef}>
              <div className="shimmer" />
              <div className="corner corner-tl" />
              <div className="corner corner-tr" />
              <div className="corner corner-bl" />
              <div className="corner corner-br" />

              <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                {/* Name */}
                <div className={`field-wrap ${isActive('name') ? 'active' : ''} ${isFilled('name') ? 'filled' : ''}`}>
                  <label>Name</label>
                  <input
                    type="text"
                    className="ct-input"
                    value={form.name}
                    onFocus={() => setActive('name')}
                    onBlur={() => setActive(null)}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>

                {/* Email */}
                <div className={`field-wrap ${isActive('email') ? 'active' : ''} ${isFilled('email') ? 'filled' : ''}`}>
                  <label>Email</label>
                  <input
                    type="email"
                    className="ct-input"
                    value={form.email}
                    onFocus={() => setActive('email')}
                    onBlur={() => setActive(null)}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>

                {/* Message */}
                <div className={`field-wrap textarea-wrap ${isActive('message') ? 'active' : ''} ${isFilled('message') ? 'filled' : ''}`}>
                  <label>Message</label>
                  <textarea
                    className="ct-input"
                    value={form.message}
                    onFocus={() => setActive('message')}
                    onBlur={() => setActive(null)}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  className={`ct-submit ${sent ? 'sent' : ''}`}
                  onClick={handleRipple}
                >
                  <i className={`fas ${sent ? 'fa-check' : 'fa-paper-plane'}`} />
                  {' '}
                  {sent ? 'Message Sent!' : 'Send Message'}
                </button>

                {status && (
                  <div className={`ct-status ${status.type}`}>
                    {status.msg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;