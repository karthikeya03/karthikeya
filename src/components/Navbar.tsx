import { useEffect, useState } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      setHidden(curr > lastScroll && curr > 100);
      setLastScroll(curr);

      const sections = links.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glassmorphism transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-lg sm:text-xl font-heading font-bold gradient-text whitespace-nowrap">
          SSK
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs sm:text-sm font-medium transition-colors duration-200 hover:text-gold whitespace-nowrap ${active === l.href.slice(1) ? 'text-gold' : 'text-muted-foreground'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="https://github.com/karthikeya03" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors text-sm sm:text-base">
            <i className="fab fa-github" />
          </a>
          <a href="http://www.linkedin.com/in/saisatyakarthikeya" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors text-sm sm:text-base">
            <i className="fab fa-linkedin" />
          </a>
          <button className="lg:hidden text-foreground text-sm sm:text-base" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-2">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xs sm:text-sm font-medium py-2 transition-colors ${active === l.href.slice(1) ? 'text-gold' : 'text-muted-foreground'}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
