import Link from 'next/link';

export default function AttractionCard({ attraction }) {
  const { title, summary, destination, state, image, slug } = attraction.fields;

  return (
    <Link
          href={`/${state?.fields.slug}/${destination?.fields.slug}/${slug}`}
      className="block border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image.fields.file.url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>

        {/* Location line */}
        {(destination || state) && (
          <p className="mt-1 text-gray-500 text-xs uppercase tracking-wide">
            📍 {destination?.fields.title}
            {destination && state && ', '}
            {state?.fields.title}
          </p>
        )}

        <p className="mt-2 text-gray-700 flex-grow">{summary}</p>

        <span className="mt-4 text-blue-600 font-medium hover:underline">
          Explore →
        </span>
      </div>
    </Link>
  );
}