const cities = require('./data/cities');
const favorites = require('./data/favorites');

const resolvers = {
  Query: {
    cities: () => cities,
    city: (_, { id }) => cities.find((city) => city.id === parseInt(id)),
    favorites: () => favorites,
  },
  Mutation: {
    addCity: (_, { name, state }) => {
      const newCity = {
        id: cities.length + 1,
        name,
        state,
      };
      cities.push(newCity);

      // Também adiciona a cidade aos favoritos
      const newFavorite = {
        id: favorites.length + 1,
        name: newCity.name,
        latitude: 0,
        longitude: 0,
        color: 'blue',
        imageUrl: ''
      };
      favorites.push(newFavorite);

      return newCity;
    },
    addFavorite: (_, { name, latitude, longitude, color, imageUrl }) => {
      const newFavorite = {
        id: favorites.length + 1,
        name,
        latitude,
        longitude,
        color,
        imageUrl,
      };
      favorites.push(newFavorite);
      return newFavorite;
    },
  },
};

module.exports = resolvers;
