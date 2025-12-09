// This is a React component for managing and displaying a single goal
// The Goals.tsx component will render all the goals in the store 
import type { JSX } from "react"
import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import styles from "./Goal.module.css"
import type { Goal as GoalType } from "./goalSlice"
import { addGoal } from "./goalSlice"

interface Props {
  goal?: GoalType
}

// Component that either renders a single `goal` (presentational),
// or shows a small form to add a new goal if no `goal` prop is provided.
export const Goal = ({ goal }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState("")

  const onAdd = () => {
    const goalText = text.trim()
    if (!goalText) return
    const id = Date.now().toString()
    dispatch(addGoal({ id, goalText }))
    setText("")
  }

  if (goal) {
    return (
      <div className={styles.goalItem}>
        <h3>{goal.goalText}</h3>
      </div>
    )
  }

  return (
    <div className={styles.goalContainer}>
      <h1>What is your goal today?</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a short goal"
        aria-label="New goal"
      />
      <button onClick={onAdd}>Add Goal</button>
    </div>
  )
}
