'use server';

// shopify
import { getCollectionProducts } from '@/lib/shopify';

// types
import { Collection } from '.';

export const getProducts = async (collection: Collection, count = 5) => {
  return await getCollectionProducts({ collection, sortKey: 'BEST_SELLING', first: count });
};
