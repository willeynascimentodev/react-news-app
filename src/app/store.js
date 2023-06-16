import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../resources/login/login.slice';

export const store = configureStore({
  reducer: {
      login: loginReducer,
  },
});
