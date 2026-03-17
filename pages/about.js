import Layout from '../components/Layout';
import { fetchAbout } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

export default function About({ about }) {
  if (!about) return <Layout><p>Loading...</p></Layout>;

  const { title, subtitle, description, featuredImage } = about.fields;

  // Get image URL safely
  const imageUrl =
    featuredImage?.fields?.file?.url?.startsWith('http')
      ? featuredImage.fields.file.url
      : `https:${featuredImage?.fields?.file?.url}`;

  // 🔥 Full rich text styling config
  const options = {
    renderNode: {
      // Headings
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl font-bold mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-semibold mb-4 mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
      ),

      // Paragraphs
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-base leading-relaxed">
          {children}
        </p>
      ),

      // Lists
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="ml-2">{children}</li>
      ),
    },
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-12">
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {subtitle}
          </p>
        )}

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 w-full max-h-[300px] md:max-h-[400px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Rich Text Content */}
        {description && (
          <div className="max-w-full">
            {documentToReactComponents(description, options)}
          </div>
        )}

      </div>
    </Layout>
  );
}

// ISR (Incremental Static Regeneration)
export async function getStaticProps() {
  const about = await fetchAbout();

  return {
    props: { about },
    revalidate: 60,
  };
}