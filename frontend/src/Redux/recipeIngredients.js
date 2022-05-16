import * as ActionTypes from "./ActionTypes";

export const RecipeIngredients = (state = {
        isLoading: true,
        errMess: null,
        recipeIngredients: []
    }, action) => {
    
    switch(action.type) {
        
        case ActionTypes.ADD_RECIPEINGREDIENTS:
            return {...state,
                isLoading: false,
                errMess: null,
                recipeIngredients: action.payload}

        case ActionTypes.RECIPEINGREDIENTS_LOADING:
            return{...state,
                    isLoading: true,
                    errMess: null,
                    recipeIngredients: []}
    
        case ActionTypes.RECIPEINGREDIENTS_FAILED:
                return{...state, 
                    isLoading: false,
                    errMess: action.payload,
                    recipeIngredients: []}

        case ActionTypes.DELETE_RECIPEINGREDIENTS:
            return { ...state, id: null, recipeIngredients: '', authorities: [] }

        default:
            return state;
    }
}
