export type ArticleData = {
  contentHtml: string;
  excerpt: string;
  handle: string;
  id: string;
  image: {
    url: string;
  };
  onlineStoreUrl: string;
  publishedAt: string;
  tags: [];
  title: string;
  blog: {
    handle: string;
    title: string;
  };
};

export type ArticleCardData = {
  id: string;
  image: { url: string };
  publishedAt: string;
  tags: string[];
  title: string;
  excerpt: string;
};
