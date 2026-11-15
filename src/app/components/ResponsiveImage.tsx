import assets from "@/app/lib/image-assets.json";

type Props = {
  src: keyof typeof assets;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Build-time variants work on static hosting without an image server. */
export default function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: Props) {
  const stem = src
    .slice(1)
    .replace(/\.[^.]+$/, "")
    .toLowerCase();
  const srcSet = (format: string) =>
    assets[src]
      .map((width) => `/optimized/${stem}-${width}.${format} ${width}w`)
      .join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      />
    </picture>
  );
}
