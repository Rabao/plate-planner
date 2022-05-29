import * as ActionTypes from "./ActionTypes";

export const MealPlan = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        mealPlan: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_MEALPLAN:
            return{...state,
                isLoading: false,
                errMess: null,
                mealPlan: action.payload}   

        case ActionTypes.MEALPLAN_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                mealPlan: []}

        case ActionTypes.MEALPLAN_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                mealPlan: []}

        case ActionTypes.DELETE_MEALPLAN:
            return { ...state, id: action.payload.id, mealPlan: '', authorities: [] }

        default:
            return state;
    }
}
