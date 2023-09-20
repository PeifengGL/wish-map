import storefront from 'api';
import {
  getArticlesQuery,
  getArticleByIdQuery,
  getReadMoreArticlesQuery,
} from './query';

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

export const getArticleById = async (id: string | undefined) => {
  if (id === undefined) {
    return;
  }
  const variables = {
    id: id,
  };
  const data = await storefront(getArticleByIdQuery, variables);
  return data.article;
};

export const getReadMoreArticles = async (handle: string) => {
  const variables = {
    handle: handle,
  };
  const data = await storefront(getReadMoreArticlesQuery, variables);
  return data.blog.articles.nodes;
};
