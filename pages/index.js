// pages/index.js
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import DestinationCard from '../components/DestinationCard';

// Mock destination list
const featuredDestinations = [
  {
    title: "Acadia National Park",
    summary: "Scenic hiking, carriage roads, and coastal views in Maine.",
    heroImage: "/images/acadia.jpg",
    slug: "acadia-national-park"
  },
  {
    title: "Cape Cod & Islands",
    summary: "Historic beach towns, ferries to Martha's Vineyard & Nantucket.",
    heroImage: "/images/cape-cod.jpg",
    slug: "cape-cod-islands"
  },
  {
    title: "Mystic, Connecticut",
    summary: "Maritime history and charming village life.",
    heroImage: "/images/mystic.jpg",
    slug: "mystic-connecticut"
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Explore New England"
        subtitle="Discover destinations, attractions, and travel tips"
        image="/images/placeholder.jpg"
      />

      {/* Featured Destinations */}
      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Featured Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredDestinations.map(dest => (
            <DestinationCard
              key={dest.slug}
              destination={{
                fields: {
                  title: dest.title,
                  summary: dest.summary,
                  heroImage: {
                    fields: {
                      file: { url: dest.heroImage }
                    }
                  },
                  slug: dest.slug
                }
              }}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
