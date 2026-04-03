import { useEffect, useRef, useState, useCallback } from 'react';

const achievements = [
  {
    icon: '🏆', accent: '#ffd700', glow: 'rgba(255,215,0,.2)', iconBg: 'rgba(255,215,0,.1)',
    title: 'LeetCode Rating 1700', desc: 'Solved 200+ DSA problems, ranked in the Top 23.17% globally',
    link: 'https://leetcode.com/u/03karthikeya03/', linkLabel: 'View Profile',
    stat: 'TOP 23%', rank: '1700', rankLabel: 'Rating',
  },
  {
    icon: '🥇', accent: '#ffe066', glow: 'rgba(255,224,102,.18)', iconBg: 'rgba(255,224,102,.1)',
    title: '1st Place — Project Space', desc: 'College-wide competition with 120 teams and 700 participants',
    stat: '1ST PLACE', rank: '120', rankLabel: 'Teams',
  },
  {
    icon: '⭐', accent: '#00ffe5', glow: 'rgba(0,255,229,.16)', iconBg: 'rgba(0,255,229,.08)',
    title: 'Top 15 — GFG Cloud Hackathon', desc: 'Geeks for Geeks Cloud Hackathon powered by Vultr',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/internships/Vultr%20Top%2015%20Teams.pdf',
    linkLabel: 'View Certificate', stat: 'TOP 15', rank: '15', rankLabel: 'Rank',
  },
  {
    icon: '💻', accent: '#a78bfa', glow: 'rgba(167,139,250,.16)', iconBg: 'rgba(167,139,250,.08)',
    title: 'CodeChef Rating 1690', desc: 'Ranked 216 in Starters 178 globally',
    link: 'https://www.codechef.com/users/karthikeya_03', linkLabel: 'View Profile',
    stat: 'RANK 216', rank: '1690', rankLabel: 'Rating',
  },
  {
    icon: '🚀', accent: '#fb923c', glow: 'rgba(251,146,60,.16)', iconBg: 'rgba(251,146,60,.09)',
    title: 'Smart India Hackathon', desc: "Participant in India's largest hackathon organized by the Government of India",
    stat: 'NATIONAL', rank: 'SIH', rankLabel: 'Govt.',
  },
  {
    icon: '💼', accent: '#38bdf8', glow: 'rgba(56,189,248,.16)', iconBg: 'rgba(56,189,248,.09)',
    title: 'JP Morgan Code for Good', desc: "Selected for JP Morgan Chase & Co.'s prestigious coding competition for social impact",
    stat: 'SELECTED', rank: 'JP', rankLabel: 'Morgan',
  },
];

/* ─── Animated counter ─── */
function Counter({ target, run }: { target: string; run: boolean }) {
  const [val, setVal] = useState('0');
  useEffect(() => {
    if (!run) return;
    const n = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(n)) { setVal(target); return; }
    let start = 0; let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * n).toString());
      if (p < 1) raf = requestAnimationFrame(step); else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{val}</>;
}

/* ─── Spinning conic ring border ─── */
function SpinRing({ accent, active }: { accent: string; active: boolean }) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  useEffect(() => {
    if (!active) { cancelAnimationFrame(rafRef.current); lastRef.current = 0; return; }
    const spin = (ts: number) => {
      const delta = ts - (lastRef.current || ts);
      lastRef.current = ts;
      setAngle(a => (a + delta * 0.13) % 360);
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <div style={{
      position: 'absolute', inset: -1, borderRadius: 21, zIndex: 0, pointerEvents: 'none',
      background: active
        ? `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, ${accent} 50deg, transparent 100deg, transparent 260deg, ${accent} 310deg, transparent 360deg)`
        : 'none',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      padding: 1.5,
      opacity: active ? 1 : 0, transition: 'opacity .3s',
    }} />
  );
}

/* ─── Single card ─── */
function AchCard({ a, visible }: { a: typeof achievements[0]; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ mx: 50, my: 50, rx: 0, ry: 0 });
  const [counted, setCounted] = useState(false);

  useEffect(() => { if (visible && !counted) setTimeout(() => setCounted(true), 300); }, [visible]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    setPos({ mx: (cx / r.width) * 100, my: (cy / r.height) * 100, rx: (cy / r.height - .5) * -13, ry: (cx / r.width - .5) * 13 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPos({ mx: 50, my: 50, rx: 0, ry: 0 }); }}
      style={{
        position: 'relative', borderRadius: 20, padding: '26px 24px',
        background: hov ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.025)',
        height: '100%', display: 'flex', flexDirection: 'column',
        transform: hov
          ? `perspective(900px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg) scale(1.02) translateZ(6px)`
          : 'perspective(900px) rotateX(0) rotateY(0) scale(1)',
        transition: hov
          ? 'transform .07s, background .3s, box-shadow .3s'
          : 'transform .55s cubic-bezier(.34,1.4,.64,1), background .3s, box-shadow .3s',
        boxShadow: hov ? `0 22px 55px ${a.glow}, 0 0 0 1px ${a.accent}15` : '0 1px 0 rgba(255,255,255,.05)',
      }}
    >
      <SpinRing accent={a.accent} active={hov} />

      {/* static subtle border */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 20, padding: 1, pointerEvents: 'none', zIndex: 1,
        background: hov ? 'transparent' : 'linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.02))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude', transition: 'background .3s' }} />

      {/* spotlight */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', zIndex: 1,
        background: `radial-gradient(circle at ${pos.mx}% ${pos.my}%, rgba(255,255,255,.055) 0%, transparent 55%)`,
        opacity: hov ? 1 : 0, transition: 'opacity .25s' }} />

      {/* bloom */}
      <div style={{ position: 'absolute', inset: -2, borderRadius: 22, background: a.glow, filter: 'blur(30px)', zIndex: -1, opacity: hov ? .85 : 0, transition: 'opacity .4s' }} />

      {/* stat badge */}
      <div style={{
        position: 'absolute', top: 15, right: 15, zIndex: 2,
        fontSize: 8.5, letterSpacing: 3, fontWeight: 700, fontFamily: 'ui-monospace,monospace',
        color: a.accent, background: a.iconBg, border: `1px solid ${a.accent}44`,
        padding: '4px 10px', borderRadius: 100,
        boxShadow: hov ? `0 0 16px ${a.accent}55` : 'none', transition: 'box-shadow .3s',
      }}>{a.stat}</div>

      {/* icon with expanding ring */}
      <div style={{ position: 'relative', width: 52, height: 52, marginBottom: 16, zIndex: 2 }}>
        <div style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          border: `1.5px solid ${a.accent}99`,
          animation: hov ? 'achPulseRing 1.7s ease-out infinite' : 'none',
          opacity: hov ? 1 : 0,
        }} />
        <div style={{
          width: 52, height: 52, borderRadius: 14, position: 'relative',
          background: a.iconBg, border: `1px solid ${a.accent}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23,
          boxShadow: hov ? `0 0 26px ${a.accent}55` : 'none',
          transform: hov ? 'scale(1.08) rotate(-5deg)' : 'none',
          transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s',
        }}>
          {a.icon}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: 'linear-gradient(135deg,rgba(255,255,255,.16),transparent)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* rank counter chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'baseline', gap: 4, marginBottom: 12, zIndex: 2,
        padding: '3px 10px', borderRadius: 8, background: a.iconBg, border: `1px solid ${a.accent}22`, width: 'fit-content',
      }}>
        <span style={{ fontSize: 19, fontWeight: 800, color: a.accent, fontFamily: 'ui-monospace,monospace', lineHeight: 1 }}>
          <Counter target={a.rank} run={counted} />
        </span>
        <span style={{ fontSize: 8.5, color: `${a.accent}77`, letterSpacing: 2, textTransform: 'uppercase' as const }}>{a.rankLabel}</span>
      </div>

      <h3 style={{
        fontSize: '0.93rem', fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,.88)',
        marginBottom: 8, paddingRight: 42, lineHeight: 1.4,
        fontFamily: 'Syne,sans-serif', transition: 'color .25s', zIndex: 2,
      }}>{a.title}</h3>

      <p style={{
        fontSize: '0.79rem', lineHeight: 1.65, zIndex: 2, flex: 1,
        color: hov ? 'rgba(255,255,255,.56)' : 'rgba(255,255,255,.36)',
        marginBottom: a.link ? 18 : 0, transition: 'color .25s',
      }}>{a.desc}</p>

      {a.link && (
        <a href={a.link} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5,
            color: `${a.accent}aa`, textDecoration: 'none',
            fontFamily: 'ui-monospace,monospace', letterSpacing: 1.5,
            transition: 'color .2s, gap .2s', zIndex: 2,
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = a.accent; el.style.gap = '9px'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = `${a.accent}aa`; el.style.gap = '6px'; }}
        >
          <i className="fas fa-external-link-alt" style={{ fontSize: 9 }} />
          {a.linkLabel}
        </a>
      )}
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [cardVis, setCardVis] = useState<boolean[]>(Array(achievements.length).fill(false));

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVis(true); o.disconnect(); } }, { threshold: 0.06 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = Number((e.target as HTMLElement).dataset.idx);
          setCardVis(prev => { const n = [...prev]; n[i] = true; return n; });
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.ach2-obs').forEach(el => co.observe(el));
    return () => co.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById('ach2-styles')) return;
    const s = document.createElement('style');
    s.id = 'ach2-styles';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      @keyframes achPulseRing { 0% { transform:scale(1); opacity:.7; } 100% { transform:scale(2.4); opacity:0; } }
      @keyframes achBgFloat   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-26px)} }
    `;
    document.head.appendChild(s);
    return () => { document.getElementById('ach2-styles')?.remove(); };
  }, []);

  return (
    <section id="achievements" ref={sectionRef}
      style={{ position: 'relative', padding: '90px 40px', maxWidth: 1400, margin: '0 auto' }}>

      <div style={{ position: 'absolute', top: -60, left: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,215,0,.05) 0%,transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', animation: 'achBgFloat 13s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: -40, right: '6%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,229,.04) 0%,transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', animation: 'achBgFloat 17s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize: '30px 30px', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)' }} />

      {/* Header */}
      <div style={{ marginBottom: 60, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, opacity: headerVis ? 1 : 0, transform: headerVis ? 'none' : 'translateY(12px)', transition: 'all .7s cubic-bezier(.16,1,.3,1)' }}>
          <div style={{ width: 28, height: 1, background: '#ffd700', boxShadow: '0 0 8px #ffd700' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#ffd700', opacity: .7, fontWeight: 500, fontFamily: 'ui-monospace,monospace' }}>Recognition</span>
        </div>
        <h2 style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 800, lineHeight: 1, margin: 0, padding: 0,
          fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
          background: 'linear-gradient(100deg,#ffd700 0%,#fffbe6 45%,#00ffe5 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: headerVis ? 1 : 0, transform: headerVis ? 'none' : 'translateY(28px)',
          transition: 'all .9s cubic-bezier(.16,1,.3,1) .1s',
        }}>ACHIEVEMENTS.</h2>
        <p style={{ marginTop: 14, fontSize: 13.5, color: 'rgba(255,255,255,.33)', maxWidth: 460, lineHeight: 1.7, fontWeight: 300, opacity: headerVis ? 1 : 0, transition: 'opacity .8s .3s' }}>
          Milestones, rankings and wins across competitive programming and hackathons.
        </p>
      </div>

      {/* Grid — gridAutoRows: 1fr makes every row the same height */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gridAutoRows: '1fr', gap: 20, position: 'relative', zIndex: 1 }}>
        {achievements.map((a, i) => (
          <div key={a.title} className="ach2-obs" data-idx={i} style={{
            opacity: cardVis[i] ? 1 : 0,
            transform: cardVis[i] ? 'none' : 'translateY(44px) scale(.97)',
            transition: `opacity .6s ${i * 85}ms cubic-bezier(.16,1,.3,1), transform .6s ${i * 85}ms cubic-bezier(.16,1,.3,1)`,
          }}>
            <AchCard a={a} visible={cardVis[i]} />
          </div>
        ))}
      </div>
    </section>
  );
}