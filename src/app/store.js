import { configureStore } from '@reduxjs/toolkit';
import slice from '../features/Store/Store';

export default configureStore({
  reducer: {
    store: slice,
  },
});
