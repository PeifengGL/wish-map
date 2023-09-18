import storefront from 'api';
import { getNewsArticlesQuery } from './query';

export const getArticles = async () => {
  const data = await storefront(getNewsArticlesQuery, { tag: '' });
  return data.blog.articles.nodes;
};
