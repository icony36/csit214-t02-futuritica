import React, { useEffect } from 'react';
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

    rooms.sort((a, b) => a.name.localeCompare(b.name))
   
    const publicRoomList = rooms.filter(r => (r.availability === AVAL.public)).map(r => (
        <RoomItem
            key={r._id}
            id={r._id}
            availability={r.availability}    
            name={r.name}
        />
    ))

    const privateRoomList = rooms.filter(r => (r.availability === AVAL.private)).map(r => (
        <RoomItem
            key={r._id}
            id={r._id}
            availability={r.availability}
            name={r.name}    
        />
    ))

    return(
        <div className='row'>
            <div className='offset-1 col-sm-10'>
                {auth.user.role === ROLE.staff && (
                    <h2>Launched Room</h2>
                )}
                <RoomAvalNum available={publicRoomList.length}/>
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