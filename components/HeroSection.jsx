'use client';

import Map from './Map';

export default function HeroSection({ title, subtitle, images = [], image, states }) {

  const heroImage = Array.isArray(images) && images.length
    ? images.find(img => img.fields?.title === "Hero")
    : image;

  const getUrl = (img) => {
    if (!img) return "/images/placeholder.jpg";
    if (typeof img === "string") return img;
    const contentfulUrl =
      img?.fields?.media?.fields?.file?.url ||
      img?.fields?.file?.url;
    if (!contentfulUrl) return "/images/placeholder.jpg";
    return contentfulUrl.startsWith("http")
      ? contentfulUrl
      : `https:${contentfulUrl}`;
  };

  const imageUrl = getUrl(heroImage);

  return (
    <div className="relative w-full md:h-[720px] h-[480px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-16 lg:px-24">
        
        {/* Hero Text */}
        <div className="md:w-1/2 text-left max-w-lg">
          <h1
            className="text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight"
            style={{ color: "var(--text-color)" }}
          >
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

        {/* Map Floating on Right */}
        <div className="hidden md:block md:w-1/2 flex">
  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-[450px] h-[600px]">
            <Map states={states} />
          </div>
        </div>

      </div>
    </div>
  );
}
