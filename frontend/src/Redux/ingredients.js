import * as ActionTypes from "./ActionTypes";

export const Ingredients = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        ingredients: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_INGREDIENTS:
            return{...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                ingredients: action.payload}
        
        case ActionTypes.DELETE_INGREDIENTS:
            return { ...state, id: null, ingredients: '', authorities: [] }

        case ActionTypes.INGREDIENTS_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                ingredients: []}

        case ActionTypes.INGREDIENTS_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                ingredients: []}

        default:
            return state;
    }
}
