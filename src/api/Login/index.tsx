import storefront from 'api';
import {
  createAccessTokenQuery,
  getCustomerInfoQuery,
  getCustomerOrdersQuery,
  customerUpdateQuery,
} from './query';

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

export const getCustomerOrders = async (token: string) => {
  const variables = {
    customerAccessToken: token,
  };
  try {
    const data = await storefront(getCustomerOrdersQuery, variables);
    return data.customer.orders;
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomerUsername = async (
  accessToken: string,
  username: string,
) => {
  const variables = {
    customerAccessToken: accessToken,
    customer: {
      lastName: username,
      firstName: '',
    },
  };
  try {
    const data = await storefront(customerUpdateQuery, variables);
    return data.customerUpdate.customer;
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomerEmail = async (
  accessToken: string,
  email: string,
) => {
  const variables = {
    customerAccessToken: accessToken,
    customer: {
      email: email,
    },
  };
  try {
    const data = await storefront(customerUpdateQuery, variables);
    return data.customerUpdate.customer;
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomerPhone = async (
  accessToken: string,
  phone: string,
) => {
  const variables = {
    customerAccessToken: accessToken,
    customer: {
      phone: phone,
    },
  };
  try {
    const data = await storefront(customerUpdateQuery, variables);
    return data.customerUpdate.customer;
  } catch (e) {
    console.log(e);
  }
};

export const updateAccessToken = () => {};

export const updateCustomerInfo = () => {};
