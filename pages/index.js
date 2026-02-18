import { useState } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AttractionCard from '../components/AttractionCard';
import { fetchFeaturedAttractions, fetchStates } from '../lib/contentful';

export default function Home({ attractions, states }) {
  const [selectedState, setSelectedState] = useState('');

  const filteredAttractions = selectedState
    ? attractions.filter(
        att => att.fields.destination?.fields.state?.sys?.id === selectedState
      )
    : attractions;

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Explore New England"
        subtitle="Discover destinations, attractions, and travel tips"
        image="/images/placeholder.jpg"
      />

      {/* Search & State Filter */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        {/* Search */}
        <div className="mb-6">
          <label htmlFor="search" className="sr-only">Search attractions</label>
          <input
            id="search"
            type="text"
            placeholder="Search attractions, destinations..."
            className="w-full p-3 border rounded-lg shadow-sm"
            onChange={e => console.log(e.target.value)} // We'll hook this up later
          />
        </div>

        {/* State Dropdown */}
        <div className="mb-6">
          <label htmlFor="state-select" className="sr-only">Filter by State</label>
          <select
            id="state-select"
            className="w-full p-3 border rounded-lg shadow-sm"
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state.sys.id} value={state.sys.id}>
                {state.fields.title}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Interactive Map */}
        <div className="hidden md:block mb-12">
          <p className="text-gray-500 mb-2">
            Click a state on the map to filter attractions:
          </p>
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">[Interactive Map Placeholder]</span>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Featured Attractions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAttractions.map(att => (
            <AttractionCard key={att.sys.id} attraction={att} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const attractions = await fetchFeaturedAttractions();
  const states = await fetchStates();
  return { props: { attractions, states } };
}
