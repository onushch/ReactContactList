import { createSlice } from "@reduxjs/toolkit";
import { initialStatuses } from "../data/initialData";

const loadStatuses = () => {
  const saved = localStorage.getItem("statuses");
  return saved ? JSON.parse(saved) : initialStatuses;
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState: loadStatuses(),
  reducers: {
    addStatus: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("statuses", JSON.stringify(state));
    },
    updateStatus: (state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.data };
        localStorage.setItem("statuses", JSON.stringify(state));
      }
    },
    deleteStatus: (state, action) => {
      const newState = state.filter((s) => s.id !== action.payload);
      localStorage.setItem("statuses", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addStatus, updateStatus, deleteStatus } = statusesSlice.actions;
export default statusesSlice.reducer;