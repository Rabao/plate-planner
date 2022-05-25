import * as ActionTypes from "./ActionTypes";

export const RecipeNutrition = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        recipeNutrition: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_RECIPENUTRITION:
            return{...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                recipeNutrition: action.payload}
        
        case ActionTypes.DELETE_RECIPENUTRITION:
            return { ...state, id: null, recipeNutrition: [], authorities: [] }

        case ActionTypes.RECIPENUTRITION_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                recipeNutrition: []}

        case ActionTypes.RECIPENUTRITION_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                recipeNutrition: []}

        default:
            return state;
    }
}
