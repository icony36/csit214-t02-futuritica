import { LOAD_ROOMS, REMOVE_ROOM } from "../actionTypes";

export default (state=[], action) => {
    switch(action.type) {
        case LOAD_ROOMS:
            return [...action.rooms];
        default:
            return state;
    }
};