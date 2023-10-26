const gql = String.raw;

export const getProductsQuery = gql`
  query getProducts {
    collection(handle: "贊助願望") {
      products(first: 10) {
        nodes {
          id
          title
          onlineStoreUrl
          descriptionHtml
          description
          featuredImage {
            url
          }
          publishedAt
          updatedAt
        }
      }
    }
  }
`;
