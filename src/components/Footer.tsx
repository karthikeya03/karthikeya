const Footer = () => (
  <footer className="py-8 px-4 border-t border-border text-center space-y-3">
    <div className="flex justify-center gap-4">
      {[
        { icon: 'fab fa-github', href: 'https://github.com/karthikeya03' },
        { icon: 'fab fa-linkedin', href: 'http://www.linkedin.com/in/saisatyakarthikeya' },
        { icon: 'fas fa-code', href: 'https://leetcode.com/u/03karthikeya03/' },
        { icon: 'fas fa-utensils', href: 'https://www.codechef.com/users/karthikeya_03' },
      ].map((s, i) => (
        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
          <i className={`${s.icon} text-lg`} />
        </a>
      ))}
    </div>
    <p className="text-muted-foreground/50 text-xs">
      &copy; 2026 Bandikatla Sai Satya Karthikeya
    </p>
  </footer>
);

export default Footer;
