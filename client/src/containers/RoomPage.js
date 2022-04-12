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
                <button onClick={handleCancel} className='btn btn-danger btn-block' style={{marginTop: "2rem"}}>Cancel Booking</button>
            )
        }
        else if(currentRoom.availability === AVAL.public){
            return (
                <button onClick={handleBook} className='btn btn-primary btn-block' style={{marginTop: "2rem"}}>Book Room</button>
            )
        }
    }

    const renderStaffBtn = () => {
        return(
            <>
                <Link to={`/room/${id}/edit`}>
                        <button className='btn btn-primary btn-block' style={{marginTop: "2rem", marginRight: "0.5rem"}}>Edit</button>
                </Link>
                {currentRoom.availability === AVAL.private ? 
                <button onClick={handleLaunch} className='btn btn-primary btn-block' style={{marginTop: "2rem"}}>Launch Room</button> :
                <button onClick={handleTakedown} className='btn btn-danger btn-block' style={{marginTop: "2rem"}}>Take Down Room</button>}
            </>
        )
    }
     
    return(
      <>
        <Message type='error' errors={errors}/>
        {currentRoom &&
        <div className='room-details'>
            <h2>
                {currentRoom.timestamp && dayjs(currentRoom.timestamp).format("DD MMMM YYYY")}
            </h2>
            <h4>
                Timeslot: {currentRoom.timestamp && dayjs(currentRoom.timestamp).format("HH:mm")}
            </h4>
            <div>
                <h6>Room id: {currentRoom._id}</h6>                 
            </div>
            <div>
            <h6>Availability: {currentRoom.availability}</h6>                 
            </div>
            <div>
            <h6>Capacity: {currentRoom.capacity} person</h6>                 
            </div>
            <div>
            <h6>Price: ${currentRoom.price}</h6>
            </div>
            <div>
            {currentRoom.promotionCode? <h6>Promotion Code: {currentRoom.promotionCode}</h6> : null}
            </div>
            <div>
                {currentRoom.bookedBy ?  <h6>Booked by: {currentRoom.bookedBy.username}</h6> : null}                
            </div>
            <div>
                {auth.user.role === ROLE.staff ? renderStaffBtn() : renderStudentBtn()}
            </div>
        </div>
        }
      </>
    )
}

export default RoomPage;