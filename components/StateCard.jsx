import Link from 'next/link';

export default function StateCard({ state }) {
  const { title, heroImage, slug } = state.fields;

  return (
    <Link
      href={`/states/${slug}`}
      className="block border rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      {heroImage && (
        <div className="h-56 w-full overflow-hidden">
          <img
            src={
              heroImage.fields.file.url.startsWith('http')
                ? heroImage.fields.file.url
                : `https:${heroImage.fields.file.url}`
            }
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-2">
          View destinations →
        </p>
      </div>
    </Link>
  );
}
