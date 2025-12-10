// This is a React component for managing and displaying a single goal
// The Goals.tsx component will render all the goals in the store 
import type { JSX } from "react"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import styles from "./Goal.module.css"
import type { Goal as GoalType } from "./goalSlice"
import { addGoal, removeGoal, updateGoal, completeGoal } from "./goalSlice"
import { fetchRandomQuote } from "../quotes/currentQuoteSlice"

interface Props {
  goal?: GoalType
}

// Component that either renders a single `goal` (presentational),
// or shows a small form to add a new goal if no `goal` prop is provided.
export const Goal = ({ goal }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState("")

  // add-form branch 
  const onAdd = () => {
    const goalText = text.trim()
    if (!goalText) return
    const id = Date.now().toString()
    dispatch(addGoal({ id, goalText }))
    // fetch a new random quote whenever a goal is added
    dispatch(fetchRandomQuote())
    setText("")
  }


  if (goal) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(goal.goalText)
    const inputRef = useRef<HTMLInputElement | null>(null)

    // focus the input when editing starts
    useEffect(() => {
      if(isEditing && inputRef.current) inputRef.current.focus() 
    }, [isEditing])

    const saveEdit = () => {
      const newText = editText.trim() 
      if(!newText) {
        // ignore empty edits and revert
        setEditText(goal.goalText)
        setIsEditing(false)
        return
      }
      if (newText != goal.goalText){
        dispatch(updateGoal({ id: goal.id, goalText: newText }))
        // fetch a new random quote whenever a goal is updated
        dispatch(fetchRandomQuote())
      }
      setIsEditing(false)
    }

    const cancelEdit = () => {
      setEditText(goal.goalText)
      setIsEditing(false)
    }
    
    return (
        <div className={styles.goalItem}>
          {!goal.completed && (
            <button 
              type="button"
              className={styles.completeBtn}
              aria-label={`Complete goal: ${goal.goalText}`}
              title="Mark as Complete"
              onClick={() => dispatch(completeGoal({ id: goal.id }))}>
                ✓
              </button>
          )}
          <button 
            type="button"
            className={styles.removeBtn}
            aria-label={`Remove goal: ${goal.goalText}`}
            title="Remove Goal"
            onClick={() => { dispatch(removeGoal({ id: goal.id })); dispatch(fetchRandomQuote()); }}>
              X
            </button>            {isEditing ? (
              <input 
                ref={inputRef} 
                className={styles.editInput}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit()
                  if (e.key === "Escape") cancelEdit()
                }}
                aria-label={`Edit goal ${goal.goalText}`}
                />
              ) : (
          <h3
           className={goal.completed ? styles.completedGoal : undefined}
           onClick={() => {
            setEditText(goal.goalText)
            setIsEditing(true)
           }}
           tabIndex={0}
           onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " "){
              // allow keyboard users to start editing
              e.preventDefault()
              setEditText(goal.goalText)
              setIsEditing(true)
            }
           }}
           role="button"
           aria-label={`Goal: ${goal.goalText}. Click to edit.`}
           >{goal.goalText}</h3>
          )}
        </div>
    )
  }

  // when a person hits the enter or return key, add the goal 
  // when a person clicks on the remove button, remove the goal 
  return (
    <div className={styles.goalContainer}>
      <h1>What are your goals today?</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new goal"
        aria-label="New goal"
        onKeyDown={(e) => {
          if (e.key === "Enter") onAdd()
        }}
      /> 
    </div>
  )
}
