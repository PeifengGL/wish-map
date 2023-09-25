import storefront from 'api';
import { createAccessTokenQuery, getCustomerInfoQuery } from './query';
// Login -> Email + Password -> getToken ->
// (localStorage?) -> getInfoByToken -> getOrder ->

export const createCustomerAccessToken = async (
  email: string,
  password: string,
) => {
  const variables = {
    input: {
      email: email,
      password: password,
    },
  };
  try {
    const data = await storefront(createAccessTokenQuery, variables);
    return data.customerAccessTokenCreate;
  } catch (e) {
    console.log(e);
  }
};

export const getCustomerInfo = async (token: string) => {
  const variables = {
    customerAccessToken: token,
  };
  try {
    const data = await storefront(getCustomerInfoQuery, variables);
    return data.customer;
  } catch (e) {
    console.log(e);
  }
};

export const updateAccessToken = () => {};

export const getCustomerOrder = () => {};

export const updateCustomerInfo = () => {};
