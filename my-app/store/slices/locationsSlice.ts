// store/slices/locationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  color?: string;
}

interface LocationsState {
  favorites: Location[];
}

const initialState: LocationsState = {
  favorites: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Location[]>) {
      state.favorites = action.payload;
    },
    addFavorite(state, action: PayloadAction<Location>) {
      state.favorites.push(action.payload);
    },
  },
});

export const { setFavorites, addFavorite } = locationsSlice.actions;
export default locationsSlice.reducer;
