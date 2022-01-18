import { configureStore } from '@reduxjs/toolkit';

import geoReducer from '../features/geo/geoSlice';

const store = configureStore({
  reducer: {
    geo: geoReducer,
  },
});

export default store;
