import { apiCall } from '../../services/api';
import { LOAD_ROOMS } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

export const loadRooms = rooms => ({
    type: LOAD_ROOMS,
    rooms
})

export const fetchRooms = () => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/common/rooms`);
        dispatch(removeLoading());

        dispatch(loadRooms(res));
        dispatch(removeMessage());
   } catch(err){
        dispatch(removeLoading());

        if(err){
            dispatch(addError(err));
        }
        else{
            console.log(err);
        }
   }
}

export const postNewRoom = (room) => async (dispatch) => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("post", `/api/staff/room/`, room);
        dispatch(removeLoading());

        dispatch(addSuccess({message: "Room successfully created."}));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    } 
}

export const updateRoom = (room, id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("put", `/api/staff/room/${id}`, room);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const launchRoom = (availability, id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("put", `/api/staff/room/${id}/launch`, {availability});
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => window.location.reload(), 1000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const deleteRoom = (id, history) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("delete", `/api/staff/room/${id}`);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => history.push('/'), 1000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}