import { gql } from '@apollo/client';

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
      name
      latitude
      longitude
      color
      imageUrl
    }
  }
`;
