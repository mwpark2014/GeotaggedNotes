import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGMapInitialized: false,
};

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    initGMap(state) {
      state.isGMapInitialized = true;
    },
  },
});

export const { initGMap } = geoSlice.actions;

export default geoSlice.reducer;
