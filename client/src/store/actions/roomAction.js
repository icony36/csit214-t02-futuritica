import { apiCall } from '../../services/api';
import { LOAD_ROOMS, REMOVE_ROOM } from '../actionTypes';
import { addError, removeError } from './errorAction';

export const loadRooms = rooms => ({
    type: LOAD_ROOMS,
    rooms
})

export const fetchRooms = () => async dispatch => {
    try{
        const res = await apiCall("get", `/api/common/rooms`);

        await dispatch(loadRooms(res));
        await dispatch(removeError());

        return res
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

export const updateRoom = (room, id) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/staff/room/${id}`, room);

    } catch(err){
        dispatch(addError(err));
    }  
}


