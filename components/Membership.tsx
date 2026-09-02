import MagneticCTA from './MagneticCTA';

/* TODO(client): placeholder pricing, currency and contact details. */
const TIERS = [
  { name: 'Drop-in', price: '4,500', unit: 'One session' },
  { name: 'Ten', price: '38,000', unit: 'Ten sessions · 90 days' },
  { name: 'Open', price: '26,000', unit: 'Unlimited · monthly' },
];

export default function Membership() {
  return (
    <section
      id="membership"
      data-ground="ink"
      className="on-ink relative w-full bg-ink px-[var(--gutter)] pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(4.5rem,13vh,10rem)] text-bone"
    >
      <div className="grid grid-cols-12 items-start gap-x-[var(--gutter)] gap-y-[clamp(1.5rem,4vh,2.5rem)]">
        <span data-reveal className="u-mono col-span-12 text-bone/55 lg:col-span-2 lg:mt-3">
          05 &mdash; Membership
        </span>
        <p data-reveal className="col-span-12 lg:col-span-7 lg:col-start-4">
          <span className="block max-w-[20ch] text-balance text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            No contract, no joining fee.
          </span>
          <span className="u-serif mt-2 block max-w-[22ch] text-balance text-[clamp(1.75rem,3.8vw,3.15rem)] leading-[1.1] text-plunge-lift">
            The first session is assessed, not sold.
          </span>
        </p>
      </div>

      <ul className="mt-[clamp(3rem,8vh,5.5rem)] grid list-none grid-cols-12 gap-x-[var(--gutter)] gap-y-0 p-0">
        {TIERS.map((t) => (
          <li
            key={t.name}
            data-reveal
            className="col-span-12 border-t border-bone/20 py-[clamp(1.5rem,3.5vh,2.5rem)] last:border-b sm:col-span-4 sm:border-b sm:py-[clamp(1.75rem,4vh,2.75rem)]"
          >
            <div className="flex items-baseline justify-between gap-4 sm:block">
              <h3 className="u-mono text-plunge-lift">{t.name}</h3>
              <p className="text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.04em] tabular-nums sm:mt-7">
                {t.price}
              </p>
            </div>
            <p className="u-mono mt-4 text-bone/55 sm:mt-5">{t.unit}</p>
          </li>
        ))}
      </ul>
      <p data-reveal className="u-mono mt-6 text-bone/55">
        All prices LKR<span className="mx-3 text-bone/25">&middot;</span>Session
        capped at six
      </p>

      {/* TODO(client): confirm the first-session terms before this goes live.
          This is a refund promise in writing, not a tagline. */}
      <p
        data-reveal
        className="mt-[clamp(2rem,4.5vh,3rem)] max-w-[46ch] text-[0.9375rem] leading-[1.65] text-bone/55"
      >
        Your first session ends with an assessment, not a card machine. If the
        programme is not the right thing for you, we will say so &mdash; and you
        will not pay for it.
      </p>

      {/* ============================================================
          THE CLOSING CALL — the magnet, at headline scale.
          ============================================================ */}
      <div
        data-reveal
        id="book"
        className="mt-[clamp(4.5rem,13vh,9rem)] scroll-mt-[var(--header-h)]"
      >
        {/* TODO(client): live booking destination once locked. */}
        <MagneticCTA href="#book" variant="display" className="on-ink text-bone">
          Book a session
        </MagneticCTA>
        <p className="u-mono mt-8 text-bone/55">
          Next opening &mdash; Thu 06:40
          <span className="mx-3 text-bone/25">&middot;</span>
          Two places left
        </p>
      </div>

      {/* ---------- footer ---------- */}
      <footer className="mt-[clamp(4.5rem,12vh,8rem)] border-t border-bone/20 pt-[clamp(1.75rem,4vh,2.5rem)]">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 flex items-baseline gap-[0.6rem] lg:col-span-3">
            <span
              className="text-[0.8125rem] font-medium uppercase leading-none"
              style={{ letterSpacing: '0.2em' }}
            >
              Counterpose
            </span>
            <span className="h-[5px] w-[5px] rounded-full bg-plunge-lift" />
          </div>

          <address className="u-mono col-span-12 not-italic leading-[1.9] text-bone/55 sm:col-span-6 lg:col-span-3">
            14 Guildford Crescent
            <br />
            Colombo 07
          </address>

          <div className="u-mono col-span-12 leading-[1.9] text-bone/55 sm:col-span-6 lg:col-span-3">
            Mon&ndash;Fri 06:00&ndash;20:30
            <br />
            Sat 07:00&ndash;14:00
          </div>

          <div className="col-span-12 lg:col-span-3 lg:text-right">
            <a
              href="mailto:hello@counterpose.studio"
              data-cursor=""
              className="u-mono group relative inline-block text-bone transition-opacity duration-500 hover:opacity-70"
            >
              hello@counterpose.studio
              <span
                aria-hidden
                className="absolute -bottom-[5px] left-0 h-px w-full origin-right scale-x-0 bg-plunge-lift transition-transform duration-[600ms] group-hover:origin-left group-hover:scale-x-100"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
            </a>
          </div>
        </div>

        <p className="u-mono mt-[clamp(2.5rem,6vh,4rem)] text-bone/25">
          &copy; 2026 Counterpose
        </p>
      </footer>
    </section>
  );
}
