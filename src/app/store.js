import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../resources/login/login.slice';
import filterReducer from '../resources/filter/filter.slice';
import articleReducer from '../resources/article/article.slice';

export const store = configureStore({
  reducer: {
      login: loginReducer,
      filter: filterReducer,
      article: articleReducer,
  },
});
