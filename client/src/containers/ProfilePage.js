import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchUserDetails } from '../store/actions';

const Profile = props => {
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchUserDetails());
        }
 
        fetchData();
     },[]);

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
                        <li>
                            <Link to={`/room/${r._id}`}>
                                <h6>
                                    {dayjs(r.timestamp).format("DD-MMMM-YYYY HH:mm")}
                                </h6>
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
        </div>
    )
}

export default Profile;