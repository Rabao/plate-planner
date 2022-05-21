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

            case ActionTypes.ADD_GROCERY:
                return{...state, groceries: state.groceries.concat(action.payload)};
        
        case ActionTypes.DELETE_GROCERIES:
            return{
                ...state, groceries: state.groceries.filter((grocery, index) => index !== action.payload)}

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

        case ActionTypes.TOGGLE_GROCERY:
            return{...state, groceries: state.groceries.filter((grocery) => {
                if(grocery.listId === action.payload){
                    grocery.complete = !grocery.complete
                }
                return grocery;
            })}

        case ActionTypes.TOGGLE_FETCH_GROCERY:
            return{...state, groceries: state.groceries.filter((grocery) => {
                if(grocery.name === action.payload.name &&
                    grocery.qty === action.payload.qty){
                    grocery.complete = !grocery.complete
                }
                return grocery;
            })}

        default:
            return state;
    }
}
