import Layout from '../../components/Layout';
import DestinationCard from '../../components/DestinationCard';
import {
  fetchStates,
  fetchStateBySlug,
  fetchDestinationsByState,
} from '../../lib/contentful';

export default function StatePage({ state, destinations }) {
  if (!state) return <Layout>State not found</Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">{state.fields.title}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map(dest => (
            <DestinationCard key={dest.sys.id} destination={dest} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const states = await fetchStates();

  const paths = states.map(state => ({
    params: { state: state.fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const state = await fetchStateBySlug(params.state);
  const destinations = await fetchDestinationsByState(state.sys.id);

  return {
    props: {
      state,
      destinations,
    },
  };
}
