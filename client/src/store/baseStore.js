import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoryStore";

const store = configureStore({
  reducer: {
    category : categoryReducer,
  },
});

export default store;
