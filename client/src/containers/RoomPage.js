import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchRooms } from '../store/actions';


const RoomPage = () => {
    const rooms = useSelector(state => state.rooms);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());
        }
 
        fetchData();
     },[]);
     
    return(
      <>
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
            <Link to={`/room/${id}/edit`}>
                <button className='btn btn-primary btn-block' style={{marginTop: "2rem"}}>Edit</button>
            </Link>
        </div>
        }
      </>
    )
}

export default RoomPage;