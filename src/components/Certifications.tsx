import { useEffect, useRef, useState, useCallback } from 'react';

const certs = [
  {
    name: 'AWS Developer Associate', issuer: 'Amazon Web Services', issuerShort: 'AWS',
    accent: '#ff9900', glow: 'rgba(255,153,0,.10)', iconBg: 'rgba(255,153,0,.07)',
    icon: '☁', year: '2024',
    link: 'https://drive.google.com/file/d/1rRlGNzUDhklVy6Tac4tVKAYYvXyaotRW/view?usp=drive_link',
  },
  {
    name: 'IT Specialist — HTML & CSS', issuer: 'Certiport / Pearson', issuerShort: 'Certiport',
    accent: '#00ffe5', glow: 'rgba(0,255,229,.09)', iconBg: 'rgba(0,255,229,.06)',
    icon: '🌐', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/HTML%20and%20CSS.pdf',
  },
  {
    name: 'IT Specialist — Python', issuer: 'Certiport / Pearson', issuerShort: 'Certiport',
    accent: '#ffd43b', glow: 'rgba(255,212,59,.09)', iconBg: 'rgba(55,118,171,.07)',
    icon: '🐍', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/Python%20certificate.pdf',
  },
  {
    name: 'IT Specialist — Java', issuer: 'Certiport / Pearson', issuerShort: 'Certiport',
    accent: '#f89820', glow: 'rgba(248,152,32,.10)', iconBg: 'rgba(248,152,32,.07)',
    icon: '☕', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/Java%20IT%20specialist.pdf',
  },
  {
    name: 'CCNA — Intro to Networks', issuer: 'Cisco Networking Academy', issuerShort: 'Cisco',
    accent: '#1ba0d7', glow: 'rgba(27,160,215,.10)', iconBg: 'rgba(27,160,215,.07)',
    icon: '📡', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/CCNA.pdf',
  },
  {
    name: 'Java Programming Certificate', issuer: 'Oracle Academy', issuerShort: 'Oracle',
    accent: '#c74634', glow: 'rgba(199,70,52,.10)', iconBg: 'rgba(199,70,52,.07)',
    icon: '📜', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/java%20programming.pdf',
  },
];

function CertCard({ c }: { c: typeof certs[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (flipped) return;
    const r = cardRef.current!.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    setPos({
      rx: (cy / r.height - 0.5) * -6,
      ry: (cx / r.width - 0.5) * 6,
    });
  }, [flipped]);

  const CARD_H = 240;

  return (
    <div style={{ perspective: 1000, height: CARD_H }}>
      <div
        ref={cardRef}
        onClick={() => { setFlipped(f => !f); setPos({ rx: 0, ry: 0 }); }}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPos({ rx: 0, ry: 0 }); }}
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d', cursor: 'pointer',
          transform: flipped
            ? 'rotateY(180deg)'
            : `perspective(900px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg) translateY(${hov ? -3 : 0}px)`,
          transition: flipped
            ? 'transform .6s cubic-bezier(.34,1.1,.64,1)'
            : hov
              ? 'transform .08s ease'
              : 'transform .45s cubic-bezier(.34,1.2,.64,1)',
          boxShadow: hov && !flipped
            ? `0 16px 40px ${c.glow}, 0 0 0 1px ${c.accent}22`
            : '0 4px 20px rgba(0,0,0,.25)',
        }}
      >
        {/* ── FRONT ── */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, padding: '22px 20px',
          background: 'rgba(255,255,255,.025)',
          border: `1px solid ${hov ? c.accent + '33' : 'rgba(255,255,255,.07)'}`,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          display: 'flex', flexDirection: 'column',
          transition: 'border-color .3s',
        }}>
          {/* Subtle radial highlight on hover — no rainbow */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 30% 20%, ${c.accent}0A 0%, transparent 65%)`,
            opacity: hov ? 1 : 0,
            transition: 'opacity .35s',
          }} />

          {/* Verified pill */}
          <div style={{
            position: 'absolute', top: 13, right: 13, zIndex: 2,
            fontSize: 8, letterSpacing: 2, fontWeight: 700,
            fontFamily: 'ui-monospace, monospace',
            color: c.accent, background: c.iconBg,
            border: `1px solid ${c.accent}30`,
            padding: '3px 8px', borderRadius: 100,
          }}>✓ VERIFIED</div>

          {/* Icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 11, marginBottom: 14,
            background: c.iconBg,
            border: `1px solid ${c.accent}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, position: 'relative', zIndex: 2,
            transition: 'transform .3s ease',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
          }}>
            {c.icon}
          </div>

          <div style={{ zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '0.85rem', fontWeight: 700,
              color: 'rgba(255,255,255,.88)', marginBottom: 6,
              lineHeight: 1.4, fontFamily: 'Syne, sans-serif', paddingRight: 44,
            }}>{c.name}</h3>
            <p style={{
              fontSize: '0.68rem', color: `${c.accent}88`,
              letterSpacing: 1.5, textTransform: 'uppercase',
              fontFamily: 'ui-monospace, monospace', flex: 1,
            }}>{c.issuerShort}</p>
          </div>

          <div style={{
            fontSize: 8, color: 'rgba(255,255,255,.18)',
            letterSpacing: 2, fontFamily: 'ui-monospace, monospace', zIndex: 2,
          }}>
            TAP TO OPEN ↺
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, padding: '22px 20px',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          border: `1px solid ${c.accent}30`,
          background: `rgba(10,10,12,.97)`,
          boxShadow: `0 20px 50px ${c.glow}`,
        }}>
          {/* Subtle top accent */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: `linear-gradient(90deg, transparent, ${c.accent}55, transparent)`,
            pointerEvents: 'none',
          }} />

          <div>
            <div style={{
              fontSize: 8, letterSpacing: 3.5, color: `${c.accent}66`,
              textTransform: 'uppercase', marginBottom: 6,
              fontFamily: 'ui-monospace, monospace',
            }}>Issued by</div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: '#fff',
              fontFamily: 'Syne, sans-serif', marginBottom: 4,
            }}>{c.issuer}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.28)' }}>Credential verified ✓</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.38)', lineHeight: 1.55 }}>{c.name}</div>
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 8,
                background: c.iconBg,
                border: `1px solid ${c.accent}40`,
                color: c.accent, fontSize: 9.5, fontWeight: 700,
                letterSpacing: 1.5, textDecoration: 'none',
                fontFamily: 'ui-monospace, monospace',
                alignSelf: 'flex-start',
                transition: 'background .2s, box-shadow .2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${c.accent}18`;
                el.style.boxShadow = `0 0 20px ${c.glow}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = c.iconBg;
                el.style.boxShadow = 'none';
              }}
            >
              ↗ VIEW CERTIFICATE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [cardVis, setCardVis] = useState<boolean[]>(Array(certs.length).fill(false));

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeaderVis(true); o.disconnect(); }
    }, { threshold: 0.06 });
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
    document.querySelectorAll('.cert-obs').forEach(el => co.observe(el));
    return () => co.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById('cert-styles')) return;
    const s = document.createElement('style');
    s.id = 'cert-styles';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      @keyframes certBgFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-22px)} }
    `;
    document.head.appendChild(s);
    return () => { document.getElementById('cert-styles')?.remove(); };
  }, []);

  return (
    <section id="certifications" ref={sectionRef}
      style={{ position: 'relative', padding: '90px 40px', maxWidth: 1400, margin: '0 auto' }}>

      {/* Background orbs — very subtle */}
      <div style={{ position: 'absolute', top: -60, right: '12%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,229,.03) 0%,transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', animation: 'certBgFloat 14s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: -40, left: '5%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,153,0,.03) 0%,transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', animation: 'certBgFloat 11s ease-in-out infinite reverse' }} />

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '30px 30px', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)' }} />

      {/* Header */}
      <div style={{ marginBottom: 56, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? 'none' : 'translateY(12px)',
          transition: 'all .7s cubic-bezier(.16,1,.3,1)',
        }}>
          <div style={{ width: 28, height: 1, background: '#00ffe5', boxShadow: '0 0 6px #00ffe5' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00ffe5', opacity: .6, fontWeight: 500, fontFamily: 'ui-monospace,monospace' }}>Credentials</span>
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1, margin: 0, padding: 0,
          fontSize: 'clamp(2.2rem, 5vw, 4.8rem)',
          background: 'linear-gradient(100deg,#00ffe5 0%,#fffbe6 45%,#ff9900 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? 'none' : 'translateY(28px)',
          transition: 'all .9s cubic-bezier(.16,1,.3,1) .1s',
        }}>CERTIFICATIONS.</h2>
        <p style={{
          marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,.28)',
          maxWidth: 440, lineHeight: 1.7, fontWeight: 300,
          opacity: headerVis ? 1 : 0, transition: 'opacity .8s .3s',
        }}>
          Industry credentials from AWS, Cisco, Oracle and more.{' '}
          <span style={{ color: 'rgba(255,255,255,.16)', fontSize: 11.5 }}>Tap any card to reveal.</span>
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18, position: 'relative', zIndex: 1 }}>
        {certs.map((c, i) => (
          <div key={c.name} className="cert-obs" data-idx={i} style={{
            opacity: cardVis[i] ? 1 : 0,
            transform: cardVis[i] ? 'none' : 'translateY(32px)',
            transition: `opacity .55s ${i * 75}ms cubic-bezier(.16,1,.3,1), transform .55s ${i * 75}ms cubic-bezier(.16,1,.3,1)`,
          }}>
            <CertCard c={c} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ marginTop: 52, display: 'flex', alignItems: 'center', gap: 12, opacity: .2 }}>
        <div style={{ flex: 1, height: .5, background: 'rgba(255,255,255,.15)' }} />
        <span style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,.4)', fontFamily: 'ui-monospace,monospace', whiteSpace: 'nowrap' }}>ALL CERTIFICATES VERIFIED</span>
        <div style={{ flex: 1, height: .5, background: 'rgba(255,255,255,.15)' }} />
      </div>
    </section>
  );
}