import { apiCall } from '../../services/api';
import { LOAD_ROOMS, LOAD_ROOM_DETAILS, REMOVE_ROOM } from '../actionTypes';
import { addError, removeError } from './errorAction';

export const loadRooms = rooms => ({
    type: LOAD_ROOMS,
    rooms
})

export const fetchRooms = () => async dispatch => {
    try{
        const res = await apiCall("get", `/api/common/rooms`);

        dispatch(loadRooms(res));
        dispatch(removeError());
   } catch(err){
        dispatch(addError(err));
   }
}

export const postNewRoom = room => async (dispatch) => {
    try{
        const res = await apiCall("post", `/api/staff/room/`, room);

        dispatch(removeError());
    } catch(err){
        dispatch(addError(err));
    } 
}


