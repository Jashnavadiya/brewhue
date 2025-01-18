import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './slices/formDataSlice';

const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
});

export default store;
