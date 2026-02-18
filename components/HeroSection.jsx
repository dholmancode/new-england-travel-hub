import Link from 'next/link';

export default function HeroSection({ title, subtitle, image }) {
  return (
    <div
      className="relative w-full h-[420px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-gray-200">{subtitle}</p>
        )}

        {/* Primary navigation choices */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/states"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            States
          </Link>

          <Link
            href="/destinations"
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
          >
            Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
