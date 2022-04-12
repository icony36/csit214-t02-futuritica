import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchUserDetails, logout } from '../store/actions';

const Profile = ({history}) => {
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchUserDetails());
        }
 
        fetchData();
     },[]);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout(history));
    }

    return(
        <div className='row justify-content-md-center'>      
           <div className='col-md-4'>
                <div className='card' style={{width: '18rem'}}>
                    <div className='card-body'>
                        <h4 className='class-title '>Profile</h4>                 
                        <h6 className='class-subtitle mb-2text-muted'>Username: {userDetails.username}</h6>                 
                        <h6 className='class-subtitle mb-2 text-muted'>Email: {userDetails.email}</h6>                   
                        <h6 className='class-subtitle mb-2 text-muted'>Role: {userDetails.role}</h6> 
                        
                    </div>
                    {userDetails.role === 'student' && (
                    <div className='card-body booked-list'>
                        <h6>Booked room:</h6>
                        <ul className='list-group text-center'>
                            {userDetails.role === 'student' && userDetails.bookedRooms && userDetails.bookedRooms.map(r=>(
                                <li className='list-group-item' key={r._id}>
                                    <Link to={`/room/${r._id}`}>
                                        <h6>
                                            {dayjs(r.timestamp).format("DD-MMMM-YYYY HH:mm")}
                                        </h6>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                     </div>
                    )}    
                    <div className='card-body text-center'>
                        <button onClick={handleLogout} className='btn btn-danger btn-block'>Logout</button>
                    </div>
                </div>
             </div>
             
            
        </div>
    )
}

export default Profile;