import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, updateUser, removeError } from '../store/actions';

const UserEditPage = ({history}) => {
    const errors = useSelector(state=>state.errors);
    const users = useSelector(state => state.users);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentUser = users.filter(r => r._id === id)[0];

    const initState = {
        email: currentUser ? currentUser.email : "",
        role: currentUser ? currentUser.role : "",
        username: currentUser ? currentUser.username : "",
    }

    const [userEditData, setUserEditData] = useState(initState)
    
    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchUsers());            
        }

        fetchData();
     },[]);

    useEffect(()=> {
        setUserEditData(()=>({...initState}));        
    },[currentUser])

    const handleChange = e => {
        setUserEditData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();
    
        dispatch(updateUser(userEditData, id, history));
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten()
        })
    }

    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'> 
                {errors.message && 
                           <div className='alert alert-danger card-body'>
                               {errors.message}
                           </div>
                }                              
                {currentUser && 
                    <div className='card'>
                        <form onSubmit={handleSubmit}>                            
                            <div className='card-body'>  
                                <label htmlFor='username'>Username:</label>
                                <input 
                                    className='form-control' 
                                    id='username' 
                                    name='username' 
                                    onChange={handleChange} 
                                    value={userEditData.username} 
                                    type="text" 
                                />

                                <label htmlFor='email'>Email:</label>
                                <input 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    onChange={handleChange} 
                                    value={userEditData.email} 
                                    type="text" 
                                />    
                                
                                <label htmlFor='role'>Role:</label>
                                <select 
                                    className='form-control' 
                                    id='role' 
                                    name='role' 
                                    onChange={handleChange} 
                                    value={userEditData.role}
                                >
                                    <option value="" disabled hidden>Choose...</option>
                                    <option value="student">
                                        Student
                                    </option>
                                    <option value="staff">
                                        Staff
                                    </option>
                                </select>
                            </div>
                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary'>Update</button>
                            </div>
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default UserEditPage;