const STEPS = [
  {
    n: '01',
    name: 'Unload',
    minutes: 12,
    spec: 'Supine',
    body: 'Decompress what the last four days compressed. Passive first — you cannot mobilise a system that is still braced.',
  },
  {
    n: '02',
    name: 'Breathe',
    minutes: 8,
    spec: '5.5 / min',
    body: 'Down-regulate before you ask the body for range. A braced nervous system reads new range as a threat and takes it straight back.',
  },
  {
    n: '03',
    name: 'Reload',
    minutes: 25,
    spec: 'Loaded',
    body: 'Earn the range back under load. Range you cannot control is not range, it is exposure.',
  },
];

const TOTAL = STEPS.reduce((a, s) => a + s.minutes, 0);

export default function Method() {
  return (
    <section
      id="method"
      data-ground="ink"
      className="on-ink relative w-full bg-ink px-[var(--gutter)] pb-[clamp(4rem,11vh,8rem)] pt-[clamp(4.5rem,13vh,10rem)] text-bone"
    >
      <div className="grid grid-cols-12 items-start gap-x-[var(--gutter)] gap-y-[clamp(1.5rem,4vh,2.5rem)]">
        <span data-reveal className="u-mono col-span-12 text-bone/55 lg:col-span-2 lg:mt-3">
          02 &mdash; Method
        </span>
        <h2 data-reveal className="col-span-12 lg:col-span-7 lg:col-start-4">
          <span className="block max-w-[18ch] text-balance text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            You already know how to work.
          </span>
          <span className="u-serif mt-2 block max-w-[20ch] text-balance text-[clamp(1.75rem,3.8vw,3.15rem)] leading-[1.1] text-plunge-lift">
            We programme the part you skip.
          </span>
        </h2>
      </div>

      {/* ============================================================
          THE SESSION RULE — the hero's instrument, re-pointed at the
          shape of forty-five minutes. Segment widths are the real
          time split, not decoration.
          ============================================================ */}
      <div data-reveal className="mt-[clamp(3.5rem,9vh,6.5rem)] w-full">
        <div className="flex items-baseline justify-between">
          <span className="u-mono text-bone/55">
            Session<span className="mx-2 text-plunge-lift">/</span>Structure
          </span>
          <span className="u-mono tabular-nums text-bone/55">{TOTAL} min</span>
        </div>

        <div className="mt-4 flex w-full gap-[2px]">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group relative"
              style={{ flexBasis: `${(s.minutes / TOTAL) * 100}%` }}
            >
              <span className="block h-[2px] w-full bg-plunge-lift/70 transition-colors duration-500 group-hover:bg-plunge-lift" />
              <span className="mt-3 block h-[12px] w-px bg-bone/35" />
              <span className="u-mono mt-3 block whitespace-nowrap text-bone/55">
                <span className="tabular-nums text-bone">
                  {String(s.minutes).padStart(2, '0')}
                </span>
                <span className="ml-2 hidden sm:inline">{s.name}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- the three beats ---------- */}
      <ol className="mt-[clamp(2.5rem,6.5vh,4.5rem)] grid list-none grid-cols-12 gap-x-[var(--gutter)] gap-y-[clamp(2.75rem,6vh,4rem)] p-0">
        {STEPS.map((s) => (
          <li key={s.n} data-reveal className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="flex items-baseline justify-between border-t border-bone/20 pt-5">
              <span className="u-mono text-plunge-lift">{s.n}</span>
              <span className="u-mono text-bone/55">
                {s.minutes} min<span className="mx-2 text-bone/25">&middot;</span>
                {s.spec}
              </span>
            </div>
            <h3 className="mt-6 text-[clamp(1.6rem,2.6vw,2.35rem)] font-medium uppercase leading-none tracking-[-0.035em]">
              {s.name}
            </h3>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-[1.65] text-bone/55">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
