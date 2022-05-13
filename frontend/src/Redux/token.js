import * as ActionTypes from './ActionTypes';

export const Token = (state = {
        token: undefined
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TOKEN:
            return { ...state, token: action.payload }
        
        default:
            return state;
    }
}