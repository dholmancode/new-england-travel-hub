import Layout from '../../components/Layout';
import StateCard from '../../components/StateCard';
import { fetchStates } from '../../lib/contentful';

export default function StatesPage({ states }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Explore States</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {states.map(state => (
            <StateCard key={state.sys.id} state={state} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const states = await fetchStates();

  return {
    props: { states },
  };
}
