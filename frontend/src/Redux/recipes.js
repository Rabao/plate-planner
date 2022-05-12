import * as ActionTypes from "./ActionTypes";

export const Recipe = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        recipe: []
    }, action) => {
    

    switch(action.type) {

        //Recipe Collection
        case ActionTypes.ADD_RECIPECOLLECTION:
            return{...state,
                isLoading: false,
                errMess: null,
                recipe: action.payload}   

        case ActionTypes.RECIPECOLLECTION_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                recipe: []}

        case ActionTypes.RECIPECOLLECTION_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                recipe: []}

        //Single Recipe

        case ActionTypes.ADD_RECIPE:
            let recipe = action.payload;
            return {...state, recipe: state.recipe.concat(recipe)};

        case ActionTypes.DELETE_MEALPLAN:
            return { ...state, id: action.payload.id, recipe: '', authorities: [] }

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
