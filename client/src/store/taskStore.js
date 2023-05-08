import { createSlice } from "@reduxjs/toolkit";

const initialState = {"Personal" : {"upcoming":[{"title":"Solve leetcode", "timestamp" : "08-05-2023 23:59","description":"I have to solve"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59","description":"I have to solve"}],
                                    "completed":[{"title":"Solve leetcode", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}],
                                    "missed":[{"title":"Solve leetcode", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}],
                                    "delayed":[{"title":"Solve leetcode", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}]},
                      "Professional":{"upcoming":[{"title":"Solve leetcode", "timestamp" : "08-05-2023 23:59","description":"I have to solve"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59","description":"I have to solve"}],
                                      "completed":[{"title":"Solve gfg", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}],
                                      "missed":[{"title":"Solve gfg", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}],
                                      "delayed":[{"title":"Solve gfg", "timestamp" : "08-05-2023 23:59"},{"title":"Solve codeforces", "timestamp" : "08-05-2023 23:59"}]}};

const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    addtask(state, actions){
        // const category = actions.payload.category;
        // state[category] = [...state[category], actions.payload];
    }
  },
});

export const { addtask } = task.actions;
export default task.reducer;
