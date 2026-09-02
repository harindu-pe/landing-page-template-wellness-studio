import PlateFill from './PlateFill';
import PlateFurniture from './PlateFurniture';

/**
 * An image slot outside the hero. Space is reserved by aspect-ratio, so the
 * photography lands at zero layout shift. Each nested level owns exactly one
 * transform: the mask reveal, then the scroll parallax.
 */
export default function Plate({
  src,
  alt,
  caption,
  aspect,
  sizes,
  speed = 6,
  position,
  accentMark = true,
  className = '',
}: {
  src: string;
  alt: string;
  caption: string;
  /** e.g. "4/5" — reserves the space before anything loads. */
  aspect: string;
  sizes: string;
  /** Parallax travel in percent over the section's scroll range. */
  speed?: number;
  position?: string;
  accentMark?: boolean;
  className?: string;
}) {
  return (
    <figure className={`anim-plate relative m-0 block overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <div data-plate-reveal className="relative h-full w-full will-change-transform">
        {/* Overscanned by 15% top and bottom. The parallax travels +/- `speed`
            percent of this element's own height, so the picture must be taller
            than its slot or the drift exposes a bare edge. */}
        <div
          data-parallax
          data-parallax-speed={speed}
          className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform"
        >
          <PlateFill src={src} alt={alt} sizes={sizes} position={position} />
        </div>

        <PlateFurniture caption={caption} accentMark={accentMark} />
      </div>
    </figure>
  );
}
