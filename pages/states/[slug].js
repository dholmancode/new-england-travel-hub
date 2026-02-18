// pages/states/[slug].js
import Layout from '../../components/Layout';
import DestinationCard from '../../components/DestinationCard';
import HeroSection from '../../components/HeroSection';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { 
  fetchStates, 
  fetchStateBySlug, 
  fetchDestinationsByState 
} from '../../lib/contentful';

export default function StatePage({ state, destinations }) {
  const { title, heroImage, description } = state.fields;

  return (
    <Layout>
      {/* Hero Section */}
      {heroImage && (
        <HeroSection
          title={title}
          subtitle=""
          image={heroImage.fields.file.url}
        />
      )}

      {/* Optional description */}
      {description && (
        <div className="max-w-4xl mx-auto mt-6 px-4 text-gray-700">
          {documentToReactComponents(description)}
        </div>
      )}

      {/* Destinations */}
      <section className="mt-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Destinations in {title}
        </h2>

        {destinations.length === 0 ? (
          <p className="text-center text-gray-500">No destinations yet in this state.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations.map(dest => (
              <DestinationCard key={dest.sys.id} destination={dest} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const states = await fetchStates();
  const paths = states.map(s => ({ params: { slug: s.fields.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const state = await fetchStateBySlug(params.slug);
  const destinations = await fetchDestinationsByState(state.sys.id);
  return { props: { state, destinations } };
}
