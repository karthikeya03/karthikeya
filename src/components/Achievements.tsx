const achievements = [
  {
    icon: '🏆',
    title: 'LeetCode 1700', desc: 'Solved 200+ coding problems. I\'m in the top 23% of people who use the site.',
    link: 'https://leetcode.com/u/03karthikeya03/', linkLabel: 'View Profile',
    stat: 'TOP 23%', rank: '1700', rankLabel: 'Rating',
  },
  {
    icon: '🥇',
    title: '1st Place — Project Space', desc: 'Won first place in my college\'s project competition with 120 teams competing.',
    stat: '1ST PLACE', rank: '120', rankLabel: 'Teams',
  },
  {
    icon: '⭐',
    title: 'Top 15 — GFG Hackathon', desc: 'Made it to the top 15 in the Geeks for Geeks Cloud Hackathon powered by Vultr.',
    link: 'https://karthikeya03.github.io/karthikeya03/certifications/internships/Vultr%20Top%2015%20Teams.pdf',
    linkLabel: 'View Certificate', stat: 'TOP 15', rank: '15', rankLabel: 'Rank',
  },
  {
    icon: '💻',
    title: 'CodeChef 1690', desc: 'Competed on CodeChef, got ranked 216 globally in one of their contests.',
    link: 'https://www.codechef.com/users/karthikeya_03', linkLabel: 'View Profile',
    stat: 'RANK 216', rank: '1690', rankLabel: 'Rating',
  },
  {
    icon: '🚀',
    title: 'Smart India Hackathon', desc: 'Participated in India\'s biggest hackathon, organized by the government.',
    stat: 'NATIONAL', rank: 'SIH', rankLabel: 'Govt.',
  },
  {
    icon: '💼',
    title: 'JP Morgan Code for Good', desc: 'Got selected for JP Morgan\'s coding competition focused on projects that help society.',
    stat: 'SELECTED', rank: 'JP', rankLabel: 'Morgan',
  },
];

function AchCard({ a }: { a: typeof achievements[0] }) {
  return (
    <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 flex flex-col gap-4 transition-transform transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center text-2xl">{a.icon}</div>
        <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">{a.stat}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{a.rank}</span>
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400">{a.rankLabel}</span>
      </div>
      <h3 className="text-lg font-bold text-white">{a.title}</h3>
      <p className="text-sm text-gray-400 flex-1">{a.desc}</p>
      {a.link && (
        <a href={a.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <i className="fas fa-external-link-alt" /> {a.linkLabel}
        </a>
      )}
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-yellow-500" />
            <span className="font-mono text-sm uppercase tracking-widest text-yellow-400/70">Recognition</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">Achievements.</h2>
          <p className="mt-4 text-base text-gray-500 max-w-2xl">
            Milestones, rankings and wins across competitive programming and hackathons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {achievements.map((a) => <AchCard key={a.title} a={a} />)}
        </div>
      </div>
    </section>
  );
}