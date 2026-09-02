/**
 * Scrim, registration marks and caption — the frame that makes an image slot
 * read as a documentary plate rather than a stock photo, and what keeps four
 * separately-shot images reading as one series.
 *
 * Deliberately pinned to the figure, OUTSIDE the parallax wrapper: a caption
 * belongs to the plate, not to the photograph, so it must not drift out of
 * frame as the photo travels.
 */
export default function PlateFurniture({
  caption,
  accentMark = true,
}: {
  caption: string;
  accentMark?: boolean;
}) {
  return (
    <>
      {/* The caption sits on photography, so it needs its own ground. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 block h-[30%] bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
      />

      {accentMark && (
        <span
          aria-hidden
          className="absolute bottom-[clamp(2.9rem,5.5vw,4rem)] left-[clamp(1.05rem,2vw,1.65rem)] block h-px w-[clamp(2.5rem,7vw,4.5rem)] bg-plunge-lift"
        />
      )}

      {/* Registration corners. Ink at the top, where every plate is light;
          bone at the bottom, where the scrim has taken over. */}
      <span aria-hidden className="absolute right-[clamp(1rem,2vw,1.6rem)] top-[clamp(1rem,2vw,1.6rem)] block h-[13px] w-px bg-ink/30" />
      <span aria-hidden className="absolute right-[clamp(1rem,2vw,1.6rem)] top-[clamp(1rem,2vw,1.6rem)] block h-px w-[13px] bg-ink/30" />
      <span aria-hidden className="absolute bottom-[clamp(1rem,2vw,1.6rem)] right-[clamp(1rem,2vw,1.6rem)] block h-[13px] w-px bg-bone/45" />
      <span aria-hidden className="absolute bottom-[clamp(1rem,2vw,1.6rem)] right-[clamp(1rem,2vw,1.6rem)] block h-px w-[13px] bg-bone/45" />

      <span
        aria-hidden
        className="absolute bottom-[clamp(1.05rem,2vw,1.65rem)] left-[clamp(1.05rem,2vw,1.65rem)] block h-[7px] w-[7px] rounded-full bg-plunge-lift"
      />
      <span className="u-mono on-ink absolute bottom-[clamp(0.9rem,1.85vw,1.5rem)] left-[clamp(2.35rem,4vw,3.25rem)] block text-bone/70">
        {caption}
      </span>
    </>
  );
}
