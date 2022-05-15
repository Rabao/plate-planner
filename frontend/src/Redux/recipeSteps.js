import * as ActionTypes from "./ActionTypes";

export const RecipeSteps = (state = {
        // id: null,
        isLoading: true,
        errMess: null,
        recipeSteps: []
    }, action) => {
    

    switch(action.type) {
        
        case ActionTypes.ADD_RECIPESTEPS:
            return {...state,
                isLoading: false,
                errMess: null,
                recipeSteps: action.payload}

        // case ActionTypes.DELETE_RECIPE:
        //     return { ...state, 
        //         id: action.payload.id, 
        //         recipe: '', 
        //         authorities: [] }

        case ActionTypes.RECIPESTEPS_LOADING:
            return{...state,
                    isLoading: true,
                    errMess: null,
                    recipeSteps: []}
    
        case ActionTypes.RECIPESTEPS_FAILED:
                return{...state, 
                    isLoading: false,
                    errMess: action.payload,
                    recipeSteps: []}

        default:
            return state;
    }
}
