import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRooms } from '../store/actions';

const RoomPage = () => {
    const { id } = useParams();
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());
        }
 
        fetchData();
     },[]);
        

    const currentRoom = rooms.filter(r => r._id == id)[0];



    return(
      <>
        {currentRoom && (
             <div>
             <div>
                 {currentRoom._id}
             </div>
             <div>
                 {currentRoom.availability}
             </div>
             <div>
             <div>
                 {currentRoom.capacity}
             </div>
             <div>
                 {currentRoom.price}
             </div>
             <div>
                 {currentRoom.promotionCode}
             </div>
             <div>
                 {currentRoom.bookedBy && currentRoom.bookedBy.username}
             </div>
             </div>
        </div>
        )}
      </>
    )
}

export default RoomPage;