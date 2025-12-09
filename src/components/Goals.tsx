import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Goal } from '../features/goals/Goal';


function Goals() {
    return (
        <div>
            <Provider store={store}>
                <Goal />
            </Provider>
        </div>
    ); 
}