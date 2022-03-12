import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      name
      code
      emoji
    }
  }
`;

export default GET_COUNTRIES;
