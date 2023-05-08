import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoryStore";
import taskReducer from "./taskStore";

const store = configureStore({
  reducer: {
    category : categoryReducer,
    task : taskReducer
  },
});

export default store;
