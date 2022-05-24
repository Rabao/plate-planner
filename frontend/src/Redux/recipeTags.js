import * as ActionTypes from "./ActionTypes";

export const RecipeTags = (state = {
        // id: null,
        isLoading: true,
        errMess: null,
        recipeTags: []
    }, action) => {
    

    switch(action.type) {
        
        case ActionTypes.ADD_RECIPETAGS:
            return {...state,
                isLoading: false,
                errMess: null,
                recipeTags: action.payload}

        // case ActionTypes.DELETE_RECIPE:
        //     return { ...state, 
        //         id: action.payload.id, 
        //         recipe: '', 
        //         authorities: [] }

        case ActionTypes.RECIPETAGS_LOADING:
            return{...state,
                    isLoading: true,
                    errMess: null,
                    recipeTags: []}
    
        case ActionTypes.RECIPETAGS_FAILED:
                return{...state, 
                    isLoading: false,
                    errMess: action.payload,
                    recipeTags: []}

        default:
            return state;
    }
}
