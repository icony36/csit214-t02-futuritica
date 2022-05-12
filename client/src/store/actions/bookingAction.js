import { apiCall } from '../../services/api';
import { LOAD_BOOKING } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

export const loadBooking = booking => ({
    type: LOAD_BOOKING,
    booking
})

export const fetchBooking = (id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/student/booking/${id}`);
        dispatch(removeLoading());

        dispatch(loadBooking(res));
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

export const createBooking = (bookData, bookType, id, history) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("patch", `/api/student/booking/${id}`, {bookData, bookType});
        dispatch(removeLoading());

        dispatch(addSuccess(res));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const updateBooking = (booking, id, history) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("put", `/api/student/booking/${id}`, booking);
        dispatch(removeLoading());

        dispatch(addSuccess(res));        
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const deleteBooking = (id, history) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("delete", `/api/student/booking/${id}`);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => history.push('/'), 1000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}