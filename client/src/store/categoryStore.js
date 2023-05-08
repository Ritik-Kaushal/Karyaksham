import { createSlice } from "@reduxjs/toolkit";

const initialState = {categories:["Personal","Professional"]};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state, actions){
        state.categories = [...state.categories, actions.payload];
    }
  },
});

export const { addCategory } = category.actions;
export default category.reducer;
