import { useEffect, useRef, useState } from 'react';

const SKILLS = [
  {
    cat: 'LANGUAGES', icon: '⌨',
    accent: '#00ffc8', glow: 'rgba(0,255,200,.15)', iconBg: 'rgba(0,255,200,.12)', iconShadow: 'rgba(0,255,200,.3)',
    aurora: 'linear-gradient(135deg,#00ffc8,#00a8ff)', auroraLine: 'linear-gradient(90deg,#00ffc8,#00a8ff)',
    progress: 85,
    skills: [
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    ],
  },
  {
    cat: 'FRONTEND', icon: '⚡',
    accent: '#7b2fff', glow: 'rgba(123,47,255,.15)', iconBg: 'rgba(123,47,255,.12)', iconShadow: 'rgba(123,47,255,.3)',
    aurora: 'linear-gradient(135deg,#7b2fff,#ff2fa0)', auroraLine: 'linear-gradient(90deg,#7b2fff,#ff2fa0)',
    progress: 90,
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    cat: 'BACKEND', icon: '⚙',
    accent: '#00d4ff', glow: 'rgba(0,212,255,.15)', iconBg: 'rgba(0,212,255,.12)', iconShadow: 'rgba(0,212,255,.3)',
    aurora: 'linear-gradient(135deg,#00d4ff,#00ffc8)', auroraLine: 'linear-gradient(90deg,#00d4ff,#00ffc8)',
    progress: 80,
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
  },
  {
    cat: 'DATABASE', icon: '🗄',
    accent: '#ff8c00', glow: 'rgba(255,140,0,.15)', iconBg: 'rgba(255,140,0,.12)', iconShadow: 'rgba(255,140,0,.3)',
    aurora: 'linear-gradient(135deg,#ff8c00,#ffd700)', auroraLine: 'linear-gradient(90deg,#ff8c00,#ffd700)',
    progress: 75,
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    cat: 'CLOUD & DEVOPS', icon: '☁',
    accent: '#ff2fa0', glow: 'rgba(255,47,160,.15)', iconBg: 'rgba(255,47,160,.12)', iconShadow: 'rgba(255,47,160,.3)',
    aurora: 'linear-gradient(135deg,#ff2fa0,#7b2fff)', auroraLine: 'linear-gradient(90deg,#ff2fa0,#7b2fff)',
    progress: 70,
    skills: [
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    ],
  },
  {
    cat: 'AI / ML', icon: '🧠',
    accent: '#39ff14', glow: 'rgba(57,255,20,.15)', iconBg: 'rgba(57,255,20,.12)', iconShadow: 'rgba(57,255,20,.3)',
    aurora: 'linear-gradient(135deg,#39ff14,#00ffc8)', auroraLine: 'linear-gradient(90deg,#39ff14,#00ffc8)',
    progress: 65,
    skills: [
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    ],
  },
  {
    cat: 'CORE CS', icon: '🔬',
    accent: '#ff6b35', glow: 'rgba(255,107,53,.15)', iconBg: 'rgba(255,107,53,.12)', iconShadow: 'rgba(255,107,53,.3)',
    aurora: 'linear-gradient(135deg,#ff6b35,#ff2fa0)', auroraLine: 'linear-gradient(90deg,#ff6b35,#ff2fa0)',
    progress: 95,
    skills: [
      { name: 'DSA', icon: null },
      { name: 'OOP', icon: null },
      { name: 'DBMS', icon: null },
    ],
  },
];

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    const colors = ['#00ffc8', '#7b2fff', '#00d4ff', '#ff2fa0', '#ff8c00', '#39ff14'];
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

/* ─── Skill Card ─── */
interface SkillDef {
  cat: string; icon: string; accent: string; glow: string;
  iconBg: string; iconShadow: string; aurora: string; auroraLine: string;
  progress: number; skills: { name: string; icon: string | null }[];
}

function SkillCard({ s, delay, visible }: { s: SkillDef; delay: number; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50, hovered: false });
  const [progVisible, setProgVisible] = useState(false);

  useEffect(() => {
    if (visible) setTimeout(() => setProgVisible(true), 400);
  }, [visible]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    setTilt({ x: (cy / r.height - 0.5) * -18, y: (cx / r.width - 0.5) * 18, mx: (cx / r.width) * 100, my: (cy / r.height) * 100, hovered: true });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0, mx: 50, my: 50, hovered: false });

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative', borderRadius: 20, padding: 'clamp(20px, 6vw, 32px)', cursor: 'pointer',
        background: 'rgba(255,255,255,.03)',
        height: '100%',
        minHeight: '340px',
        display: 'flex',
        flexDirection: 'column',
        transformStyle: 'preserve-3d',
        transform: tilt.hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
          : 'perspective(800px) rotateX(0) rotateY(0) scale(1)',
        transition: tilt.hovered ? 'transform .05s ease,box-shadow .3s ease' : 'transform .5s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease',
        boxShadow: tilt.hovered ? `0 25px 60px ${s.glow},0 0 0 1px ${s.accent}22` : 'none',
        opacity: visible ? 1 : 0,
        translate: visible ? 'none' : '0 60px',
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity,translate,transform,box-shadow',
      }}
    >
      {/* shimmer spotlight */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
        background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%,rgba(255,255,255,.04) 0%,transparent 60%)`,
      }} />

      {/* static border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20, padding: 1, pointerEvents: 'none',
        background: 'linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      }} />

      {/* aurora border on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20, padding: 1, pointerEvents: 'none',
        background: s.aurora,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
        opacity: tilt.hovered ? 1 : 0, transition: 'opacity .4s ease',
      }} />

      {/* glow behind card */}
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 21, background: s.glow,
        filter: 'blur(20px)', zIndex: -1, opacity: tilt.hovered ? 1 : 0, transition: 'opacity .4s ease',
      }} />

      {/* floating decorative dots */}
      {[1, 2, 3].map(j => (
        <div key={j} style={{
          position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
          width: 4 + j * 2, height: 4 + j * 2, background: s.accent, opacity: .15,
          top: `${20 + j * 25}%`, right: `${10 + j * 8}%`,
          boxShadow: `0 0 8px ${s.accent}`,
          animation: `floatDot${j} ${5 + j}s ease-in-out infinite`,
        }} />
      ))}

      {/* scan line */}
      {tilt.hovered && (
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1, borderRadius: 20,
          background: `linear-gradient(90deg,transparent,${s.accent},transparent)`,
          opacity: .5, animation: 'scanDown 2.5s linear infinite',
        }} />
      )}

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 22, position: 'relative', flexShrink: 0,
          background: s.iconBg, boxShadow: `0 0 20px ${s.iconShadow}`,
        }}>
          {s.icon}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 14,
            background: 'linear-gradient(135deg,rgba(255,255,255,.2),transparent)',
          }} />
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: s.accent, textTransform: 'uppercase', marginBottom: 4, fontWeight: 500 }}>
            {s.cat}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>
            <span style={{ fontWeight: 700, color: 'rgba(255,255,255,.6)', fontSize: 15 }}>{s.skills.length}</span> skills
          </div>
        </div>
      </div>

      {/* badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 28 }}>
        {s.skills.map(sk => (
          <div key={sk.name} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            borderRadius: 100, background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.08)',
            fontSize: 13, color: 'rgba(255,255,255,.8)', fontWeight: 500,
            transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(-4px) scale(1.05)';
              el.style.borderColor = s.accent + '66';
              el.style.boxShadow = `0 0 16px ${s.iconShadow}`;
              el.style.color = '#fff';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = '';
              el.style.borderColor = 'rgba(255,255,255,.08)';
              el.style.boxShadow = '';
              el.style.color = 'rgba(255,255,255,.8)';
            }}
          >
            {sk.icon
              ? <img src={sk.icon} style={{ width: 18, height: 18 }} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              : <span style={{ width: 18, height: 18, borderRadius: 4, background: s.iconBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{sk.name[0]}</span>
            }
            {sk.name}
          </div>
        ))}
      </div>

      {/* progress bar */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: 1 }}>
          <span>Proficiency</span>
          <span>{s.progress}%</span>
        </div>
        <div style={{ height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4, background: s.auroraLine,
            width: progVisible ? `${s.progress}%` : 0,
            transition: 'width 1.5s cubic-bezier(.16,1,.3,1)',
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Skills() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState<boolean[]>(Array(SKILLS.length).fill(false));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const cardObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          setCardVisible(prev => { const n = [...prev]; n[idx] = true; return n; });
          cardObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.skill-card-obs').forEach(el => cardObs.observe(el));
    return () => cardObs.disconnect();
  }, []);

  // inject keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      @keyframes scanDown { from { top: 0 } to { top: 100% } }
      @keyframes floatDot1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8px,-12px) scale(1.1)} }
      @keyframes floatDot2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-6px,10px) scale(.9)} }
      @keyframes floatDot3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(10px,6px) scale(1.05)} }
      
      .skills-section {
        padding: 96px 32px !important;
      }
      .skills-grid {
        gap: 24px !important;
        grid-auto-rows: 1fr !important;
      }
      
      @media(max-width:1024px) {
        .skills-section {
          padding: 88px 24px !important;
        }
        .skills-grid {
          gap: 20px !important;
        }
      }
      
      @media(max-width:768px) {
        .skills-section {
          padding: 80px 20px !important;
        }
        .skills-grid {
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
          gap: 16px !important;
        }
      }
      
      @media(max-width:640px) {
        .skills-section {
          padding: 64px 16px !important;
        }
        .skills-grid {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
          gap: 12px !important;
        }
      }
      
      @media(max-width:480px) {
        .skills-section {
          padding: 48px 12px !important;
        }
        .skills-grid {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="skills" className="skills-section"
      style={{ 
        position: 'relative', 
        padding: '96px 32px', 
        width: '100%',
        maxWidth: '1400px', 
        margin: '0 auto',
        boxSizing: 'border-box'
      }} 
      ref={sectionRef}
    >
      <ParticleCanvas />

      {/* Section Header */}
      <div
        className="mb-12"
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-cyan-500" />
          <span className="font-mono text-sm uppercase tracking-widest text-cyan-400/70">What I Build With</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">Skills.</h2>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        gap: 24, position: 'relative', zIndex: 1,
      }}
      className="skills-grid">
        {SKILLS.map((s, i) => (
          <div
            key={i}
            id={`skill-card-${i}`}
            className="h-full skill-card-obs"
            data-idx={i}
          >
            <SkillCard s={s} delay={i * 100} visible={!!cardVisible[i]} />
          </div>
        ))}
      </div>
    </section>
  );
}