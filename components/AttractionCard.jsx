import Link from 'next/link';

export default function AttractionCard({ attraction }) {
  const { title, summary, destination, state, image, slug } = attraction.fields;

  return (
    <Link
      href={`/${state?.fields.slug}/${destination?.fields.slug}/${slug}`}
      className="block rounded-xl shadow-md overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
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
        <h3 className="text-xl font-bold" style={{ color: 'var(--card-text)' }}>{title}</h3>

        {(destination || state) && (
          <p className="mt-1 text-xs uppercase tracking-wide" style={{ color: 'var(--subtitle-text)' }}>
            📍 {destination?.fields.title}
            {destination && state && ', '}
            {state?.fields.title}
          </p>
        )}

        <p className="mt-2 flex-grow" style={{ color: 'var(--card-text)' }}>{summary}</p>

        <span className="mt-4 font-medium hover:underline" style={{ color: '#2e9588' }}>
          Explore →
        </span>
      </div>
    </Link>
  );
}
