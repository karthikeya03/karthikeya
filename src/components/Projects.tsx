import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'Leaf Analyzer',
    tag: 'AI/ML',
    tagColor: '#00d4ff',
    desc: 'AI-powered plant disease detection with 94.8% accuracy trained on 54,000+ images. Flask web app with image upload & camera capture.',
    tech: [
      { name: 'Python',     icon: 'devicon-python-plain',     color: '#3572A5' },
      { name: 'TensorFlow', icon: 'devicon-tensorflow-original', color: '#FF6F00' },
      { name: 'Flask',      icon: 'devicon-flask-original',   color: '#ffffff' },
    ],
    github: 'https://github.com/karthikeya03/Leaf-analyzer',
  },
  {
    title: 'Late Comers',
    tag: 'Full Stack',
    tagColor: '#f5a623',
    desc: 'Real-time student monitoring for 2,000+ students with parent alerts, barcode attendance & AWS integration.',
    tech: [
      { name: 'React',   icon: 'devicon-react-original',              color: '#61DAFB' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain',                color: '#339933' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain',               color: '#47A248' },
      { name: 'AWS',     icon: 'devicon-amazonwebservices-original',  color: '#FF9900' },
    ],
    live: 'https://adityauniversity.in/latecomers/dashboard',
  },
  {
    title: 'Kodikoota',
    tag: 'Full Stack',
    tagColor: '#f5a623',
    desc: 'Telugu news platform with AWS load balancing, Route 53 DNS & Sanity CMS — 200+ articles, 3,000+ monthly views.',
    tech: [
      { name: 'Next.js', icon: 'devicon-nextjs-plain',  color: '#ffffff' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain',  color: '#339933' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain', color: '#47A248' },
    ],
    live: 'https://www.kodikoota.com/',
  },
  {
    title: 'Flowbit AI Agent',
    tag: 'AI/ML',
    tagColor: '#00d4ff',
    desc: 'Memory-driven AI agent for invoice learning and processing with intelligent pattern recognition.',
    tech: [{ name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' }],
    github: 'https://github.com/karthikeya03/Flowbit-AI-Agent',
  },
  {
    title: 'BookNest Haven',
    tag: 'Full Stack',
    tagColor: '#f5a623',
    desc: 'Full-stack book management and discovery application with clean UI and robust backend.',
    tech: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' },
      { name: 'React',      icon: 'devicon-react-original',   color: '#61DAFB' },
    ],
    github: 'https://github.com/karthikeya03/booknest-haven',
  },
  {
    title: 'DS Visualizer',
    tag: 'Frontend',
    tagColor: '#a78bfa',
    desc: 'Interactive data structures visualizer helping students understand algorithms step-by-step.',
    tech: [{ name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' }],
    github: 'https://github.com/karthikeya03/DS-Visualizer',
  },
  {
    title: 'Java Banking',
    tag: 'Java',
    tagColor: '#00ff88',
    desc: 'Full-featured banking system with OOP principles — account management, transactions, secure operations.',
    tech: [{ name: 'Java', icon: 'devicon-java-plain', color: '#ED8B00' }],
    github: 'https://github.com/karthikeya03/Java-Banking-System',
  },
  {
    title: 'BudgetBudd',
    tag: 'Full Stack',
    tagColor: '#f5a623',
    desc: 'Personal budget tracker with expense categorization and financial insights dashboard.',
    tech: [{ name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' }],
    github: 'https://github.com/karthikeya03/BudgetBudd',
  },
];

const filters = ['All', 'AI/ML', 'Full Stack', 'Frontend', 'Java'];

const tagColors: Record<string, string> = {
  'AI/ML':      '#00d4ff',
  'Full Stack': '#f5a623',
  'Frontend':   '#a78bfa',
  'Java':       '#00ff88',
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');

#projects * { box-sizing:border-box; }
#projects {
  position:relative; overflow:hidden;
  padding:7rem 2rem 6rem;
  font-family:'Syne',sans-serif;
}
@media(max-width:1024px){
  #projects{
    padding: 6rem 1.5rem 5rem;
  }
}
@media(max-width:768px){
  #projects{
    padding: 5rem 1.25rem 4rem;
  }
}
@media(max-width:640px){
  #projects{
    padding: 3.5rem 1rem 3rem;
  }
}
@media(max-width:480px){
  #projects{
    padding: 2.5rem 0.75rem 2rem;
  }
}

/* ── ambient ── */
#projects::before {
  content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(ellipse 60% 40% at 10% 20%, rgba(0,212,255,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,166,35,0.05) 0%, transparent 60%);
}

.proj-inner {
  position:relative;
  z-index:1;
  width: 100%;
  max-width:1300px;
  margin:0 auto;
  box-sizing: border-box;
}

/* ── header ── */
.proj-header {
  display:flex; align-items:flex-end; justify-content:space-between;
  margin-bottom:3rem; flex-wrap:wrap; gap:1rem;
}
.proj-tag {
  font-family:'DM Mono',monospace; font-size:0.7rem;
  letter-spacing:0.2em; text-transform:uppercase;
  color:rgba(255,255,255,0.35); border-left:2px solid #f5a623;
  padding-left:0.75rem; margin-bottom:0.6rem;
}
.proj-heading {
  font-family:'Syne',sans-serif;
  font-size:clamp(2rem,6vw,5rem); font-weight:800; line-height:0.95;
  letter-spacing:0.04em;
  background:linear-gradient(135deg,#ffffff,#f5a623 60%,#ff6b35 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  margin:0;
  word-break: break-word;
}
@media(max-width:640px){
  .proj-heading{
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
}

/* ── filter pills ── */
.proj-filters { display:flex; flex-wrap:wrap; gap:0.6rem; }
.pf-btn {
  position:relative; overflow:hidden;
  padding:0.5rem 1.25rem; border-radius:2rem;
  font-family:'DM Mono',monospace; font-size:0.72rem;
  letter-spacing:0.1em; text-transform:uppercase;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.03);
  color:rgba(255,255,255,0.4);
  cursor:pointer;
  transition:all 0.3s cubic-bezier(0.23,1,0.32,1);
}
.pf-btn:hover { color:rgba(255,255,255,0.75); border-color:rgba(255,255,255,0.25); }
.pf-btn.active {
  background:rgba(245,166,35,0.12);
  border-color:#f5a623;
  color:#f5a623;
  box-shadow:0 0 20px rgba(245,166,35,0.2);
}
.pf-btn.active[data-tag="AI/ML"]      { background:rgba(0,212,255,0.1);   border-color:#00d4ff; color:#00d4ff;  box-shadow:0 0 20px rgba(0,212,255,0.15);  }
.pf-btn.active[data-tag="Frontend"]   { background:rgba(167,139,250,0.1); border-color:#a78bfa; color:#a78bfa; box-shadow:0 0 20px rgba(167,139,250,0.15); }
.pf-btn.active[data-tag="Java"]       { background:rgba(0,255,136,0.1);   border-color:#00ff88; color:#00ff88;  box-shadow:0 0 20px rgba(0,255,136,0.15);  }

/* ── grid ── */
.proj-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(320px,1fr));
  gap:1.25rem;
}
@media(max-width:1024px){
  .proj-grid{
    grid-template-columns:repeat(auto-fill, minmax(280px,1fr));
    gap: 1rem;
  }
}
@media(max-width:768px){
  .proj-grid{
    grid-template-columns:repeat(2, 1fr);
    gap: 0.8rem;
  }
}
@media(max-width:640px){
  .proj-grid{
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
@media(max-width:480px){
  .proj-grid{
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

/* ── card ── */
.proj-card {
  position:relative; overflow:hidden;
  border-radius:1.5rem;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.07);
  padding:0;
  transition:transform 0.2s ease-out, box-shadow 0.3s, border-color 0.3s;
  will-change:transform;
  cursor:default;
  display:flex; flex-direction:column;
  animation:cardIn 0.5s var(--delay,0s) cubic-bezier(0.23,1,0.32,1) both;
}
@keyframes cardIn {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}

/* top gradient bar */
.proj-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg, transparent 0%, var(--tc) 50%, transparent 100%);
  opacity:0.5;
}

/* hover glow bg */
.proj-card::after {
  content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%), var(--tc) 0%, transparent 55%);
  opacity:0; transition:opacity 0.4s;
}
.proj-card:hover::after { opacity:0.05; }

/* scanlines */
.card-scan {
  position:absolute; inset:0; border-radius:inherit; pointer-events:none; z-index:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px);
}

.card-body {
  position:relative; z-index:1;
  padding:1.75rem; display:flex; flex-direction:column; gap:1.1rem; flex:1;
  word-break: break-word;
}
@media(max-width:768px){
  .card-body{
    padding: 1.5rem 1.25rem;
    gap: 1rem;
  }
}
@media(max-width:640px){
  .card-body{
    padding: 1.25rem 1rem;
    gap: 0.75rem;
  }
}
@media(max-width:480px){
  .card-body{
    padding: 1rem 0.75rem;
    gap: 0.6rem;
  }
}


/* header row */
.card-header { 
  display:flex; align-items:center; justify-content:flex-start; gap:0.75rem; 
  flex-wrap:wrap;
}
.card-title {
  font-size:1.1rem; font-weight:700; color:#fff;
  letter-spacing:0.02em; line-height:1.2;
  flex:1;
  word-break: break-word;
}
@media(max-width:768px){
  .card-title{
    font-size: 1rem;
  }
}
@media(max-width:640px){
  .card-title{
    font-size: 0.95rem;
  }
}
.card-tag {
  font-family:'DM Mono',monospace; font-size:0.62rem; letter-spacing:0.12em;
  text-transform:uppercase; padding:0.2rem 0.65rem; border-radius:1rem;
  border:1px solid var(--tc); color:var(--tc);
  background:rgba(255,255,255,0.03); white-space:nowrap; flex-shrink:0;
}

/* desc */
.card-desc {
  font-size:0.875rem; line-height:1.7;
  color:rgba(255,255,255,0.45);
  flex:1;
  word-break: break-word;
}
@media(max-width:768px){
  .card-desc{
    font-size: 0.8rem;
    line-height: 1.6;
  }
}
@media(max-width:640px){
  .card-desc{
    font-size: 0.75rem;
    line-height: 1.5;
  }
}

/* tech pills */
.card-tech { display:flex; flex-wrap:wrap; gap:0.5rem; }
.tech-pill {
  display:inline-flex; align-items:center; gap:0.4rem;
  padding:0.3rem 0.75rem; border-radius:0.5rem;
  background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
  font-family:'DM Mono',monospace; font-size:0.68rem; letter-spacing:0.06em;
  color:rgba(255,255,255,0.55);
  transition:all 0.25s;
}
.proj-card:hover .tech-pill { border-color:rgba(255,255,255,0.14); color:rgba(255,255,255,0.7); }

/* links */
.card-links { display:flex; gap:0.75rem; padding-top:0.25rem; }
.card-link {
  display:inline-flex; align-items:center; gap:0.45rem;
  font-family:'DM Mono',monospace; font-size:0.72rem; letter-spacing:0.08em;
  text-transform:uppercase; text-decoration:none;
  padding:0.55rem 1.1rem; border-radius:0.625rem;
  border:1px solid rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.45);
  transition:all 0.3s cubic-bezier(0.23,1,0.32,1);
  background:rgba(255,255,255,0.03);
  position:relative; overflow:hidden;
}
.card-link.github:hover { border-color:rgba(255,255,255,0.4); color:#fff; background:rgba(255,255,255,0.07); }
.card-link.live   { border-color:rgba(0,212,255,0.25); color:#00d4ff; }
.card-link.live:hover { background:rgba(0,212,255,0.1); border-color:#00d4ff; box-shadow:0 0 20px rgba(0,212,255,0.2); transform:translateY(-2px); }
.card-link.github:hover { transform:translateY(-2px); }

/* ── count line ── */
.proj-count {
  margin-top:2.5rem;
  font-family:'DM Mono',monospace; font-size:0.7rem; letter-spacing:0.15em;
  text-transform:uppercase; color:rgba(255,255,255,0.2);
  display:flex; align-items:center; gap:0.75rem;
}
.proj-count::before { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
.proj-count::after  { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
`;

/* ── Card component ── */
const ProjectCard = ({ p, i }: { p: typeof projects[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tc = p.tagColor;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    const dx = x - 0.5, dy = y - 0.5;
    el.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 7}deg) scale(1.02)`;
    el.style.borderColor = `${tc}50`;
    el.style.boxShadow = `${-dx*20}px ${dy*20}px 40px rgba(0,0,0,0.35), 0 0 40px ${tc}18`;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transform = '';
    el.style.borderColor = '';
    el.style.boxShadow = '';
  };

  return (
    <div
      ref={ref}
      className="proj-card"
      style={{ '--tc': tc, '--delay': `${i * 0.06}s` } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-scan" />
      <div className="card-body">
        <div className="card-header">
          <div className="card-title">{p.title}</div>
          <div className="card-tag">{p.tag}</div>
        </div>
        <p className="card-desc">{p.desc}</p>
        <div className="card-tech">
          {p.tech.map(t => (
            <span key={t.name} className="tech-pill">
              <i className={t.icon} style={{ color: t.color, fontSize: '0.85rem' }} />
              {t.name}
            </span>
          ))}
        </div>
        <div className="card-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-link github">
              <i className="fab fa-github" /> GitHub
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="card-link live">
              <i className="fas fa-arrow-up-right-from-square" /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Main ── */
const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tag === filter);

  return (
    <>
      <style>{css}</style>
      <section id="projects">
        <div className="proj-inner">
          <div className="proj-header">
            <div>
              <div className="proj-tag">// what I've built</div>
              <h2 className="proj-heading">Projects.</h2>
            </div>
            <div className="proj-filters">
              {filters.map(f => (
                <button
                  key={f}
                  data-tag={f}
                  className={`pf-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="proj-grid">
            {filtered.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>

          <div className="proj-count">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</div>
        </div>
      </section>
    </>
  );
};

export default Projects;