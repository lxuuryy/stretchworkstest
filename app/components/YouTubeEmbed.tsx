type YouTubeEmbedProps = {
  /** The YouTube video id, e.g. "hrMfUCiuWO4" */
  id: string;
  title?: string;
  className?: string;
  /** Load the iframe immediately instead of lazily (use for above-the-fold/hero videos). */
  eager?: boolean;
};

// Responsive 16:9 YouTube embed framed to match the site's blue accent.
export default function YouTubeEmbed({ id, title = "StretchWorks video", className = "", eager = false }: YouTubeEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: "16 / 9",
        border: "1px solid rgba(24,163,221,0.35)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 50px rgba(24,163,221,0.18)",
      }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}
