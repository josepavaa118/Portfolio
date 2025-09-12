import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const token = process.env.REACT_APP_SANITY_TOKEN;

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn('[Sanity] Missing REACT_APP_SANITY_PROJECT_ID env var');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-10-01',
  useCdn: !token, // use CDN only when unauthenticated
  token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);