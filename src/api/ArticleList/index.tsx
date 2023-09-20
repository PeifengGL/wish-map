import storefront from 'api';
import { getArticlesQuery } from './query';

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
  const data = await storefront(getArticlesQuery, variables);
  return data.blog.articles;
};
