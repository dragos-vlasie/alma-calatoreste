// import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
// import type { CollectionEntry } from 'astro:content';
import type { Page } from '~/types'; // Assuming you have a Page type defined
// import { cleanSlug, trimSlash } from './permalinks';

// const generatePermalink = async ({ id, slug }: { id: string; slug: string }): Promise<string> => {
//   // Implement your permalink generation logic for pages here
// };

// const getNormalizedPage = async (page: CollectionEntry<'page'>): Promise<Page> => {
//   // Implement your normalization logic for pages here
// };

const loadPages = async function (): Promise<Array<Page>> {
  const pages = await getCollection('page');
  const normalizedPages = pages.map(async (page) => await getNormalizedPage(page));
  return await Promise.all(normalizedPages);
};

let _pages: Array<Page>;

export const fetchPages = async (): Promise<Array<Page>> => {
  if (!_pages) {
    _pages = await loadPages();
  }
  return _pages;
};

export const findPageBySlug = async (slug: string): Promise<Page | undefined> => {
  const pages = await fetchPages();
  return pages.find((page) => page.slug === slug);
};