import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../resources/login/login.slice';
import filterReducer from '../resources/filter/filter.slice';

export const store = configureStore({
  reducer: {
      login: loginReducer,
      filter: filterReducer,
  },
});
