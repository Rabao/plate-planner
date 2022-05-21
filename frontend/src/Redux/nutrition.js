import * as ActionTypes from "./ActionTypes";

export const Nutrition = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        nutrition: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_NUTRITIONS:
            return{...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                nutrition: action.payload}

        case ActionTypes.ADD_NUTRITION:
            return{...state, nutrition: state.nutrition.concat(action.payload)};
        
        case ActionTypes.DELETE_NUTRITION:
            return { ...state, id: null, nutrition: '', authorities: [] }

        case ActionTypes.NUTRITION_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                nutrition: []}

        case ActionTypes.NUTRITION_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                nutrition: []}

        default:
            return state;
    }
}
