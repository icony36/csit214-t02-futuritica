import { apiCall } from '../../services/api';
import { LOAD_BOOKING } from '../actionTypes';
import { addError, removeError } from './errorAction';

export const loadBooking = booking => ({
    type: LOAD_BOOKING,
    booking
})

export const fetchBooking = (id) => async dispatch => {
    try{
        const res = await apiCall("get", `/api/student/booking/${id}`);

        dispatch(loadBooking(res));
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

export const updateBooking = (booking, id, history) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/student/booking/${id}`, booking);

        // window.location.reload();
        history.push(`/profile`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const deleteBooking = (id, history) => async dispatch => {
    try{
        const res = await apiCall("delete", `/api/student/booking/${id}`);

        history.push(`/profile`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}