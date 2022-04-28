import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../store/actions';
import RoomItem from '../components/RoomItem';
import RoomAvalNum from '../components/RoomAvalNum';
import { ROLE, AVAL } from '../constants';

const RoomList = () => {

    const rooms = useSelector(state => state.rooms);
    const auth = useSelector(state =>  state.auth);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
       const fetchData = async () => {
           await dispatch(fetchRooms());
       }

       fetchData();
       
    },[]);

    const compare = (a, b) => {        
        if ( a.timestamp < b.timestamp ){
          return -1;
        }
        if ( a.timestamp > b.timestamp ){
          return 1;
        }
        return 0;
    }

    rooms.sort(compare); // sort room based on timestamp

    const getAvalRoomNum = () => {
        let count = 0;
        
        rooms.filter(r => (r.availability === AVAL.public)).forEach(r => {
            count++;
        })

        return count;
    }
    
    const publicRoomList = rooms.filter(r => (r.availability === AVAL.public || r.availability === AVAL.booked)).map(r => (
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

    const privateRoomList = rooms.filter(r => (r.availability === AVAL.private)).map(r => (
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
                {auth.user.role === ROLE.staff && (
                    <h2>Launched Room</h2>
                )}
                <RoomAvalNum available={getAvalRoomNum()}/>
                <ul className='room-list list-group list-group-flush' >
                    {publicRoomList} 
                </ul>
               {auth.user.role === ROLE.staff && (
                <div>
                   <h2 style={{marginTop: '2rem'}}>Private Room</h2>
                   <ul className='room-list list-group list-group-flush' >
                       {privateRoomList}                        
                   </ul>
                </div>
               )}
            </div>
        </div>
    )

}

export default RoomList;