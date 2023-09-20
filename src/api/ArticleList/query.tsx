const gql = String.raw;

export const getNewsArticlesQuery = gql`
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

export const getWishesArticlesQuery = gql``;
