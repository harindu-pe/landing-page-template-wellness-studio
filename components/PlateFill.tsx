import Image from 'next/image';

/**
 * The photograph that fills a plate. Sits inside the parallax wrapper, so the
 * picture — and only the picture — drifts with scroll.
 */
export default function PlateFill({
  src,
  alt,
  sizes,
  priority = false,
  position = 'center',
}: {
  src: string;
  alt: string;
  /** Layout width of this slot, so next/image ships the right file. */
  sizes: string;
  priority?: boolean;
  /** object-position — matters where the rendered aspect differs from the file's. */
  position?: string;
}) {
  return (
    <div className="relative h-full w-full" style={{ backgroundColor: '#191512' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
