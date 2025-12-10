// src/features/goals/goalSlice.ts
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Goal {
  id: string;
  goalText: string;
  completed: boolean;
}

interface GoalsState {
  goalsArray: Goal[];
}

const initialState: GoalsState = {
  goalsArray: [],
};

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<{ id: string; goalText: string }>) => {
      state.goalsArray.push({ ...action.payload, completed: false });
    },
    removeGoal: (state, action: PayloadAction<{ id: string }>) => {
      state.goalsArray = state.goalsArray.filter((g) => g.id !== action.payload.id);
    },
    updateGoal: (state, action: PayloadAction<{ id: string; goalText: string }>) => {
      const goal = state.goalsArray.find((g) => g.id === action.payload.id);
      if (goal) goal.goalText = action.payload.goalText;
    },
    completeGoal: (state, action: PayloadAction<{ id: string }>) => {
      const goal = state.goalsArray.find((g) => g.id === action.payload.id);
      if (goal) goal.completed = true;
    },
  },
});

export const { addGoal, removeGoal, updateGoal, completeGoal } = goalsSlice.actions;

// --- Properly memoized selector ---
export const selectGoals = createSelector(
  (state: RootState) => state.goals.goalsArray,
  (goalsArray) => goalsArray.filter(goal => !goal.completed) // example transformation
);


export const goalsReducer = goalsSlice.reducer;

