import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      native
      capital
      emoji
    }
  }
`;

export default GET_COUNTRIES;
