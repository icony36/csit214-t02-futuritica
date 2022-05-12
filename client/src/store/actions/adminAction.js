import { apiCall } from '../../services/api';
import { LOAD_USERS } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
})

export const fetchUsers = () => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/admin/users`);
        dispatch(removeLoading());

        dispatch(loadUsers(res));
        dispatch(removeMessage());
   } catch(err){
        dispatch(removeLoading())
    
        if(err){
            dispatch(addError(err));
        }
        else{
            console.log(err);
        }
   }
}

export const updateUser = (users, id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("put", `/api/admin/users/${id}`, users);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const deleteUser = (id, history) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("delete", `/api/admin/users/${id}`);
        dispatch(removeLoading());

        history.push(`/`);
        dispatch(removeMessage());
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const suspendUser = (id, obj, history) => async dispatch => {
    try{    
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("patch", `/api/admin/users/${id}`, obj);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => history.push('/'), 1000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}