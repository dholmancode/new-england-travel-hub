import Layout from '../../components/Layout';
import DestinationCard from '../../components/DestinationCard';
import HeroSection from '../../components/HeroSection';
import { fetchDestinations } from '../../lib/contentful';

export default function Destinations({ destinations }) {
  return (
    <Layout>
      <HeroSection
        title="Explore Destinations"
        subtitle="Discover the best places to visit in New England"
        image="/images/destinations.jpg" // ✅ just pass your string here
      />

      <h1 className="text-3xl font-bold m-6 mt-8">All Destinations</h1>
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
