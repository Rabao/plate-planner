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

        case ActionTypes.EDIT_RECIPEINGREDIENTS:
            return{...state, recipeIngredients: state.recipeIngredients.filter((recipeIngredients) => {
                if(recipeIngredients.recipeId === action.payload.recipeId){
                    recipeIngredients.ingredientId = action.payload.ingredientId;
                    recipeIngredients.ingredient_name = action.payload.ingredient_name;
                    recipeIngredients.measurement = action.payload.measurement;
                    recipeIngredients.unit = action.payload.unit;
                }
                return recipeIngredients;
        })}

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
