import { apiCall } from '../../services/api';
import { LOAD_USERS } from '../actionTypes';
import { addError, removeError } from './errorAction';

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
})

export const fetchUsers = () => async dispatch => {
    try{
        const res = await apiCall("get", `/api/admin/users`);

        dispatch(loadUsers(res));
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

export const updateUser = (users, id, history) => async dispatch => {
    try{
        const res = await apiCall("put", `/api/admin/users/${id}`, users);

        // window.location.reload();
        history.push(`/user/${id}`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const deleteUser = (id, history) => async dispatch => {
    try{
        const res = await apiCall("delete", `/api/admin/users/${id}`);

        // window.location.reload();
        history.push(`/`);
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}

export const suspendUser = (id, obj) => async dispatch => {
    try{    
        const res = await apiCall("patch", `/api/admin/users/${id}`, obj);

        window.location.reload();
        console.log(res);
    } catch(err){
        dispatch(addError(err));
    }  
}