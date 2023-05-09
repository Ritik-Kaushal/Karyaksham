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

const task = createSlice({
  name: "task",
  initialState,
  reducers: {
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

      let indexToRemove = state[category].completed.findIndex(
        (task) => task.title === toMarkUndone
      );
      let removedTask =
        indexToRemove !== -1
          ? state[category].completed.splice(indexToRemove, 1)[0]
          : null;

      // check if it will go to upcoming or missed
      state[category].upcoming = [...state[category].upcoming, removedTask];
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

      // check if it will go to upcoming or missed
      state[category].completed = [...state[category].completed, removedTask];
    },

    updateTask(state, actions) {
      console.log(actions.payload)
      const { category, from, task, oldTitle } = actions.payload;
      let indexToUpdate = state[category][from].findIndex(
        (obj) => obj.title === oldTitle
      );

      // OldTitle not found
      if (indexToUpdate === -1) {
        // check if it will go to upcoming or missed
       alert(oldTitle);
        state[category].upcoming = [...state[category].upcoming, task];
      } else {
        // check if it will go to upcoming or missed
        state[category].upcoming[indexToUpdate].title = task.title;
        state[category].upcoming[indexToUpdate].description = task.description;
        state[category].upcoming[indexToUpdate].timestamp = task.timestamp;
      }
    },

    deleteTask(state, actions) {
      const category = actions.payload.category;
      const toDelete = actions.payload.title;
      const from = actions.payload.from;

      // check if it will go to upcoming or missed
      state[category][from] = state[category][from].filter(
        (task) => task.title !== toDelete
      );
    },
  },
});

export const { addTask, markUndone, markDone, deleteTask, updateTask } = task.actions;
export default task.reducer;
