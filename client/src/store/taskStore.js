import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Personal: {
    upcoming: [
      {
        title: "Solve codeforces upcoming",
        timestamp: "09/08/2023 14:25",
        description:
          "I have to solve lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      },
      {
        title: "Solve leetcode",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
    completed: [
      {
        title: "Solve codeforces completed",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve leetcode",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
    missed: [
      {
        title: "Solve codeforces missed",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve leetcode",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
    delayed: [
      {
        title: "Solve codeforces delayed",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve leetcode",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
  },
  Professional: {
    upcoming: [
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve leetcode",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
        description: "I have to solve",
      },
    ],
    completed: [
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve gfg",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
    missed: [
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve gfg",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
    delayed: [
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve gfg",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "09/08/2023 14:25",
        description: "I have to solve",
      },
    ],
  },
};

// const initialState = {}
const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    initializeTask(state,actions){
      state[actions.payload] = {upcoming:[],completed:[],missed:[],delayed:[]};
    },
    addTask(state, actions) {
      const category = actions.payload.category;
      state[category]["upcoming"] = [
        ...state[category]["upcoming"],
        actions.payload.task,
      ];
    },

    markUndone(state, actions) {
      const category = actions.payload.category;
      const toMarkUndone = actions.payload.title;
      const from = actions.payload.from;

      let indexToRemove = state[category][from].findIndex(
        (task) => task.title === toMarkUndone
      );
      let removedTask =
        indexToRemove !== -1
          ? state[category][from].splice(indexToRemove, 1)[0]
          : null;

          var to="upcoming";
          if(from==="delayed") to="missed";
    
          state[category][to] = [...state[category][to], removedTask];
    },

    markDone(state, actions) {
      const category = actions.payload.category;
      const from = actions.payload.from;
      const toMarkDone = actions.payload.title;

      let indexToRemove = state[category][from].findIndex(
        (task) => task.title === toMarkDone
      );
      let removedTask =
        indexToRemove !== -1
          ? state[category][from].splice(indexToRemove, 1)[0]
          : null;

      var to="completed";
      if(from==="missed") to="delayed";

      state[category][to] = [...state[category][to], removedTask];
    },

    updateTask(state, actions) {
      console.log(actions.payload)
      const { category, from, task, oldTitle } = actions.payload;
      let indexToUpdate = state[category][from].findIndex(
        (obj) => obj.title === oldTitle
      );

      // OldTitle not found
      if (indexToUpdate === -1) {
        console.log("Old title not found");
        state[category][from] = [...state[category].upcoming, task];
      } 
      else {
        state[category][from][indexToUpdate].title = task.title;
        state[category][from][indexToUpdate].description = task.description;
        state[category][from][indexToUpdate].timestamp = task.timestamp;
      }
    },

    deleteTask(state, actions) {
      const category = actions.payload.category;
      const toDelete = actions.payload.title;
      const from = actions.payload.from;

      state[category][from] = state[category][from].filter(
        (task) => task.title !== toDelete
      );
    },
  },
});

export const { initializeTask, addTask, markUndone, markDone, deleteTask, updateTask } = task.actions;
export default task.reducer;
