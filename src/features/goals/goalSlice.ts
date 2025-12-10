import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

// Single goal type
export interface Goal {
  id: string
  goalText: string
  completed?: boolean
}

// We'll keep the slice root as `state.goals.goals` to minimize changes elsewhere.
type GoalsState = {
  goals: {
    byId: Record<string, Goal>
    allIds: string[]
  }
}

const initialState: GoalsState = {
  goals: {
    byId: {},
    allIds: [],
  },
}

export const goalSlice = createAppSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      const g = action.payload
      state.goals.byId[g.id] = g
      if (!state.goals.allIds.includes(g.id)) state.goals.allIds.push(g.id)
    },
    removeGoal: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id
      delete state.goals.byId[id]
      state.goals.allIds = state.goals.allIds.filter(i => i !== id)
    },
    updateGoal: (state, action: PayloadAction<Goal>) => {
      const g = action.payload
      if (state.goals.byId[g.id]) state.goals.byId[g.id].goalText = g.goalText
    },
    completeGoal: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id
      if (state.goals.byId[id]) {
        state.goals.byId[id].completed = true
      }
    }
  },
})

// Selector that returns an array of goals in insertion order
export const selectGoals = (state: { goals: GoalsState }) =>
  state.goals.goals.allIds.map(id => state.goals.goals.byId[id])
// export actions and reducer for use in other files
export const { addGoal, removeGoal, updateGoal, completeGoal } = goalSlice.actions
export const goalsReducer = goalSlice.reducer