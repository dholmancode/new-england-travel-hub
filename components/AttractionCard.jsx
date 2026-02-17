export default function AttractionCard({ attraction }) {
  const { title, image, type } = attraction.fields;
  return (
    <div className="border rounded shadow p-4">
      {image && (
        <img
          src={image.fields.file.url}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="mt-1 italic">{type}</p>
    </div>
  );
}
