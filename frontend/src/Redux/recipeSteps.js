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

        case ActionTypes.EDIT_RECIPESTEPS:
            return{...state, recipeSteps: state.recipeSteps.filter((recipeSteps) => {
                if(recipeSteps.recipeId === action.payload.recipeId){
                    recipeSteps.stepNum = action.payload.stepNum;
                    recipeSteps.numSteps = action.payload.numSteps;
                    recipeSteps.steps = action.payload.steps;
                }
                return recipeSteps;
        })}

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
