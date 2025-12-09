// component that will render all the goals in the store 
// utilizes Goal.tsx from features/goals/Goal.tsx to render each goal
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectGoals } from '../features/goals/goalSlice';
import { Goal } from '../features/goals/Goal';

// Renders the add-goal form (Goal without prop) and a list of existing goals
export const Goals: React.FC = () => {
    const goals = useAppSelector(selectGoals);

    return (
        <div>
            {/* Add form */}
            <Goal />

            {/* Existing goals */}
            {goals.length === 0 ? (
                <p>No goals yet</p>
            ) : (
                <div>
                    {goals.map((g) => (
                        <Goal key={g.id} goal={g} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Goals;