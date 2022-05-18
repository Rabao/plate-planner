import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const Image = (state = {
        isLoading: true,
        errMess: null,
        image: []
    }, action) => {
    

    switch(action.type) {
        
        case ActionTypes.ADD_IMAGE:
            return {...state,
                isLoading: false,
                errMess: null,
                image: action.payload}

        // case ActionTypes.DELETE_RECIPE:
        //     return { ...state, 
        //         id: action.payload.id, 
        //         recipe: '', 
        //         authorities: [] }

        default:
            return state;
    }
}
