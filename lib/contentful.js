// contentful.jsx

import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// --- STATES ---
export const fetchStates = async () => {
  const entries = await client.getEntries({ content_type: "state" });
  return entries.items;
};

export const fetchStateBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: "state",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
};

// --- DESTINATIONS ---
export const fetchDestinations = async () => {
  const entries = await client.getEntries({ content_type: "destination" });
  return entries.items;
};

export const fetchDestinationBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: "destination",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
};

export const fetchDestinationsByState = async (stateId) => {
  const entries = await client.getEntries({
    content_type: "destination",
    "fields.state.sys.id": stateId,
  });
  return entries.items;
};

// --- ATTRACTIONS ---
export const fetchAttractions = async () => {
  const entries = await client.getEntries({ content_type: "attraction" });
  return entries.items;
};

export const fetchAttractionBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: "attraction",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
};

export const fetchAttractionsByDestination = async (destinationId) => {
  const entries = await client.getEntries({
    content_type: "attraction",
    "fields.destination.sys.id": destinationId,
  });
  return entries.items;
};

// Optional: featured attractions boolean
export const fetchFeaturedAttractions = async () => {
  const entries = await client.getEntries({
    content_type: "attraction",
    "fields.featured": true, // add featured boolean in CMS if desired
  });
  return entries.items;
};

// --- HERO IMAGE ---
export const fetchHeroImages = async () => {
  const entries = await client.getEntries({
    content_type: "heroImage",
    limit: 10, // fetch all hero images for the homepage slideshow
  });
  return entries.items;
};

// Optionally fetch by state
export const fetchHeroImageByState = async (stateId) => {
  const entries = await client.getEntries({
    content_type: "heroImage",
    "fields.state.sys.id": stateId,
    limit: 1,
  });
  return entries.items[0]; // returns single hero image
};


export async function fetchAbout() {
  const entries = await client.getEntries({
    content_type: 'about',
    limit: 1,
  });
  return entries.items[0] || null;
}