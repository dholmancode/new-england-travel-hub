import { useEffect, useState } from "react";

export default function HeroSection({ title, subtitle, images = [], image }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine if we have multiple images or just one
  const imageArray = images.length > 0 ? images : image ? [image] : [];

  useEffect(() => {
    if (!imageArray || imageArray.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageArray.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageArray]);

  return (
    <div className="relative w-full h-[620px] flex items-center overflow-hidden">
      {/* Fade images */}
      {imageArray.map((img, idx) => {
        const url =
          img?.fields?.media?.fields?.file?.url ||
          (typeof img === "string" ? img : "/images/placeholder.jpg");

        return (
          <div
            key={idx}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000`}
            style={{
              backgroundImage: `url(${url.startsWith("http") ? url : `https:${url}`})`,
              opacity: idx === currentIndex ? 1 : 0,
            }}
          />
        );
      })}

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Text content */}
      <div
        className="relative z-10 px-6 md:px-12 text-left max-w-2xl"
        style={{ color: "var(--text-color)" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        {subtitle && (
          <p
            className="mt-4 text-lg md:text-xl"
            style={{ color: "var(--subtitle-text)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
