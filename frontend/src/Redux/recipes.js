import * as ActionTypes from "./ActionTypes";

export const Recipe = (state = {
        isLoading: true,
        errMess: null,
        recipe: [],
        recipeSearch: []
    }, action) => {
    

    switch(action.type) {
        
        case ActionTypes.ADD_RECIPE:
            return {...state,
                isLoading: false,
                errMess: null,
                recipe: action.payload}
        
        case ActionTypes.SEARCH_RECIPE:
            return {...state,
                isLoading: false,
                errMess: null,
                recipeSearch: action.payload}

        case ActionTypes.DELETE_RECIPE:
            return{
                ...state, recipe: state.recipe.filter((recipe, index) => index !== action.payload)}

        case ActionTypes.EDIT_RECIPE:
            return{...state, recipe: state.recipe.filter((recipe) => {
                if(recipe.id === action.payload.id){
                    recipe.name = action.payload.name;
                    recipe.numSteps = action.payload.numSteps;
                    recipe.image = action.payload.image;
                    recipe.notes = action.payload.notes;
                    recipe.userId = action.payload.userId;
                    recipe.type = action.payload.type;
                }
                return recipe;
            })}

        case ActionTypes.RECIPE_LOADING:
            return{...state,
                    isLoading: true,
                    errMess: null,
                    recipe: []}
    
        case ActionTypes.RECIPE_FAILED:
                return{...state, 
                    isLoading: false,
                    errMess: action.payload,
                    recipe: []}

        default:
            return state;
    }
}
