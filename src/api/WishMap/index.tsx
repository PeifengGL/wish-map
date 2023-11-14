import storefront from 'api';
import { getProductsQuery } from './query';
import { ProjectsDataType } from 'shared/project.data';
import Localization from './localization.json';

const coordinates = Localization.coordinates;

const getAge = () => {
  const rand = 4 + Math.floor(Math.random() * 9);
  return rand;
};

const randomCoordinate = (latitude: string, longitude: string) => {
  const offsets = [
    { latitude: 0, longtitude: 0 },
    { latitude: 0.005, longtitude: 0 },
    { latitude: 0, longtitude: 0.005 },
    { latitude: 0, longtitude: -0.005 },
    { latitude: -0.005, longtitude: 0 },
  ];
  const offset = offsets[Math.floor(Math.random() * 5)];
  return {
    latitude: parseFloat(latitude) + offset.latitude,
    longtitude: parseFloat(longitude) + offset.longtitude,
  };
};

const getCoordinate = (zip: string) => {
  const matchCoordinate = coordinates.find(
    coordinate => coordinate.zip === zip,
  );
  return matchCoordinate;
};

const getRandomCoordinate = () => {
  const randomIndex = Math.floor(Math.random() * 10);
  return coordinates[randomIndex];
};

export const getProducts = async () => {
  try {
    const variables = {};
    const data = await storefront(getProductsQuery, variables);
    const products = data.collection.products.nodes;
    const projectsData: ProjectsDataType[] = products.map((product: any) => {
      const tags = product.tags;
      const zipIndex = tags.findIndex((item: string) => /^\d{3}$/.test(item));
      const productCoordinate =
        zipIndex === -1
          ? getRandomCoordinate()
          : getCoordinate(tags[zipIndex])!;
      const project = {
        id: product.id,
        latitude: parseFloat(productCoordinate.latitude),
        longitude: parseFloat(productCoordinate.longitude),
        age: getAge(),
        city_country: productCoordinate.city,
        district: productCoordinate.district,
        title: product.title,
        total_donation: 100,
        donation_received: 50,
        description: product.descriptionHtml,
        cover_image: { uri: product.featuredImage.url },
        donate_url: product.onlineStoreUrl,
      };
      return project;
    });
    return projectsData;
  } catch (e) {
    console.log(e);
  }
};
