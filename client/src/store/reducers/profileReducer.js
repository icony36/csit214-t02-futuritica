import { LOAD_PROFILE } from "../actionTypes";

export default (state={}, action) => {
    switch(action.type) {
        case LOAD_PROFILE:
            return {...action.profile};    
        default:
            return state;
    }
};