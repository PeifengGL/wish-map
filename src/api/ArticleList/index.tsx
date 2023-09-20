import storefront from 'api';
import { getNewsArticlesQuery } from './query';

export const getArticles = async (tag: string, cursor: string, tab: string) => {
  let handle;

  if (tab === 'message') {
    handle = 'news';
  } else if (tab === 'journey') {
    handle = '圓夢分享';
  }
  const variables = {
    tag: tag === '所有貼文' ? '' : tag,
    cursor: cursor === '' ? null : cursor,
    handle: handle,
  };
  const data = await storefront(getNewsArticlesQuery, variables);
  return data.blog.articles;
};
