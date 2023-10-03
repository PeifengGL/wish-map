const gql = String.raw;

export const createAccessTokenQuery = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const getCustomerInfoQuery = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      id
      lastName
      createdAt
      displayName
      numberOfOrders
      phone
      defaultAddress {
        city
        company
        country
        address1
        address2
        countryCodeV2
        zip
        phone
      }
    }
  }
`;

export const getCustomerOrdersQuery = gql`
  query getCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 6, reverse: true, sortKey: PROCESSED_AT) {
        nodes {
          name
          email
          phone
          billingAddress {
            city
            address1
            name
            phone
          }
          originalTotalPrice {
            amount
            currencyCode
          }
          processedAt
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const customerUpdateQuery = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
        displayName
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
