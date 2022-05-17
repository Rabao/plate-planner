import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        id: null,
        errMess: null,
        comments: []
    }, action) => {

    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return { ...state,
                id: action.payload.id, 
                isLoading: false,
                errMess: null,
                comments: action.payload}
        
        case ActionTypes.COMMENTS_FAILED:
            return{...state, 
                isLoading: false,
                errMess: action.payload,
                comments: []}

        case ActionTypes.ADD_COMMENT:
            return{...state, comments: state.comments.concat(action.payload)};
        
        case ActionTypes.DELETE_COMMENT:
            return{
                ...state, comments: state.comments.filter((comment, index) => index !== action.payload)}
            
            // return state.filter((comments, i) => i !== action.payload.id);
    
        default:
            return state;
    }
};
