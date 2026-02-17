import Layout from '../../components/Layout';
import DestinationCard from '../../components/DestinationCard';
import { fetchDestinations } from '../../lib/contentful';

export default function Destinations({ destinations }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">All Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map(dest => (
          <DestinationCard key={dest.sys.id} destination={dest} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const destinations = await fetchDestinations();
  return { props: { destinations }, revalidate: 60 };
}
