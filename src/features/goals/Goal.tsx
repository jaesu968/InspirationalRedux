import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import styles from "./Goal.module.css";
import type { Goal as GoalType } from "./goalSlice";
import { addGoal, removeGoal, updateGoal, completeGoal } from "./goalSlice";
import { useFetchQuote } from "../quotes/useFetchQuote";

interface Props {
  goal?: GoalType;
}

export const Goal = ({ goal }: Props): JSX.Element => {
  const { fetchQuote } = useFetchQuote();
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const onAdd = () => {
    const goalText = text.trim();
    if (!goalText) return;
    const id = Date.now().toString();
    dispatch(addGoal({ id, goalText }));
    fetchQuote();
    setText("");
  };

  if (goal) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(goal.goalText);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    const saveEdit = () => {
      const newText = editText.trim();
      if (!newText) {
        setEditText(goal.goalText);
        setIsEditing(false);
        return;
      }
      if (newText !== goal.goalText) {
        dispatch(updateGoal({ id: goal.id, goalText: newText }));
        fetchQuote();
      }
      setIsEditing(false);
    };

    const cancelEdit = () => {
      setEditText(goal.goalText);
      setIsEditing(false);
    };

    return (
      <div className={styles.goalItem}>
        {!goal.completed && (
          <button
            type="button"
            className={styles.completeBtn}
            onClick={() => dispatch(completeGoal({ id: goal.id }))}
          >
            Complete Goal
          </button>
        )}
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => {
            dispatch(removeGoal({ id: goal.id }));
            fetchQuote();
          }}
        >
          Remove Goal
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <h3
            className={goal.completed ? styles.completedGoal : undefined}
            onClick={() => setIsEditing(true)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
            role="button"
          >
            {goal.goalText}
          </h3>
        )}
      </div>
    );
  }

  return (
    <div className={styles.goalContainer}>
      <h1>What are your goals today?</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new goal"
        onKeyDown={(e) => {
          if (e.key === "Enter") onAdd();
        }}
      />
    </div>
  );
};
