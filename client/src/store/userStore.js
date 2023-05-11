import { createSlice } from "@reduxjs/toolkit";

const initialState = {logged_in : false, username:"", profile_pic:"https://ik.imagekit.io/pqymxdgbi/avtar.png"};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, actions){
      console.log(actions.payload)
        state.logged_in = true;
        state.username = actions.payload;
        state.profile_pic = `https://ui-avatars.com/api/?name=${actions.payload}&background=random`;
    },
    logout(state,actions){
        state.logged_in = false;
        state.username = "";
        state.profile_pic = "https://ik.imagekit.io/pqymxdgbi/avtar.png";
    }
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
