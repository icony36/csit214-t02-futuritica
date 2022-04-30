import { LOAD_ROOMS } from "../actionTypes";

export default (state=[], action) => {
    switch(action.type) {
        case LOAD_ROOMS:
            return [...action.rooms];    
        default:
            return state;
    }
};