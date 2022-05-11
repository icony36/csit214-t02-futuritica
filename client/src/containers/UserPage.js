import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchUsers, suspendUser } from '../store/actions';
import Message from '../components/Message';
import { ROLE } from '../constants';


const UserPage = ({history}) => {
    const users = useSelector(state => state.users);
    const errors = useSelector(state => state.errors);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentUser = users.filter(r => r._id === id)[0];

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchUsers());
        }
 
        fetchData();
     },[]);

    const handleSuspend = () => {
        dispatch(suspendUser(id, {isSuspended: true}));
    }

    const handleUnsuspend = () => {
        dispatch(suspendUser(id, {isSuspended: false}));
    }
     
     
    return(
    <div className='row justify-content-md-center'>
        <div className='col-md-4'>
            <Message type='error' errors={errors}/>
            {currentUser &&
            <>
                <div className='card room-details' style={{width: '18rem'}}>
                    <div className='card-body'>
                        <h4 className='card-title'>
                            {currentUser.username}
                        </h4>
                        <h6 className='class-subtitle mb-2 text-muted'>
                            Role: {currentUser.role}
                        </h6>           
                    </div>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>Email: {currentUser.email}</li>
                        <li className='list-group-item'>
                            Last login: {currentUser.logInTime ? dayjs(currentUser.logInTime).format("DD MMMM YYYY HH:mm") : "Not logged in yet"}
                        </li>
                        <li className='list-group-item'>
                            Last logout: {currentUser.logOutTime ? dayjs(currentUser.logOutTime).format("DD MMMM YYYY HH:mm") : "Not logged out yet"}
                        </li>                     
                        {currentUser.role === ROLE.student && (
                        <div className='card-body booked-list'>
                            <h6>Booking:</h6>
                            <ul className='list-group text-center'>
                                {currentUser.booking && currentUser.booking.map(b=>(
                                    <li className='list-group-item' key={b._id}>
                                        <p className='fw-bold'>Room {b.room.name}</p>         
                                        <p className='fw-normal'>
                                            {dayjs(b.timestamp).format("DD-MMMM-YYYY HH:mm")}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}    
                    </ul>
                    <div className='card-body text-center'>
                        <Link to={`/user/${id}/edit`}>
                            <button className='btn btn-primary btn-block' style={{ marginRight: "0.5rem"}}>
                                Edit
                            </button>
                        </Link>
                        { currentUser.isSuspended ? (
                        <button onClick={handleUnsuspend} className='btn btn-success btn-block'>Unsuspend User</button>
                        ) : (
                        <button onClick={handleSuspend} className='btn btn-danger btn-block'>Suspend User</button>
                        )}
                    </div>
                </div>
            </>
            }
        </div>
    </div>
    )
}

export default UserPage;