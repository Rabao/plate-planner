import * as ActionTypes from "./ActionTypes";

export const Groceries = (state = {
        id: null,
        isLoading: true,
        errMess: null,
        groceries: []
    }, action) => {
    
    switch(action.type) {
        case ActionTypes.ADD_GROCERIES:
            return{...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                groceries: action.payload}
        
        case ActionTypes.DELETE_GROCERIES:
            return { ...state, id: null, groceries: '', authorities: [] }

        case ActionTypes.GROCERIES_LOADING:
           return{...state,
                isLoading: true,
                errMess: null,
                groceries: []}

        case ActionTypes.GROCERIES_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                groceries: []}

        case ActionTypes.ADD_GROCERY:
            return{...state, groceries: state.groceries.concat(action.payload)};

        case ActionTypes.TOGGLE_GROCERY:
            return{...state, groceries: state.groceries.filter((grocery) => {
                if(grocery.id === action.payload){
                    grocery.complete = !grocery.complete
                }
                return grocery;
            })}

        default:
            return state;
    }
}
