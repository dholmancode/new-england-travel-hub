import Layout from "../../components/Layout";
import HeroSection from "../../components/HeroSection";
import DestinationCard from "../../components/DestinationCard";
import { fetchStates, fetchStateBySlug, fetchDestinationsByState, fetchHeroImageByState } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function StatePage({ state, destinations, heroImage }) {
  return (
    <Layout>
      <HeroSection
        title={state.fields.title}
        subtitle=""
        image={
          heroImage?.fields.media?.fields?.file?.url
            ? `https:${heroImage.fields.media.fields.file.url}`
            : "/images/placeholder.jpg"
        }
      />

      {state.fields.description && (
        <div className="max-w-4xl mx-auto mt-6 px-4 text-gray-700">
          {documentToReactComponents(state.fields.description)}
        </div>
      )}

      <section className="mt-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Destinations in {state.fields.title}
        </h2>

        {destinations.length === 0 ? (
          <p className="text-center text-gray-500">No destinations yet in this state.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations.map((dest) => (
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
  const paths = states.map((s) => ({ params: { slug: s.fields.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const state = await fetchStateBySlug(params.slug);
  const destinations = await fetchDestinationsByState(state.sys.id);
  const heroImage = await fetchHeroImageByState(state.sys.id);

  return { props: { state, destinations, heroImage } };
}
