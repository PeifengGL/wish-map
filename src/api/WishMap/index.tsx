import storefront from 'api';
import { getProductsQuery } from './query';
import { ProjectsDataType } from 'shared/project.data';
import Localization from './localization.json';

const getAge = () => {
  const rand = 4 + Math.floor(Math.random() * 9);
  return rand;
};

const randomCoordinate = (latitude: string, longitude: string) => {
  const offsets = [
    { latitude: 0.005, longtitude: 0 },
    { latitude: 0, longtitude: 0.005 },
    { latitude: 0, longtitude: -0.005 },
    { latitude: -0.005, longtitude: 0 },
    { latitude: 0, longtitude: 0 },
  ];
  const offset = offsets[Math.floor(Math.random() * 5)];
  return {
    latitude: parseFloat(latitude) + offset.latitude,
    longtitude: parseFloat(longitude) + offset.longtitude,
  };
};

const coordinates = Localization.coordinates;
const randomCoordinates = coordinates.filter(() => {
  return Math.random() >= 0.5;
});
const fakeData = randomCoordinates.length;

export const getProducts = async () => {
  try {
    const variables = {};
    const data = await storefront(getProductsQuery, variables);
    const products = data.collection.products.nodes;
    const LEN = Math.floor(fakeData / products.length);
    const projectsData: ProjectsDataType[] = products.map(
      (product: any, index: number) => {
        const projectDataArray = [];
        for (let i = 0; i < LEN; i++) {
          const coordinate = randomCoordinates[LEN * index + i];
          const coordinateOffset = randomCoordinate(
            coordinate.latitude,
            coordinate.longitude,
          );
          projectDataArray.push({
            // id: product.id,
            id: `${product.id}${i}`,
            latitude: coordinateOffset.latitude,
            longitude: coordinateOffset.longtitude,
            age: getAge(),
            city_country: coordinate.city,
            district: coordinate.district,
            title: product.title,
            total_donation: 100,
            donation_received: 50,
            description: product.descriptionHtml,
            cover_image: { uri: product.featuredImage.url },
            donate_url: product.onlineStoreUrl,
          });
        }
        return projectDataArray;
      },
    );
    return projectsData.flat();
  } catch (e) {
    console.log(e);
  }
};
