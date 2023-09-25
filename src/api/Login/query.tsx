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
      }
    }
  }
`;
