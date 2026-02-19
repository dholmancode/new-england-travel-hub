import Layout from '../../../components/Layout';
import HeroSection from '../../../components/HeroSection';
import RichTextRenderer from '../../../components/RichTextRenderer';
import AttractionCard from '../../../components/AttractionCard';
import {
  fetchAttractions,
  fetchAttractionBySlug,
  fetchAttractionsByDestination,
} from '../../../lib/contentful';

export default function AttractionDetail({ attraction, otherAttractions }) {
  if (!attraction) return <Layout>Attraction not found</Layout>;

  const { title, image, destination, state, summary, description } = attraction.fields;

  const googleSearchQuery = encodeURIComponent(
    `${title} ${destination?.fields.title} ${state?.fields.title}`
  );
  const googleSearchUrl = `https://www.google.com/search?q=${googleSearchQuery}`;

  return (
    <Layout>
      <HeroSection
        title={title}
        subtitle={`${destination?.fields.title}, ${state?.fields.title}`}
        image={image?.fields.file.url || '/images/placeholder.jpg'}
      />

      <div className="max-w-4xl mx-auto p-6">
        {summary &&     <p className="mb-4 text-lg" style={{ color: 'var(--text-color)' }}>
{summary}</p>}
        {description && <RichTextRenderer richText={description} />}

        <div className="mt-6">
          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Learn more on Google
          </a>
        </div>

        {otherAttractions.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Other attractions in {destination?.fields.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherAttractions.map(att => (
                <AttractionCard key={att.sys.id} attraction={att} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const attractions = await fetchAttractions();

  const paths = attractions.map(att => ({
    params: {
      state: att.fields.state.fields.slug,
      destination: att.fields.destination.fields.slug,
      attraction: att.fields.slug,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const attraction = await fetchAttractionBySlug(params.attraction);

  let otherAttractions = [];
  if (attraction?.fields.destination?.sys?.id) {
    otherAttractions = await fetchAttractionsByDestination(
      attraction.fields.destination.sys.id
    );
    otherAttractions = otherAttractions.filter(
      att => att.sys.id !== attraction.sys.id
    );
  }

  return {
    props: {
      attraction,
      otherAttractions,
    },
  };
}
