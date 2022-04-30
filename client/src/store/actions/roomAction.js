import { apiCall } from '../../services/api';
import { LOAD_ROOMS } from '../actionTypes';
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
        if(err){
            dispatch(addError(err));
        }
        else{
            console.log(err);
        }
   }
}

export const postNewRoom = (room, history) => async (dispatch) => {
    try{
        const res = await apiCall("post", `/api/staff/room/`, room);

        console.log(res);
        dispatch(removeError());

        history.push('/');
    } catch(err){
        dispatch(addError(err));
    } 
}

export const updateRoom = (room, id, history) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/staff/room/${id}`, room);

        // window.location.reload();
        history.push(`/room/${id}`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const bookRoom = (availability, id) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/student/booking/${id}`, {availability});

        window.location.reload();
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const launchRoom = (availability, id) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/staff/room/${id}/launch`, {availability});

        window.location.reload();
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const deleteRoom = (id, history) => async dispatch => {
    try{
        const res = await apiCall("delete", `/api/staff/room/${id}`);

        // window.location.reload();
        history.push(`/`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}