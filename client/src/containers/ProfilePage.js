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
        <div>      
           <div>
                 <h6>Username: {userDetails.username}</h6>                 
             </div>
             <div>
                <h6>Email: {userDetails.email}</h6>                 
             </div>
             <div>
                <h6>Role: {userDetails.role}</h6>                 
             </div>
             <div>
                {userDetails.role === 'student' && <h6>Booked room:</h6>}    
                <ul>
                    {userDetails.role === 'student' && userDetails.bookedRooms && userDetails.bookedRooms.map(r=>(
                        <li key={r._id}>
                            <Link to={`/room/${r._id}`}>
                                <h6>
                                    {dayjs(r.timestamp).format("DD-MMMM-YYYY HH:mm")}
                                </h6>
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
             <div>
             <button onClick={handleLogout} className='btn btn-danger btn-block' style={{marginTop: "2rem"}}>Logout</button>
             </div>
        </div>
    )
}

export default Profile;