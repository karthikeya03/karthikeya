import { useState, useRef, useCallback } from 'react';

const certs = [
  {
    name: 'AWS Developer Associate', issuer: 'Amazon Web Services',
    icon: '☁', year: '2024',
    link: 'https://drive.google.com/file/d/1rRlGNzUDhklVy6Tac4tVKAYYvXyaotRW/view?usp=drive_link',
    accent: '#ff9900',
  },
  {
    name: 'IT Specialist — HTML & CSS', issuer: 'Certiport / Pearson',
    icon: '🌐', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/HTML%20and%20CSS.pdf',
    accent: '#00ffe5',
  },
  {
    name: 'IT Specialist — Python', issuer: 'Certiport / Pearson',
    icon: '🐍', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/Python%20certificate.pdf',
    accent: '#ffd43b',
  },
  {
    name: 'IT Specialist — Java', issuer: 'Certiport / Pearson',
    icon: '☕', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/Java%20IT%20specialist.pdf',
    accent: '#f89820',
  },
  {
    name: 'CCNA — Intro to Networks', issuer: 'Cisco Networking Academy',
    icon: '📡', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/CCNA.pdf',
    accent: '#1ba0d7',
  },
  {
    name: 'Java Programming Certificate', issuer: 'Oracle Academy',
    icon: '📜', year: '2023',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/java%20programming.pdf',
    accent: '#c74634',
  },
];

function CertCard({ c }: { c: typeof certs[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    setTilt({
      x: (cy / r.height - 0.5) * -12,
      y: (cx / r.width - 0.5) * 12,
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
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.hovered ? 1.04 : 1})`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease',
        boxShadow: tilt.hovered ? `0 10px 30px rgba(0,0,0,0.2), 0 0 20px ${c.accent}40` : 'none',
      }}
      className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center text-2xl">{c.icon}</div>
        <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">✓ Verified</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white">{c.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{c.issuer}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-500">{c.year}</span>
        <a href={c.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <i className="fas fa-external-link-alt" /> View
        </a>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-cyan-500" />
            <span className="font-mono text-sm uppercase tracking-widest text-cyan-400/70">Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">Certifications.</h2>
          <p className="mt-4 text-base text-gray-500 max-w-2xl">
            Industry credentials from AWS, Cisco, Oracle and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {certs.map((c) => <CertCard key={c.name} c={c} />)}
        </div>
      </div>
    </section>
  );
}