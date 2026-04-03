import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: 'fas fa-code',           value: 200, suffix: '+', label: 'DSA Problems',  sub: 'LeetCode · Rating 1700', color: '#00d4ff', link: 'https://leetcode.com/u/03karthikeya03/' },
  { icon: 'fas fa-fire',           value: 10,  suffix: '+', label: 'Hackathons',    sub: 'National & College',      color: '#f5a623' },
  { icon: 'fas fa-project-diagram',value: 3,   suffix: '',  label: 'Live Projects', sub: 'Deployed & Running',      color: '#a78bfa' },
  { icon: 'fas fa-briefcase',      value: 3,   suffix: '',  label: 'Internships',   sub: 'AWS & Full Stack',        color: '#00ff88' },
];

const bioLines = [
  { label: 'stack',    val: 'MERN · Flask · AWS · TensorFlow'   },
  { label: 'rating',   val: 'LeetCode 1700 · CodeChef 3★'       },
  { label: 'focus',    val: 'Scalable Apps · AI/ML · Cloud'      },
  { label: 'status',   val: 'Open to full-time & freelance'      },
];

/* ─── CSS ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');

#about-root * { box-sizing: border-box; }
#about-root {
  position: relative; overflow: hidden;
  padding: 7rem 1.5rem 6rem;
  font-family: 'Syne', sans-serif;
}

/* ── Noise texture overlay ── */
#about-root::before {
  content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* ── Ambient orb ── */
#about-orb {
  position:absolute; width:700px; height:700px; border-radius:50%;
  background:radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%);
  top:-200px; right:-200px; pointer-events:none; z-index:0;
  filter:blur(60px);
  animation: aboutOrbPulse 8s ease-in-out infinite alternate;
}
@keyframes aboutOrbPulse {
  from { transform:scale(1) translate(0,0); }
  to   { transform:scale(1.2) translate(-30px, 30px); }
}

/* ── Inner ── */
.about-inner {
  position:relative; z-index:1;
  max-width:1200px; margin:0 auto;
  display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center;
}
@media(max-width:900px){ .about-inner{ grid-template-columns:1fr; gap:3rem; } }

/* ── LEFT ── */
.about-left { display:flex; flex-direction:column; gap:2rem; }

/* tag */
.about-tag {
  display:inline-flex; align-items:center; gap:0.5rem;
  font-family:'DM Mono',monospace; font-size:0.7rem; letter-spacing:0.2em;
  text-transform:uppercase; color:rgba(255,255,255,0.35);
  border-left:2px solid #00d4ff; padding-left:0.75rem;
}

/* heading */
.about-heading {
  font-family:'Syne',sans-serif;
  font-size:clamp(3rem,6vw,5rem);
  font-weight:800;
  line-height:0.95; letter-spacing:0.04em;
  background:linear-gradient(135deg,#ffffff 0%,#00d4ff 60%,#a78bfa 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}

/* bio paragraph */
.about-bio {
  font-size:1.05rem; line-height:1.85;
  color:rgba(255,255,255,0.5);
  border-left:1px solid rgba(255,255,255,0.08);
  padding-left:1.25rem;
}
.about-bio strong { color:rgba(255,255,255,0.85); font-weight:700; }

/* terminal block */
.about-terminal {
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.07);
  border-radius:1rem;
  overflow:hidden;
}
.term-bar {
  display:flex; align-items:center; gap:0.4rem;
  padding:0.6rem 1rem;
  background:rgba(255,255,255,0.04);
  border-bottom:1px solid rgba(255,255,255,0.06);
}
.term-dot { width:10px;height:10px;border-radius:50%; }
.term-body { padding:1rem 1.2rem; display:flex; flex-direction:column; gap:0.55rem; }
.term-row {
  display:flex; align-items:baseline; gap:0.75rem;
  font-family:'DM Mono',monospace; font-size:0.8rem;
}
.term-key { color:#a78bfa; flex-shrink:0; min-width:70px; }
.term-sep { color:rgba(255,255,255,0.2); }
.term-val { color:rgba(255,255,255,0.6); }

/* ── RIGHT: stat cards ── */
.about-right {
  display:grid; grid-template-columns:1fr 1fr; gap:1rem;
}

.stat-card-3d {
  position:relative; overflow:hidden;
  border-radius:1.25rem;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.07);
  padding:1.75rem 1.5rem;
  cursor:default;
  transition:transform 0.2s ease-out, box-shadow 0.3s;
  transform-style:preserve-3d;
  will-change:transform;
  text-decoration:none; display:block;
}
/* top accent line */
.stat-card-3d::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg, transparent, var(--cc), transparent);
  opacity:0; transition:opacity 0.4s;
}
.stat-card-3d:hover::before { opacity:1; }
/* corner glow */
.stat-card-3d::after {
  content:''; position:absolute; top:-30px; right:-30px;
  width:80px; height:80px; border-radius:50%;
  background:radial-gradient(circle, var(--cc), transparent 70%);
  opacity:0; transition:opacity 0.4s;
  filter:blur(15px);
}
.stat-card-3d:hover::after { opacity:0.4; }

.sc-icon {
  width:48px; height:48px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  font-size:1.15rem; margin-bottom:1.1rem;
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.08);
  transition:all 0.35s cubic-bezier(0.23,1,0.32,1);
  position:relative; z-index:1;
}
.stat-card-3d:hover .sc-icon {
  transform:scale(1.15) rotate(-6deg);
  box-shadow:0 0 24px var(--cc);
}

.sc-val {
  font-family:'Bebas Neue',sans-serif;
  font-size:3rem; line-height:1;
  letter-spacing:0.04em;
  background:linear-gradient(135deg, var(--cc), #fff 70%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
  position:relative; z-index:1;
}

.sc-counter-wrap { display:flex; align-items:baseline; gap:0.15rem; }
.sc-suffix { font-family:'Bebas Neue',sans-serif; font-size:2rem; color:var(--cc); opacity:0.7; }

.sc-label {
  font-size:0.95rem; font-weight:700;
  color:rgba(255,255,255,0.8);
  margin-top:0.25rem;
  position:relative; z-index:1;
}
.sc-sub {
  font-family:'DM Mono',monospace; font-size:0.65rem;
  letter-spacing:0.08em; color:rgba(255,255,255,0.3);
  margin-top:0.2rem;
  position:relative; z-index:1;
}

/* scanlines inside card */
.sc-scanlines {
  position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 4px);
  z-index:0;
}

/* ── Entrance animations ── */
.about-left  { animation: aFadeLeft  0.9s 0.1s cubic-bezier(0.23,1,0.32,1) both; }
.about-right { animation: aFadeRight 0.9s 0.2s cubic-bezier(0.23,1,0.32,1) both; }
@keyframes aFadeLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
@keyframes aFadeRight { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }
`;

/* ─── Counter ─── */
const Counter = ({ target, suffix, color }: { target: number; suffix: string; color: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const iv = setInterval(() => {
          cur += step;
          if (cur >= target) { setCount(target); clearInterval(iv); }
          else setCount(cur);
        }, 28);
      }
    }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="sc-counter-wrap" ref={ref}>
      <div className="sc-val">{count}</div>
      <div className="sc-suffix" style={{ color }}>{suffix}</div>
    </div>
  );
};

/* ─── 3D tilt card ─── */
const StatCard = ({ s }: { s: typeof stats[0] }) => {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.04)`;
    el.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,0.4), 0 0 30px ${s.color}22`;
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    el.style.boxShadow = '';
  };

  const Tag = (s.link ? 'a' : 'div') as any;
  const linkProps = s.link ? { href: s.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag
      ref={ref}
      className="stat-card-3d"
      style={{ '--cc': s.color } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...linkProps}
    >
      <div className="sc-scanlines" />
      <div className="sc-icon" style={{ color: s.color, borderColor: `${s.color}30` }}>
        <i className={s.icon} />
      </div>
      <Counter target={s.value} suffix={s.suffix} color={s.color} />
      <div className="sc-label">{s.label}</div>
      <div className="sc-sub">{s.sub}</div>
    </Tag>
  );
};

/* ─── About ─── */
const About = () => (
  <>
    <style>{css}</style>
    <section id="about-root">
      <div id="about-orb" />

      <div className="about-inner">
        {/* LEFT */}
        <div className="about-left">
          <div className="about-tag">
            <i className="fas fa-user" style={{ color: '#00d4ff', fontSize: '0.75rem' }} />
            Who I am
          </div>

          <h2 className="about-heading">About<br />Me.</h2>

          <p className="about-bio">
            Final-year <strong>B.Tech Computer Engineering</strong> student with hands-on experience in the <strong>MERN stack, AWS, and AI development</strong>. Strong DSA background with a LeetCode rating of <strong>1700</strong>. Completed internships in <strong>AWS Development</strong> and <strong>Full Stack MERN</strong>. Passionate about building scalable real-world applications and solving hard problems with elegant code.
          </p>

          {/* Terminal */}
          <div className="about-terminal">
            <div className="term-bar">
              <div className="term-dot" style={{ background: '#ff5f57' }} />
              <div className="term-dot" style={{ background: '#febc2e' }} />
              <div className="term-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="term-body">
              {bioLines.map((l, i) => (
                <div className="term-row" key={i}>
                  <span className="term-key">{l.label}</span>
                  <span className="term-sep">::</span>
                  <span className="term-val">{l.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — 2×2 stat cards */}
        <div className="about-right">
          {stats.map((s, i) => <StatCard key={i} s={s} />)}
        </div>
      </div>
    </section>
  </>
);

export default About;