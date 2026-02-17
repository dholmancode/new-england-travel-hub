import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch all destinations
export const fetchDestinations = async () => {
  const entries = await client.getEntries({ content_type: "destination" });
  return entries.items;
};

// Fetch a single destination by slug
export const fetchDestinationBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: "destination",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0]; // single destination
};

// Fetch all attractions
export const fetchAttractions = async () => {
  const entries = await client.getEntries({ content_type: "attraction" });
  return entries.items;
};

// Fetch a single attraction by slug
export const fetchAttractionBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: "attraction",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0]; // single attraction
};

// Fetch attractions belonging to a specific destination
export const fetchAttractionsByDestination = async (destinationId) => {
  const entries = await client.getEntries({
    content_type: "attraction",
    "fields.destination.sys.id": destinationId,
  });
  return entries.items;
};
