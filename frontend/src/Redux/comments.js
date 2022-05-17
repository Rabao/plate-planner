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

        case ActionTypes.EDIT_COMMENT:
            return{...state, comments: state.comments.filter((comment) => {
                if(comment.id === action.payload.id){
                    comment.rating = action.payload.rating;
                    comment.comment = action.payload.comment;
                }
                return comment;
            })}
        
        case ActionTypes.DELETE_COMMENT:
            return{
                ...state, comments: state.comments.filter((comment, index) => index !== action.payload)}
    
        default:
            return state;
    }
};
