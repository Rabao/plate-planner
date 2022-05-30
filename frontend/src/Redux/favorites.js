import * as ActionTypes from "./ActionTypes";

export const Favorites = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        favorites: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_FAVORITES:
            return{...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                favorites: action.payload}

        case ActionTypes.ADD_FAVORITE:
            return{...state, favorites: state.favorites.concat(action.payload)};
        
        case ActionTypes.DELETE_FAVORITES:
            return{
            ...state, favorites: state.favorites.filter(
                fave => fave.recipeId !== action.payload.recipeId 
                && fave.userId !== action.payload.userId)}

        case ActionTypes.FAVORITES_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                favorites: []}

        case ActionTypes.FAVORITES_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                favorites: []}

        default:
            return state;
    }
}
