import storefront from 'api';
import {
  createAccessTokenQuery,
  getCustomerInfoQuery,
  getCustomerOrdersQuery,
  updateCustomerQuery,
  getCustomerDefaultAddressQuery,
  updateCustomerAddressQuery,
  createCustomerAddressQuery,
  createCustomerAccountQuery,
  recoverCustomerQuery,
} from './query';

export const createCustomerAccount = async (
  username: string,
  email: string,
  password: string,
) => {
  const variables = {
    input: {
      acceptsMarketing: false,
      email: email,
      firstName: '',
      lastName: username,
      password: password,
    },
  };
  try {
    const data = await storefront(createCustomerAccountQuery, variables);
    return data.customerCreate;
  } catch (e) {
    console.log(e);
  }
};

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

export const createCustomerAddress = async (
  accessToken: string,
  address: { address1: string; city: string },
) => {
  const variables = {
    customerAccessToken: accessToken,
    address: address,
  };
  try {
    const data = await storefront(createCustomerAddressQuery, variables);
    return data.customerAddressCreate.customerAddress;
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

export const getCustomerDefaultAddress = async (token: string) => {
  const variables = {
    customerAccessToken: token,
  };
  try {
    const data = await storefront(getCustomerDefaultAddressQuery, variables);
    return data.customer.defaultAddress;
  } catch (e) {
    console.log(e);
  }
};

export const getCustomerOrders = async (token: string, cursor: string) => {
  const variables = {
    customerAccessToken: token,
    cursor: cursor === '' ? null : cursor,
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
    const data = await storefront(updateCustomerQuery, variables);
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
    const data = await storefront(updateCustomerQuery, variables);
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
    const data = await storefront(updateCustomerQuery, variables);
    return data.customerUpdate;
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomerAddress = async (
  accessToken: string,
  id: string,
  address: { address1: string; city: string },
) => {
  const variables = {
    customerAccessToken: accessToken,
    id: id,
    address: address,
  };
  try {
    const data = await storefront(updateCustomerAddressQuery, variables);
    return data.customerAddressUpdate.customerAddress;
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomerPassword = async (
  accessToken: string,
  password: string,
) => {
  const variables = {
    customerAccessToken: accessToken,
    customer: {
      password: password,
    },
  };
  try {
    const data = await storefront(updateCustomerQuery, variables);
    return data.customerUpdate;
  } catch (e) {
    console.log(e);
  }
};

export const recoverCustomer = async (email: string) => {
  const variables = {
    email: email,
  };
  try {
    const data = await storefront(recoverCustomerQuery, variables);
    return data.customerRecover;
  } catch (e) {
    console.log(e);
  }
};

export const checkIsVolunteer = async (email: string) => {
  console.log(`check ${email} Volunteer apply`);
  // call volunteer check api
  const posibility = false;
  return posibility;
};
