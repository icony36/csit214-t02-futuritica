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

        dispatch(loadRooms(res));
        dispatch(removeError());
   } catch(err){
        dispatch(addError(err));
   }
}