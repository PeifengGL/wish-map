const gql = String.raw;

export const getNewsArticlesQuery = gql`
  query GetArticlesByTag($tag: String!, $cursor: String) {
    blog(handle: "news") {
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
