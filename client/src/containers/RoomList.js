import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../store/actions';
import RoomItem from '../components/RoomItem';

const RoomList = () => {
    const rooms = useSelector(state => state.rooms);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
       const fetchData = async () => {
           await dispatch(fetchRooms());
       }

       fetchData();
    },[]);
    
    let roomList = rooms.map(r => (
        <RoomItem
            key={r._id}
            id={r._id}
            availability={r.availability}
            timestamp={r.timestamp}
            capacity={r.capacity}
            price={r.price}
            bookedBy={r.bookedBy ? r.bookedBy.username : null}
        />
    ))

    return(
        <div className='row'>
            <div className='offset-1 col-sm-10'>
                <ul className='list-group' id='room-list'>
                    {roomList}
                </ul>
            </div>
            
        </div>
    )

}

export default RoomList;