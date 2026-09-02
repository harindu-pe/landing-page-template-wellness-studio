const NAV = [
  { label: 'Method', href: '#method' },
  { label: 'Room', href: '#studio' },
  { label: 'Sessions', href: '#sessions' },
  { label: 'Membership', href: '#membership' },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="flex items-center justify-between px-[var(--gutter)]"
        style={{ height: 'var(--header-h)' }}
      >
        {/* Wordmark */}
        <a
          href="/"
          data-cursor=""
          data-load="mark"
          className="anim-fade group flex items-baseline gap-[0.6rem] will-change-transform"
        >
          <span
            className="text-[0.8125rem] font-medium uppercase leading-none"
            style={{ letterSpacing: '0.2em' }}
          >
            Counterpose
          </span>
          <span className="h-[5px] w-[5px] rounded-full bg-plunge transition-transform duration-500 group-hover:scale-[2]" />
        </a>

        <nav className="flex items-center gap-[clamp(1.25rem,2.6vw,2.75rem)]">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              data-load="nav"
              data-cursor=""
              className="anim-fade group relative hidden text-[0.8125rem] leading-none text-text-secondary transition-colors duration-500 hover:text-text-primary sm:block"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            >
              {n.label}
              <span
                aria-hidden
                className="absolute -bottom-[6px] left-0 h-px w-full origin-right scale-x-0 bg-plunge transition-transform duration-[600ms] group-hover:origin-left group-hover:scale-x-100"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
            </a>
          ))}

          <a
            href="#book"
            data-load="nav"
            data-cursor=""
            className="anim-fade u-mono relative overflow-hidden rounded-full border border-ink/50 px-5 py-[0.7rem] text-ink"
          >
            <span className="relative z-10">Book</span>
          </a>
        </nav>
      </div>

      <div className="anim-rule h-px w-full origin-left bg-rule will-change-transform" />
    </header>
  );
}
