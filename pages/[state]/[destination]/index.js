import Layout from '../../../components/Layout';
import HeroSection from '../../../components/HeroSection';
import RichTextRenderer from '../../../components/RichTextRenderer';
import AttractionCard from '../../../components/AttractionCard';
import {
  fetchDestinations,
  fetchDestinationBySlug,
  fetchAttractionsByDestination,
} from '../../../lib/contentful';

export default function DestinationDetail({ destination, attractions }) {
  if (!destination) return <Layout>Destination not found</Layout>;

  const { title, heroImage, state, summary, description } = destination.fields;

  return (
    <Layout>
      <HeroSection
        title={title}
        subtitle={state?.fields.title}
        image={heroImage?.fields.file.url || '/images/placeholder.jpg'}
      />

      <div className="max-w-4xl mx-auto p-6">
        {summary && <p className="mb-4 text-lg text-gray-700">{summary}</p>}
        {description && <RichTextRenderer richText={description} />}

        {attractions.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Attractions in {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {attractions.map(att => (
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
  const destinations = await fetchDestinations();

  const paths = destinations.map(dest => ({
    params: {
      state: dest.fields.state.fields.slug,
      destination: dest.fields.slug,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const destination = await fetchDestinationBySlug(params.destination);

  let attractions = [];
  if (destination?.sys?.id) {
    attractions = await fetchAttractionsByDestination(destination.sys.id);
  }

  return {
    props: {
      destination,
      attractions,
    },
  };
}
