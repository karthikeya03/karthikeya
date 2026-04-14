const stats = [
  { icon: 'fas fa-code', value: '200+', label: 'Problems Solved', sub: 'LeetCode · 1700 rating', link: 'https://leetcode.com/u/03karthikeya03/' },
  { icon: 'fas fa-fire', value: '10+', label: 'Hackathons', sub: 'Won some, learned from all' },
  { icon: 'fas fa-project-diagram', value: '3', label: 'Live Projects', sub: 'Actually deployed' },
  { icon: 'fas fa-briefcase', value: '3', label: 'Internships', sub: 'AWS & full stack' },
];

const bioLines = [
  { label: 'stack', val: 'React, Node.js, Python, AWS, TensorFlow' },
  { label: 'code at', val: 'LeetCode 1700, CodeChef 3★' },
  { label: 'into', val: 'Building things that work, solving hard problems' },
  { label: 'looking for', val: 'Full-time roles or interesting projects' },
];

function StatCard({ s }: { s: typeof stats[0] }) {
  const Tag = s.link ? 'a' : 'div';
  const linkProps = s.link ? { href: s.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag
      {...linkProps}
      className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4 transition-transform transform hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center text-xl text-cyan-400">
        <i className={s.icon} />
      </div>
      <div>
        <p className="text-4xl font-bold text-white">{s.value}</p>
        <h3 className="text-lg font-semibold text-gray-300 mt-1">{s.label}</h3>
        <p className="text-sm text-gray-500">{s.sub}</p>
      </div>
    </Tag>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-cyan-500" />
              <span className="font-mono text-sm uppercase tracking-widest text-cyan-400/70">Who I am</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">About Me.</h2>
          </div>

          <p className="text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-6">
            Final-year <strong className="text-gray-200">B.Tech in Computer Engineering</strong>. I work with React, Node.js, Python, and AWS. Good at competitive programming (LeetCode 1700). I've done internships building things with AI and AWS. I like making apps that actually work well.
          </p>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-4 font-mono text-sm">
              {bioLines.map((l) => (
                <div key={l.label} className="flex gap-4">
                  <span className="text-purple-400 flex-shrink-0">{l.label.padEnd(12, ' ')}::</span>
                  <span className="text-gray-400">{l.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((s) => <StatCard key={s.label} s={s} />)}
        </div>
      </div>
    </section>
  );
}