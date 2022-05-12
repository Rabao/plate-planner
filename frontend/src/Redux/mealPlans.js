import * as ActionTypes from "./ActionTypes";

export const MealPlan = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        mealPlan: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_MEALPLANCOLLECTION:
            return{...state,
                isLoading: false,
                errMess: null,
                mealPlan: action.payload}   

        case ActionTypes.MEALPLANCOLLECTION_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                mealPlan: []}

        case ActionTypes.MEALPLANCOLLECTION_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                mealPlan: []}

        case ActionTypes.ADD_MEALPLAN:
            let plan = action.payload;
            return {...state, mealPlan: state.mealPlan.concat(plan)};

        case ActionTypes.DELETE_MEALPLAN:
            return { ...state, id: action.payload.id, mealPlan: '', authorities: [] }

        default:
            return state;
    }
}
