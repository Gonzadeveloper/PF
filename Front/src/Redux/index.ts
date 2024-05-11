import { configureStore } from '@reduxjs/toolkit';
import articlesreducers from './Slices/ArticlesSlice';

const store = configureStore({
  reducer: {
    articles: articlesreducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;