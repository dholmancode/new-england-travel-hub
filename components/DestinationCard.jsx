import Link from 'next/link';

export default function DestinationCard({ destination }) {
  const { title, summary, heroImage, slug, state } = destination.fields;

  return (
    <Link
      href={`/${state?.fields.slug}/${slug}`}
      className="block rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      {heroImage && (
        <div className="h-48 md:h-56 w-full overflow-hidden">
          <img
            src={heroImage.fields.file.url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-bold" style={{ color: 'var(--card-text)' }}>{title}</h2>

        {state && (
          <p className="mt-1 text-xs uppercase tracking-wide" style={{ color: 'var(--subtitle-text)' }}>
            📍 {state.fields.title}
          </p>
        )}

        <p className="mt-2 flex-grow" style={{ color: 'var(--card-text)' }}>{summary}</p>

        <span className="mt-4 font-medium hover:underline" style={{ color: '#2e9588' }}>
          Learn More →
        </span>
      </div>
    </Link>
  );
}
