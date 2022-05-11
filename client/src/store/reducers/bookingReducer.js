import { LOAD_BOOKING } from "../actionTypes";

export default (state={}, action) => {
    switch(action.type) {
        case LOAD_BOOKING:
            return {...action.booking};    
        default:
            return state;
    }
};