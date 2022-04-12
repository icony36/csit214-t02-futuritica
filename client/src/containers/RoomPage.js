import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchRooms, bookRoom, launchRoom } from '../store/actions';
import Message from '../components/Message';
import { ROLE, AVAL } from '../constants';


const RoomPage = () => {
    const rooms = useSelector(state => state.rooms);
    const errors = useSelector(state => state.errors);
    const auth = useSelector(state => state.auth);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());
        }
 
        fetchData();
     },[]);

    const handleBook = () => {
        dispatch(bookRoom(AVAL.booked, id));
    }

    const handleCancel = () => {
        dispatch(bookRoom(AVAL.public, id));
    }

    const handleLaunch = () => {
        dispatch(launchRoom(AVAL.public, id));
    }

    const handleTakedown = () => {
        dispatch(launchRoom(AVAL.private, id));
    }

    const renderStudentBtn = () => {
        if(currentRoom.availability === AVAL.booked && currentRoom.bookedBy._id === auth.user.id){
            return(
                <button onClick={handleCancel} className='btn btn-danger btn-block'>Cancel Booking</button>
            )
        }
        else if(currentRoom.availability === AVAL.public){
            return (
                <button onClick={handleBook} className='btn btn-primary btn-block'>Book Room</button>
            )
        }
    }

    const renderStaffBtn = () => {
        return(
            <>
                <Link to={`/room/${id}/edit`}>
                    <button className='btn btn-primary btn-block' style={{ marginRight: "0.5rem"}}>
                        Edit
                    </button>
                </Link>
                {currentRoom.availability === AVAL.private ? 
                <button onClick={handleLaunch} className='btn btn-primary btn-block'>Launch Room</button> :
                <button onClick={handleTakedown} className='btn btn-danger btn-block'>Take Down Room</button>}
            </>
        )
    }
     
    return(
    <div className='row justify-content-md-center'>
        <div className='col-md-4'>
            <Message type='error' errors={errors}/>
            {currentRoom &&
            <div className='card room-details' style={{width: '18rem'}}>
                <div className='card-body'>
                    <h4 className='card-title'>
                        {currentRoom.timestamp && dayjs(currentRoom.timestamp).format("DD MMMM YYYY")}
                    </h4>
                    <h6 className='class-subtitle mb-2 text-muted'>
                        Time: {currentRoom.timestamp && dayjs(currentRoom.timestamp).format("HH:mm")}
                    </h6>           
                    {currentRoom.bookedBy &&  <h6 className='class-subtitle text-muted'>Booked by: {currentRoom.bookedBy.username}</h6>}   
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>Availability: {currentRoom.availability}</li>
                    <li className='list-group-item'>Capacity: {currentRoom.capacity} person</li>
                    <li className='list-group-item'>Price: {currentRoom.price ? `${currentRoom.price}` : "Free" }</li>                     
                    {currentRoom.promotionCode? <li className='list-group-item'>Promotion Code: {currentRoom.promotionCode}</li> : null}
                </ul>
                    <div className='card-body text-center'>
                        {auth.user.role === ROLE.staff ? renderStaffBtn() : renderStudentBtn()}
                    </div>
            </div>
            }
        </div>
    </div>
    )
}

export default RoomPage;