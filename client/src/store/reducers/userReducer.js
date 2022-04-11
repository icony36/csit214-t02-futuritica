import { LOAD_USER_DETAILS } from "../actionTypes";

export default (state={}, action) => {
    switch(action.type) {
        case LOAD_USER_DETAILS:
            return {...action.userDetails};    
        default:
            return state;
    }
};