import storefront from 'api';
import { getProductsQuery } from './query';
import { ProjectsDataType } from 'shared/project.data';

const getLatitude = () => {
  const latitudes = [
    25.036919, 25.078267, 24.973932, 24.969929, 24.962273, 25.055042, 25.020061,
  ];
  const rand = Math.floor(Math.random() * 7);
  return latitudes[rand];
};

const getLongitude = () => {
  const longtitudes = [
    121.571801, 121.55144, 121.530429, 121.545897, 121.511342, 121.511563,
    121.55548,
  ];
  const rand = Math.floor(Math.random() * 7);
  return longtitudes[rand];
};

const getAge = () => {
  const rand = 4 + Math.floor(Math.random() * 9);
  return rand;
};

export const getProducts = async () => {
  try {
    const variables = {};
    const data = await storefront(getProductsQuery, variables);
    const products = data.collection.products.nodes;
    const projectsData: ProjectsDataType[] = products.map((product: any) => {
      const projectDataArray = [];
      for (let i = 0; i < 8; i++) {
        projectDataArray.push({
          // id: product.id,
          id: `${product.id}${i}`,
          latitude: getLatitude(),
          longitude: getLongitude(),
          age: getAge(),
          city_country: '台北市',
          district: '中山區',
          title: product.title,
          total_donation: 100,
          donation_received: 50,
          description: product.descriptionHtml,
          cover_image: { uri: product.featuredImage.url },
          donate_url: product.onlineStoreUrl,
        });
      }
      return projectDataArray;
    });
    return projectsData.flat();
  } catch (e) {
    console.log(e);
  }
};
