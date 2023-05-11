import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';


const initialState = {
  Personal: {
    upcoming: [
      {
        title: "Solve codeforces upcoming",
        timestamp: "12/08/2023 14:25",
        description:
          "I have to solve lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      },
      {
        title: "Solve leetcode",
        timestamp: "12/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "13/08/2023 14:25",
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
        timestamp: "11/08/2023 14:25",
        description: "I have to solve",
      },
      {
        title: "Solve leetcode",
        timestamp: "15/08/2023 14:25",
        description: "I have to solve",
        description: "I have to solve",
      },
      {
        title: "Solve codeforces",
        timestamp: "18/08/2023 14:25",
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
    initializeTask(state, actions) {
      state[actions.payload] = {
        upcoming: [],
        completed: [],
        missed: [],
        delayed: [],
      };
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

      var to = "upcoming";
      if (from === "delayed") to = "missed";

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

      var to = "completed";
      if (from === "missed") to = "delayed";

      state[category][to] = [...state[category][to], removedTask];
    },

    updateTask(state, actions) {
      const { category, from, task, oldTitle } = actions.payload;
      let indexToUpdate = state[category][from].findIndex(
        (obj) => obj.title === oldTitle
      );

      const currentDate = moment();
      const format = "DD/MM/YYYY HH:mm";
      const inputDate = moment(task.timestamp, format, true);

      if (inputDate.isAfter(currentDate)) {
        if (from === "missed") {
          let removedTask =
            indexToUpdate !== -1
              ? state[category].missed.splice(indexToUpdate, 1)[0]
              : null;

          state[category].upcoming = [...state[category].upcoming, removedTask];
        } else {
          if (indexToUpdate === -1) {
            console.log("Old title not found");
            state[category].upcoming = [...state[category].upcoming, task];
          } else {
            state[category].upcoming[indexToUpdate].title = task.title;
            state[category].upcoming[indexToUpdate].description = task.description;
            state[category].upcoming[indexToUpdate].timestamp = task.timestamp;
          }
        }
      } else {
        if (from === "upcoming") {
          let removedTask =
            indexToUpdate !== -1
              ? state[category].upcoming.splice(indexToUpdate, 1)[0]
              : null;

          state[category].missed = [...state[category].missed, removedTask];
        } else {
          if (indexToUpdate === -1) {
            console.log("Old title not found");
            state[category].missed = [...state[category].missed, task];
          } else {
            state[category].missed[indexToUpdate].title = task.title;
            state[category].missed[indexToUpdate].description = task.description;
            state[category].missed[indexToUpdate].timestamp = task.timestamp;
          }
        }
      }
      // OldTitle not found

      // if (indexToUpdate === -1) {
      //   console.log("Old title not found");
      //   state[category][from] = [...state[category][to], task];
      // } else {
      //   state[category][from][indexToUpdate].title = task.title;
      //   state[category][from][indexToUpdate].description = task.description;
      //   state[category][from][indexToUpdate].timestamp = task.timestamp;
      // }
    },
    moveToMissed(state, actions) {
      const { title, category } = actions.payload;

      let indexToMove = state[category].upcoming.findIndex(
        (task) => task.title === title
      );
      let MovedTask =
        indexToMove !== -1
          ? state[category].upcoming.splice(indexToMove, 1)[0]
          : null;

      state[category].missed = [...state[category].missed, MovedTask];
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

export const {
  initializeTask,
  addTask,
  markUndone,
  markDone,
  deleteTask,
  updateTask,
  moveToMissed,
} = task.actions;
export default task.reducer;
