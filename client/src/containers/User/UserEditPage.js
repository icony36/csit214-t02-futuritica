import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, updateUser, removeMessage } from '../../store/actions';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const UserEditPage = ({history}) => {
    const messages = useSelector(state=>state.messages);
    const users = useSelector(state => state.users);
    const loading = useSelector(state => state.loading);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentUser = users.filter(r => r._id === id)[0];

    const initState = {
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
    
        dispatch(updateUser(userEditData, id));
    }

    if(messages.message){
        const unlisten = history.listen(() => {
            dispatch(removeMessage());
            unlisten()
        })
    }

    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'> 
                <div className='card'>
                    <form onSubmit={handleSubmit}>                            
                        <div className='card-body'>  
                            {currentUser && !loading.isLoading ?
                            <>                      
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
                                <div className='card-body text-center'>
                                    <button type="submit" className='btn btn-primary'>Update</button>
                                </div>
                            </> :
                            <Loading small/>
                            }
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default UserEditPage;