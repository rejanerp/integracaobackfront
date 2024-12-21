const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    cities: [City]
    city(id: ID!): City
    favorites: [Favorite]
  }

  type City {
    id: ID
    name: String
    state: String
  }

  type Favorite {
    id: ID
    name: String
    latitude: Float
    longitude: Float
    color: String
    imageUrl: String
  }

  type Mutation {
    addCity(name: String!, state: String!): City
    addFavorite(name: String!, latitude: Float!, longitude: Float!, color: String, imageUrl: String): Favorite
  }
`;

module.exports = typeDefs;
