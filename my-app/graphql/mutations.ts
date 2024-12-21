import { gql } from '@apollo/client';

export const ADD_CITY = gql`
  mutation AddCity($name: String!, $state: String!) {
    addCity(name: $name, state: $state) {
      id
      name
      state
    }
  }
`;
