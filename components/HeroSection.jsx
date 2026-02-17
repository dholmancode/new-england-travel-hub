import Link from 'next/link';

export default function HeroSection({ title, subtitle, image }) {
  return (
    <div
      className="relative w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="text-white mt-2">{subtitle}</p>}

        <Link
          href="/destinations"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          See Destinations
        </Link>
      </div>
    </div>
  );
}
