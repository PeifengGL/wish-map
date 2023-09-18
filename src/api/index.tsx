const API_URL = 'https://make-a-wish-tw.myshopify.com/api/2023-07/graphql.json';
const ACCESS_TOKEN = 'e7d291f1679061ac098149752e26f6b3';

const storefront = async (query: string, variables: object) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const { data } = await response.json();
  return data;
};

export default storefront;
