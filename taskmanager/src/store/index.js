import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './task';
import authReducer from './auth';


const store = configureStore({
  reducer: { task: taskReducer, auth: authReducer },
});

export default store;