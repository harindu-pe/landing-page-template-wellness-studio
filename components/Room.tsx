import Plate from './Plate';

/* TODO(client): "one physio" and the 1:6 ratio below are unverified claims.
   "Physio" is a protected title in most jurisdictions — confirm the coaching
   staff's registration, or soften it to "clinician". */

export default function Room() {
  return (
    <section
      id="studio"
      data-ground="bone"
      className="relative w-full px-[var(--gutter)] pb-[clamp(4rem,11vh,8rem)] pt-[clamp(4.5rem,13vh,10rem)]"
    >
      <div className="grid grid-cols-12 items-start gap-x-[var(--gutter)] gap-y-[clamp(1.75rem,4vh,3rem)]">
        <span data-reveal className="u-mono col-span-12 text-text-tertiary lg:col-span-2 lg:mt-3">
          03 &mdash; The room
        </span>

        <h2 data-reveal className="col-span-12 lg:col-span-5 lg:col-start-4">
          <span className="u-hero block text-balance text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.88]">
            Six mats.
          </span>
          <span className="u-serif block text-balance text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] text-plunge">
            No mirrors.
          </span>
        </h2>

        <p
          data-reveal
          className="u-lede col-span-12 max-w-[42ch] sm:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end"
        >
          One physio, six people, one room. No mirrors &mdash; the feedback you
          need is internal, and a wall of glass only teaches you to perform. The
          lights are set at 06:00 and they do not change. If you are looking for
          a class to disappear into, this is the wrong room.
        </p>
      </div>

      {/* ============================================================
          Asymmetric plate grid. Every slot reserves its space by
          aspect-ratio, so photography lands at zero layout shift.
          ============================================================ */}
      <div className="mt-[clamp(3.5rem,9vh,7rem)] grid grid-cols-12 gap-[var(--gutter)]">
        <Plate
          src="/plates/plate-02-floor.jpg"
          alt="A woman sitting cross-legged on a linen mat with her eyes closed, breathing, in warm morning light."
          caption="Plate 02 &mdash; Floor, 06:05"
          aspect="4/5"
          speed={7}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 42vw"
          className="col-span-12 sm:col-span-7 lg:col-span-5 lg:col-start-1"
        />

        <div className="col-span-12 flex flex-col justify-end gap-[var(--gutter)] sm:col-span-5 lg:col-span-4 lg:col-start-6">
          <Plate
            src="/plates/plate-03-reformer.jpg"
            alt="A pale maple pilates reformer beside a tall window, sunlight falling across the oak floor."
            caption="Plate 03 &mdash; Reformer bay"
            aspect="1/1"
            speed={4}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 34vw"
            accentMark={false}
          />
          <div data-reveal className="pb-2">
            <div className="flex items-baseline justify-between border-t border-rule pt-4">
              <span className="u-mono text-text-tertiary">Capacity</span>
              <span className="u-mono tabular-nums">06</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-rule pt-4">
              <span className="u-mono text-text-tertiary">Coach ratio</span>
              <span className="u-mono tabular-nums">1:6</span>
            </div>
          </div>
        </div>

        <Plate
          src="/plates/plate-04-recovery-bay.jpg"
          alt="A travertine plunge pool with still clear water, folded linen towels on the stone bench beside it."
          caption="Plate 04 &mdash; Recovery bay, 19:40"
          aspect="3/4"
          speed={9}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 26vw"
          className="col-span-12 mt-[clamp(0rem,6vw,5rem)] sm:col-span-8 sm:col-start-5 lg:col-span-3 lg:col-start-10 lg:mt-[clamp(4rem,11vw,10rem)]"
        />
      </div>
    </section>
  );
}
