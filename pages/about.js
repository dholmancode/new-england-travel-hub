import Layout from '../components/Layout';
import { fetchAbout } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function About({ about }) {
  if (!about) return <Layout><p>Loading...</p></Layout>;

  const { title, subtitle, description, featuredImage } = about.fields;

  // Get image URL
  const imageUrl =
    featuredImage?.fields?.file?.url.startsWith('http')
      ? featuredImage.fields.file.url
      : `https:${featuredImage?.fields?.file?.url}`;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8">{subtitle}</p>
        )}

        {featuredImage && (
          <div className="mb-8 w-full max-h-[300px] md:max-h-[400px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={imageUrl}
              alt={title}
              className="w-1/4 h-1/4 object-cover"
            />
          </div>
        )}

        {description && (
          <div className="prose max-w-full">
            {documentToReactComponents(description)}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const about = await fetchAbout(); // fetches your Contentful About entry
  return {
    props: { about },
    revalidate: 60,
  };
}
