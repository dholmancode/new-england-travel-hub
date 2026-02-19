'use client';

import Map from './Map'; // make sure this points to your Map component

export default function HeroSection({ title, subtitle, images = [], image }) {
  // Find the "Hero" image in your images array
  const heroImage = images.find(
    (img) => img.fields?.title === "Hero"
  ) || image;

  const getUrl = (img) => {
    if (!img) return "/images/placeholder.jpg";
    const url =
      img?.fields?.media?.fields?.file?.url ||
      img?.fields?.file?.url ||
      (typeof img === "string" ? img : "/images/placeholder.jpg");
    return url.startsWith("http") ? url : `https:${url}`;
  };

  const imageUrl = getUrl(heroImage);

  return (
    <div className="relative w-full md:h-[720px] h-[320px] overflow-hidden">
      {/* Hero Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center md:px-30">
        {/* Text on Left */}
        <div className="lg:w-1/2 text-center md:text-left max-w-lg">
          <h1 className="text-nowrap text-4xl md:text-6xl font-bold drop-shadow-lg" style={{ color: "var(--text-color)" }}>
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-4 text-lg md:text-xl drop-shadow"
              style={{ color: "var(--subtitle-text)" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Map on Right */}
        <div className="hero-map md:w-1/2 w-full h-[400px] md:h-[500px] mt-10 md:mt-0">
          <Map />
        </div>
      </div>
    </div>
  );
}
