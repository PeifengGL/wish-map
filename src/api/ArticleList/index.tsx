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

export const getArticleById = async (id: string) => {
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

export const getTagsByTab = (activeTab: string) => {
  if (activeTab === 'message') {
    const tags = [
      { name: '所有貼文' },
      { name: '最新消息' },
      { name: '宣傳合作' },
      { name: '愛的延續' },
      { name: '活動花絮' },
      { name: '我想成為' },
    ];
    return tags;
  } else if (activeTab === 'journey') {
    const tags = [
      { name: '所有貼文' },
      { name: '圓夢剪影' },
      { name: '我想成為' },
      { name: '我想擁有' },
      { name: '我想要去' },
      { name: '我想要見' },
    ];
    return tags;
  }
};
