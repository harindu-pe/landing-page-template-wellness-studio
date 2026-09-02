const SESSIONS = [
  { time: '06:40', name: 'Unload', days: 'Mon Wed Fri', splits: [12, 8, 25] },
  { time: '07:20', name: 'Range', days: 'Tue Thu', splits: [10, 8, 27] },
  { time: '12:15', name: 'Breath', days: 'Daily', splits: [5, 15, 5] },
  { time: '18:00', name: 'Reload', days: 'Mon–Sat', splits: [15, 10, 35] },
];

const total = (s: number[]) => s.reduce((a, b) => a + b, 0);
const LONGEST = Math.max(...SESSIONS.map((s) => total(s.splits)));

export default function Sessions() {
  return (
    <section
      id="sessions"
      data-ground="bone"
      className="relative w-full px-[var(--gutter)] pb-[clamp(4rem,11vh,8rem)] pt-[clamp(4.5rem,13vh,10rem)]"
    >
      <div className="grid grid-cols-12 items-start gap-x-[var(--gutter)] gap-y-[clamp(1.75rem,4vh,3rem)]">
        <span data-reveal className="u-mono col-span-12 text-text-tertiary lg:col-span-2 lg:mt-3">
          04 &mdash; Sessions
        </span>
        <h2 data-reveal className="col-span-12 lg:col-span-6 lg:col-start-4">
          <span className="u-hero block text-balance text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.88]">
            Four sessions.
          </span>
          <span className="u-serif block text-balance text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] text-plunge">
            Nothing else.
          </span>
        </h2>
        <p
          data-reveal
          className="u-lede col-span-12 max-w-[34ch] sm:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end"
        >
          Four, because a fifth would be filler. Every bar below is drawn to
          scale and split at the real minute marks &mdash; book the one that
          answers what you did yesterday.
        </p>
      </div>

      {/* ============================================================
          The timetable as instrument: each row is its session drawn
          to scale, segmented at the actual interval boundaries.
          ============================================================ */}
      <ul className="mt-[clamp(3rem,8vh,5.5rem)] list-none p-0">
        {SESSIONS.map((s) => {
          const mins = total(s.splits);
          return (
            <li key={s.name} data-reveal className="border-t border-rule last:border-b">
              <a
                href="#book"
                data-cursor=""
                className="group relative grid grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-4 py-[clamp(1.5rem,3.2vh,2.25rem)]"
              >
                {/* accent underline, drawn on approach */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-plunge transition-transform duration-[700ms] group-hover:scale-x-100"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />

                <span className="u-mono col-span-4 tabular-nums text-text-secondary sm:col-span-2 lg:col-span-1">
                  {s.time}
                </span>

                <h3 className="col-span-8 text-[clamp(1.5rem,2.9vw,2.6rem)] font-medium uppercase leading-none tracking-[-0.038em] sm:col-span-4 lg:col-span-3">
                  <span
                    className="inline-block transition-transform duration-[700ms] will-change-transform group-hover:translate-x-2"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  >
                    {s.name}
                  </span>
                </h3>

                {/* interval bar — width is this session against the longest */}
                <span
                  aria-hidden
                  className="col-span-12 flex gap-[2px] sm:col-span-12 lg:col-span-5"
                  style={{ paddingRight: `${(1 - mins / LONGEST) * 100}%` }}
                >
                  {s.splits.map((seg, i) => (
                    <span
                      key={i}
                      className="block h-[4px] bg-ink/45 transition-colors duration-500 group-hover:bg-plunge"
                      style={{ flexBasis: `${(seg / mins) * 100}%`, opacity: 1 - i * 0.3 }}
                    />
                  ))}
                  <span className="ml-[6px] block h-[10px] w-px shrink-0 -translate-y-[3px] bg-ink/30" />
                </span>

                <span className="u-mono col-span-7 text-text-tertiary sm:col-span-4 lg:col-span-2 lg:text-right">
                  {s.days}
                </span>
                <span className="u-mono col-span-5 tabular-nums text-text-secondary sm:col-span-2 lg:col-span-1 lg:text-right">
                  {mins} min
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
