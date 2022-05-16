import * as ActionTypes from './ActionTypes';

export const Users = (state = {
        isLoading: true,
        errMess: null,
        allUsers: []
    }, action) => {


        switch(action.type) {
            case ActionTypes.ADD_USERS:
                return{...state,
                    isLoading: false,
                    errMess: null,
                    allUsers: action.payload}
    
            case ActionTypes.USERS_LOADING:
               return{...state,
                    isLoading: true,
                    errMess: null,
                    allUsers: []}
    
            case ActionTypes.USERS_FAILED:
                return{...state, 
                    isLoading: false,
                    errMess: action.payload,
                    allUsers: []}
                    
        default:
            return state;
    }
}