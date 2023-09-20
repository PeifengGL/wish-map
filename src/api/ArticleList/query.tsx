const gql = String.raw;

export const getArticlesQuery = gql`
  query GetArticlesByTag($tag: String!, $cursor: String, $handle: String!) {
    blog(handle: $handle) {
      articles(
        first: 10
        reverse: true
        sortKey: PUBLISHED_AT
        query: $tag
        after: $cursor
      ) {
        nodes {
          id
          title
          excerpt
          tags
          publishedAt
          image {
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const getArticleByIdQuery = gql`
  query GetArticleById($id: ID!) {
    article(id: $id) {
      contentHtml
      excerpt
      handle
      id
      image {
        url
      }
      publishedAt
      title
      tags
      blog {
        handle
        title
      }
      onlineStoreUrl
    }
  }
`;

export const getReadMoreArticlesQuery = gql`
  query GetArticlesByTag($handle: String!) {
    blog(handle: $handle) {
      articles(first: 4, reverse: true, sortKey: PUBLISHED_AT) {
        nodes {
          id
          title
          excerpt
          tags
          publishedAt
          image {
            url
          }
        }
      }
    }
  }
`;
