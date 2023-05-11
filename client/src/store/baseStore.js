import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoryStore";
import taskReducer from "./taskStore";
import userReducer from "./userStore";

const store = configureStore({
  reducer: {
    category : categoryReducer,
    task : taskReducer,
    user: userReducer
  },
});

export default store;
