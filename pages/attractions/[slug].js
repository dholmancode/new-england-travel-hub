import Layout from '../../components/Layout';
import RichTextRenderer from '../../components/RichTextRenderer';
import { fetchAttractions, fetchAttractionBySlug } from '../../lib/contentful';

export default function AttractionDetail({ attraction }) {
  const { title, image, description } = attraction.fields;
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {image && <img src={image.fields.file.url} alt={title} className="w-full h-64 object-cover mb-4" />}
      <RichTextRenderer richText={description} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const attractions = await fetchAttractions();
  const paths = attractions.map(att => ({ params: { slug: att.fields.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const attraction = await fetchAttractionBySlug(params.slug); // fetch only the attraction needed
  return { props: { attraction } };
}
