import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function RichTextRenderer({ richText }) {
  return <div>{documentToReactComponents(richText)}</div>;
}
