import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchProfile, logout } from '../store/actions';
import { ROLE } from '../constants';

const Profile = ({history}) => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchProfile());
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
                        <h6 className='class-subtitle mb-2text-muted'>Username: {profile.username}</h6>                 
                        <h6 className='class-subtitle mb-2 text-muted'>Email: {profile.email}</h6>                   
                        <h6 className='class-subtitle mb-2 text-muted'>Role: {profile.role}</h6> 
                        
                    </div>
                    {profile.role === ROLE.student && (
                    <div className='card-body booked-list'>
                        <h6>Booked room:</h6>
                        <ul className='list-group text-center'>
                            {profile.bookedRooms && profile.bookedRooms.map(r=>(
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