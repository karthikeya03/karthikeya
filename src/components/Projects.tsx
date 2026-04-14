import { useState } from 'react';

const projects = [
  {
    title: 'Leaf Analyzer',
    tag: 'AI/ML',
    desc: 'Take a photo of a plant leaf and it tells you what disease it probably has. Works pretty well (94.8% accurate).',
    tech: [
      { name: 'Python',     icon: 'devicon-python-plain' },
      { name: 'TensorFlow', icon: 'devicon-tensorflow-original' },
      { name: 'Flask',      icon: 'devicon-flask-original' },
    ],
    github: 'https://github.com/karthikeya03/Leaf-analyzer',
  },
  {
    title: 'Late Comers',
    tag: 'Full Stack',
    desc: 'Track which students show up to class. Sends alerts to parents and uses barcode scanning to make it quick.',
    tech: [
      { name: 'React',   icon: 'devicon-react-original' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
      { name: 'AWS',     icon: 'devicon-amazonwebservices-original' },
    ],
    live: 'https://adityauniversity.in/latecomers/dashboard',
  },
  {
    title: 'Kodikoota',
    tag: 'Full Stack',
    desc: 'A news site for Telugu readers. Built it to handle lots of traffic, now gets thousands of visits a month.',
    tech: [
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    ],
    live: 'https://www.kodikoota.com/',
  },
  {
    title: 'Flowbit AI Agent',
    tag: 'AI/ML',
    desc: 'An AI agent that learns from invoices and can process new ones intelligently.',
    tech: [{ name: 'TypeScript', icon: 'devicon-typescript-plain' }],
    github: 'https://github.com/karthikeya03/Flowbit-AI-Agent',
  },
  {
    title: 'BookNest Haven',
    tag: 'Full Stack',
    desc: 'Search for books, save your favorites, keep track of what you want to read.',
    tech: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'React',      icon: 'devicon-react-original' },
    ],
    github: 'https://github.com/karthikeya03/booknest-haven',
  },
  {
    title: 'DS Visualizer',
    tag: 'Frontend',
    desc: 'Watch how sorting algorithms actually work. You can step through them to see what\'s happening.',
    tech: [{ name: 'JavaScript', icon: 'devicon-javascript-plain' }],
    github: 'https://github.com/karthikeya03/DS-Visualizer',
  },
  {
    title: 'Java Banking',
    tag: 'Java',
    desc: 'A banking app where you can create accounts, send money, check your balance. Built with proper OOP structure.',
    tech: [{ name: 'Java', icon: 'devicon-java-plain' }],
    github: 'https://github.com/karthikeya03/Java-Banking-System',
  },
  {
    title: 'BudgetBudd',
    tag: 'Full Stack',
    desc: 'Track where your money goes. Organize expenses into categories and see where you can save.',
    tech: [{ name: 'TypeScript', icon: 'devicon-typescript-plain' }],
    github: 'https://github.com/karthikeya03/BudgetBudd',
  },
];

const filters = ['All', 'AI/ML', 'Full Stack', 'Frontend', 'Java'];

const ProjectCard = ({ p }: { p: typeof projects[0] }) => {
  return (
    <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4 transition-transform transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{p.title}</h3>
        <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">{p.tag}</span>
      </div>
      <p className="text-sm text-gray-400 flex-1">{p.desc}</p>
      <div className="flex flex-wrap gap-2">
        {p.tech.map(t => (
          <span key={t.name} className="flex items-center gap-2 text-xs bg-gray-700/50 px-2 py-1 rounded">
            <i className={`${t.icon} text-base`} />
            {t.name}
          </span>
        ))}
      </div>
      <div className="flex gap-4 pt-2">
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <i className="fab fa-github" /> GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
            <i className="fas fa-arrow-up-right-from-square" /> Live
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tag === filter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-4">
          <div>
            <div className="font-mono text-sm uppercase tracking-widest text-gray-400 border-l-2 border-yellow-500 pl-3 mb-2">// what I've built</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">Projects.</h2>
          </div>
          <div className="flex flex-wrap gap-2 max-w-full">
            {filters.map(f => (
              <button
                key={f}
                className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap ${
                  filter === f
                    ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                    : 'bg-gray-800/20 border-gray-700/50 text-gray-400 hover:bg-gray-700/50'
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>

        <div className="text-center mt-12 font-mono text-xs uppercase tracking-widest text-gray-500">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} shown
        </div>
      </div>
    </section>
  );
};

export default Projects;