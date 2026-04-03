import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    role: 'AI & Machine Learning Intern',
    company: 'Edunet Foundation',
    duration: 'May 2025 – June 2025',
    location: 'Andhra Pradesh, India',
    index: '01',
    color: '#00FFE5',
    glow: 'rgba(0,255,229,0.4)',
    points: [
      'Improved sentiment analysis model performance using Python-based NLP techniques, achieving 85% classification accuracy',
      'Processed and cleaned 100+ datasets of movie reviews and app feedback for model training pipelines',
    ],
    cert: 'https://karthikeya03.github.io/karthikeya03/certifications/internships/AIML%20INTERNSHIP.pdf',
    skills: ['Python', 'NLP', 'TensorFlow', 'Pandas'],
  },
  {
    role: 'AWS Development Intern',
    company: 'Technical Hub',
    duration: 'June 2025 – August 2025',
    location: 'Andhra Pradesh, India',
    index: '02',
    color: '#F5A623',
    glow: 'rgba(245,166,35,0.4)',
    points: [
      'Built and deployed production-grade application components on AWS, supporting 10+ capstone projects',
      'Optimized Amazon S3 storage using prefix-based indexing, improving data retrieval speed by 30% across 1,000+ files (10GB+)',
      'Worked with Version Control Systems and CI/CD pipelines to automate build and deployment workflows',
    ],
    cert: 'https://drive.google.com/file/d/1a8K2257qYf_wDmVMkobeFE1q1FmombTa/view',
    skills: ['AWS', 'S3', 'EC2', 'CI/CD'],
  },
  {
    role: 'MERN Development Intern',
    company: 'SmartBridge Educational Services',
    duration: 'Oct 2025 – Mar 2026',
    location: 'Andhra Pradesh, India',
    index: '03',
    color: '#BF5FFF',
    glow: 'rgba(191,95,255,0.4)',
    points: [
      'Delivered 12+ full-stack web applications independently, taking each from requirements to deployment',
      'Engineered end-to-end features covering user authentication, RESTful APIs, CRUD operations, and responsive UIs',
      'Designed MongoDB schemas handling 1,000+ records with indexing strategies for optimised query performance',
    ],
    cert: 'https://drive.google.com/file/d/17B8XmVxoObp9jntcIWldi9ljmPLPdUX3/view?usp=drive_link',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
];

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  .exp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

  .exp-wrap {
    position: relative;
    min-height: 100vh;
    padding: 6rem 2rem;
    font-family: 'Syne', sans-serif;
    overflow: hidden;
    background: #0a0a0a;
  }
  @media(max-width:1024px){
    .exp-wrap{\n      padding: 5rem 1.5rem;\n    }\n  }\n  @media(max-width:768px){\n    .exp-wrap{\n      padding: 4rem 1.25rem;\n    }\n  }\n  @media(max-width:640px){\n    .exp-wrap{\n      padding: 3rem 1rem;\n    }\n  }\n  @media(max-width:480px){\n    .exp-wrap{\n      padding: 2rem 0.75rem;\n      min-height: auto;\n    }\n  }

  .exp-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .exp-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    animation: orbFloat 12s ease-in-out infinite;
  }
  .exp-orb-1 { width: 500px; height: 500px; top: -150px; left: -100px; background: radial-gradient(circle, rgba(0,255,229,0.12) 0%, transparent 70%); animation-delay: 0s; }
  .exp-orb-2 { width: 400px; height: 400px; top: 40%; right: -100px; background: radial-gradient(circle, rgba(191,95,255,0.1) 0%, transparent 70%); animation-delay: -4s; }
  .exp-orb-3 { width: 300px; height: 300px; bottom: 10%; left: 20%; background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%); animation-delay: -8s; }

  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -40px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.97); }
  }

  .exp-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .exp-header {
    margin-bottom: 4rem;
  }

  .exp-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1rem;
  }
  .exp-eyebrow-line {
    width: 40px;
    height: 1px;
    background: #00FFE5;
    box-shadow: 0 0 8px #00FFE5;
  }
  .exp-eyebrow-text {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.25em;
    color: #00FFE5;
    text-transform: uppercase;
  }

  .exp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1;
    position: relative;
    display: inline-block;
    color: #fff;
    cursor: default;
    word-break: break-word;
  }
  .exp-title::before,
  .exp-title::after {
    content: attr(data-text);
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .exp-title::before {
    color: #00FFE5;
    animation: glitch1 5s infinite;
    clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%);
  }
  .exp-title::after {
    color: #BF5FFF;
    animation: glitch2 5s infinite;
    clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%);
  }
  @keyframes glitch1 {
    0%, 88%, 100% { transform: none; opacity: 0; }
    90% { transform: translate(-3px, 2px); opacity: 0.7; }
    92% { transform: translate(3px, -1px); opacity: 0.7; }
    94% { transform: none; opacity: 0; }
  }
  @keyframes glitch2 {
    0%, 88%, 100% { transform: none; opacity: 0; }
    91% { transform: translate(4px, -2px); opacity: 0.6; }
    93% { transform: translate(-2px, 1px); opacity: 0.6; }
    95% { transform: none; opacity: 0; }
  }

  /* ── Single-row square cards ── */
  .exp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* Force square via aspect-ratio */
  .exp-card-wrapper {
    aspect-ratio: 1 / 1;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .exp-card-wrapper.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .exp-card {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding: 1.6rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: border-color 0.4s;
    transform-style: preserve-3d;
    will-change: transform;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .exp-card:hover {
    border-color: rgba(255,255,255,0.15);
  }

  .exp-card-shimmer {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
    border-radius: inherit;
  }
  .exp-card:hover .exp-card-shimmer { opacity: 1; }

  .exp-card-glow {
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }
  .exp-card:hover .exp-card-glow { opacity: 1; }

  .exp-card-noise {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0.025;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* Card sections */
  .exp-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .exp-index {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    opacity: 0.35;
    color: #fff;
    margin-bottom: 0.3rem;
  }

  .exp-role {
    font-size: clamp(0.82rem, 1.1vw, 1rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 0.25rem;
  }
  .exp-company {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .exp-duration {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.38);
    text-align: right;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .exp-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 0.75rem 0;
    position: relative;
    overflow: hidden;
  }
  .exp-divider-line {
    position: absolute;
    left: -100%;
    top: 0;
    width: 60%;
    height: 100%;
    transition: left 0.6s ease;
  }
  .exp-card:hover .exp-divider-line { left: 150%; }

  .exp-points {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    overflow: hidden;
  }
  .exp-point {
    display: flex;
    gap: 0.5rem;
    font-size: clamp(0.68rem, 0.85vw, 0.78rem);
    color: rgba(255,255,255,0.58);
    line-height: 1.5;
    transition: color 0.3s;
  }
  .exp-card:hover .exp-point { color: rgba(255,255,255,0.78); }
  .exp-point-arrow {
    flex-shrink: 0;
    margin-top: 5px;
    width: 5px;
    height: 5px;
    border-right: 1.5px solid;
    border-top: 1.5px solid;
    transform: rotate(45deg);
    opacity: 0.6;
  }

  .exp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .exp-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .exp-skill {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    padding: 3px 8px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.05em;
    transition: all 0.3s;
  }
  .exp-card:hover .exp-skill {
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.65);
  }

  .exp-cert-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.05em;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  .exp-cert-btn:hover {
    transform: translateY(-1px);
  }
  .exp-cert-btn-icon {
    transition: transform 0.3s;
  }
  .exp-cert-btn:hover .exp-cert-btn-icon {
    transform: rotate(15deg) scale(1.2);
  }

  .exp-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transition: width 0.2s, height 0.2s, background 0.2s;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 900px) {
    .exp-grid {
      grid-template-columns: 1fr;
    }
    .exp-card-wrapper {
      aspect-ratio: auto;
      min-height: 360px;
    }
  }
`;

export default function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  /* ── Particle Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    const COLORS = ['#00FFE5', '#BF5FFF', '#F5A623'];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const hex = COLORS[i % 3];
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / 110) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Scroll Reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    wrapperRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 0.15}s`;
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, []);

  /* ── 3D Tilt ── */
  useEffect(() => {
    const handlers = cardRefs.current.map((card) => {
      if (!card) return null;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(10px)`;
        const shimmer = card.querySelector('.exp-card-shimmer') as HTMLElement;
        if (shimmer) shimmer.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
      };
      const onLeave = () => {
        card.style.transform = `perspective(900px) rotateX(0) rotateY(0) translateZ(0)`;
        card.style.transition = 'transform 0.5s ease, border-color 0.4s';
      };
      const onEnter = () => { card.style.transition = 'border-color 0.4s'; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mouseenter', onEnter);
      return { card, onMove, onLeave, onEnter };
    });
    return () => handlers.forEach((h) => {
      if (!h) return;
      h.card.removeEventListener('mousemove', h.onMove);
      h.card.removeEventListener('mouseleave', h.onLeave);
      h.card.removeEventListener('mouseenter', h.onEnter);
    });
  }, []);

  /* ── Custom Cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div ref={cursorRef} className="exp-cursor"
        style={{ background: hoveredCard !== null ? experiences[hoveredCard].color : 'rgba(255,255,255,0.5)', opacity: 0.6, filter: 'blur(4px)' }}
      />

      <section className="exp-wrap">
        <div className="exp-orb exp-orb-1" />
        <div className="exp-orb exp-orb-2" />
        <div className="exp-orb exp-orb-3" />
        <canvas ref={canvasRef} className="exp-canvas" style={{ width: '100%', height: '100%' }} />

        <div className="exp-inner">
          <div className="exp-header">
            <div className="exp-eyebrow">
              <div className="exp-eyebrow-line" />
              <span className="exp-eyebrow-text">Career Journey</span>
            </div>
            <h2 className="exp-title" data-text="Experience">Experience</h2>
          </div>

          {/* Single-row 3-column square grid */}
          <div className="exp-grid">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-card-wrapper"
                ref={(el) => (wrapperRefs.current[i] = el)}
              >
                <div
                  className="exp-card"
                  ref={(el) => (cardRefs.current[i] = el)}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glow border */}
                  <div className="exp-card-glow"
                    style={{ background: `linear-gradient(135deg, ${exp.color}22, transparent 50%, ${exp.color}11)`, border: `1px solid ${exp.color}33` }}
                  />
                  <div className="exp-card-shimmer" />
                  <div className="exp-card-noise" />
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: `linear-gradient(90deg, transparent, ${exp.color}88, transparent)` }} />

                  {/* HEAD */}
                  <div className="exp-card-head">
                    <div>
                      <div className="exp-index">{exp.index}</div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-company" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                    <div className="exp-duration">{exp.duration}</div>
                  </div>

                  {/* DIVIDER */}
                  <div className="exp-divider">
                    <div className="exp-divider-line"
                      style={{ background: `linear-gradient(90deg, transparent, ${exp.color}66, transparent)` }}
                    />
                  </div>

                  {/* POINTS */}
                  <ul className="exp-points">
                    {exp.points.map((point, j) => (
                      <li key={j} className="exp-point">
                        <span className="exp-point-arrow" style={{ borderColor: exp.color }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* FOOTER */}
                  <div className="exp-footer">
                    <div className="exp-skills">
                      {exp.skills.map((s, k) => (
                        <span
                          key={k}
                          className="exp-skill"
                          onMouseEnter={(e) => {
                            const t = e.currentTarget as HTMLElement;
                            t.style.borderColor = `${exp.color}55`;
                            t.style.color = exp.color;
                            t.style.background = `${exp.color}0D`;
                          }}
                          onMouseLeave={(e) => {
                            const t = e.currentTarget as HTMLElement;
                            t.style.borderColor = ''; t.style.color = ''; t.style.background = '';
                          }}
                        >{s}</span>
                      ))}
                    </div>
                    <a
                      href={exp.cert}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-cert-btn"
                      style={{ color: exp.color, borderColor: `${exp.color}33` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${exp.color}18`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${exp.glow}`;
                        e.currentTarget.style.borderColor = `${exp.color}77`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.borderColor = `${exp.color}33`;
                      }}
                    >
                      <svg className="exp-cert-btn-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                      </svg>
                      View Cert
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}