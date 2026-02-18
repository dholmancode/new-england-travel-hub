import Link from 'next/link';

export default function DestinationCard({ destination }) {
  const { title, summary, heroImage, slug, state } = destination.fields;

  return (
    <Link
      href={`/${state?.fields.slug}/${slug}`}
      className="block border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      {/* Fixed image container */}
      {heroImage && (
        <div className="h-48 md:h-56 w-full overflow-hidden">
          <img
            src={heroImage.fields.file.url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Card content */}
      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-bold">{title}</h2>

        {/* Styled state text (not separately clickable) */}
        {state && (
          <p className="mt-1 text-gray-500 text-xs uppercase tracking-wide">
            📍 {state.fields.title}
          </p>
        )}

        <p className="mt-2 text-gray-700 flex-grow">{summary}</p>

        <span className="mt-4 text-blue-600 font-medium hover:underline">
          Learn More →
        </span>
      </div>
    </Link>
  );
}
