import Layout from '../../components/Layout';
import RichTextRenderer from '../../components/RichTextRenderer';
import AttractionCard from '../../components/AttractionCard';
import { fetchDestinationBySlug, fetchAttractionsByDestination, fetchDestinations } from '../../lib/contentful';

export default function DestinationDetail({ destination, attractions }) {
  const { title, heroImage, description } = destination.fields;
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {heroImage && (
        <img src={heroImage.fields.file.url} alt={title} className="w-full h-64 object-cover mb-4" />
      )}
      <RichTextRenderer richText={description} />
      <h2 className="text-2xl font-bold mt-6 mb-4">Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attractions.map(att => (
          <AttractionCard key={att.sys.id} attraction={att} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const allDestinations = await fetchDestinations(); // fetch all destinations for paths
  const paths = allDestinations.map(d => ({ params: { slug: d.fields.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const destination = await fetchDestinationBySlug(params.slug);
  const attractions = await fetchAttractionsByDestination(destination.sys.id);
  return { props: { destination, attractions } };
}