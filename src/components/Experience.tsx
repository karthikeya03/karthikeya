import { useEffect, useRef, useState, useCallback } from 'react';

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
      'Built NLP models that could understand if people liked or didn\'t like things - got 85% accuracy',
      'Cleaned up a bunch of messy data from reviews and app feedback to train the models with',
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
      'Built and shipped real components on AWS that actually got used by 10+ student projects',
      'Made file storage faster - set up better indexing for 10GB of files and cut retrieval time by a third',
      'Set up the whole pipeline so code gets tested and deployed automatically instead of doing it by hand',
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
      'Built 12+ full web apps myself, from talking through what they needed to shipping them live',
      'Handled everything - login systems, APIs, databases, and making it all work on every screen',
      'Set up smart database designs so things stayed fast even with thousands of users',
    ],
    cert: 'https://drive.google.com/file/d/17B8XmVxoObp9jntcIWldi9ljmPLPdUX3/view?usp=drive_link',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
];

function ExperienceCard({ exp, isVisible }: { exp: typeof experiences[0], isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    setTilt({
      x: (cy / r.height - 0.5) * -10,
      y: (cx / r.width - 0.5) * 10,
      hovered: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, hovered: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="h-full min-h-[28rem] p-6 rounded-2xl bg-gray-800/20 border border-gray-700/50 flex flex-col transition-opacity duration-700"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.hovered ? '10px' : '0px'})`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, opacity 0.7s ease',
        boxShadow: tilt.hovered ? `0 10px 30px rgba(0,0,0,0.2), 0 0 20px ${exp.color}40` : 'none',
        opacity: isVisible ? 1 : 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-mono tracking-widest text-gray-500">{exp.index}</p>
          <h3 className="font-bold text-white text-lg">{exp.role}</h3>
          <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
        </div>
        <p className="text-xs font-mono text-gray-500 whitespace-nowrap">{exp.duration}</p>
      </div>

      <div className="h-px bg-gray-700/50 my-4" />

      <ul className="flex-1 space-y-2">
        {exp.points.map((point, j) => (
          <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 border-t border-r transform rotate-45" style={{ borderColor: exp.color }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {exp.skills.map((s, k) => (
            <span key={k} className="px-2 py-0.5 text-xs font-mono rounded-full bg-gray-700/50 text-gray-400 border border-gray-600/50">{s}</span>
          ))}
        </div>
        <a
          href={exp.cert}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-xs font-mono rounded-full border flex items-center gap-1.5 transition-all"
          style={{ color: exp.color, borderColor: `${exp.color}80` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${exp.color}20`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <i className="fas fa-award" /> Cert
        </a>
      </div>
    </div>
  );
}

export default function Experience() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    experiences.forEach((_, i) => {
      const el = document.getElementById(`exp-card-${i}`);
      if (el) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[i] = true;
              return newVisible;
            });
            observer.unobserve(el);
          }
        }, { threshold: 0.1 });
        observer.observe(el);
        observers.push(observer);
      }
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-cyan-500" />
            <span className="font-mono text-sm uppercase tracking-widest text-cyan-400/70">Career Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-300" data-text="Experience">Experience.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-5 sm:gap-6">
          {experiences.map((exp, i) => (
            <div id={`exp-card-${i}`} key={i} style={{ transitionDelay: `${i * 150}ms` }} className="h-full transition-opacity duration-700 ease-in-out opacity-0 data-[visible=true]:opacity-100" data-visible={!!visibleCards[i]}>
              <ExperienceCard exp={exp} isVisible={!!visibleCards[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}