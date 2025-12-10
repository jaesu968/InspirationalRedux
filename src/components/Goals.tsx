// component that will render all the goals in the store 
// utilizes Goal.tsx from features/goals/Goal.tsx to render each goal
import React from 'react';
import type { Goal as GoalType } from '../features/goals/goalSlice';
import { Goal } from '../features/goals/Goal';
import gridStyles from './Goals.module.css';

interface Props {
    goals: GoalType[]
}

// Presentational component: receives an array of goals and renders them.
export const Goals: React.FC<Props> = ({ goals }) => {
    return (
        <div className={gridStyles.goalsWrap}>
            {/* Add form (Goal with no props) */}
            <Goal />

            {/* Goals container box */}
            <div className={gridStyles.goalsContainer}>
                {/* Existing goals in a 2x4 responsive grid */}
                {goals.length === 0 ? (
                    <p>No goals yet</p>
                ) : (
                    <div className={gridStyles.goalsGrid}>
                        {goals.map((g) => (
                            <div className={gridStyles.goalCell} key={g.id}>
                                <Goal goal={g} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Goals;