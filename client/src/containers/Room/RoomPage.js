import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchRooms, launchRoom, removeMessage } from '../../store/actions';
import Message from '../../components/Message';
import { ROLE, AVAL } from '../../constants';
import Loading from '../../components/Loading';


const RoomPage = ({history}) => {
    const rooms = useSelector(state => state.rooms);
    const messages = useSelector(state => state.messages);
    const auth = useSelector(state => state.auth);
    const loading = useSelector(state => state.loading);

    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());
        }
 
        fetchData();
     },[]);

    const handleLaunch = () => {
        dispatch(launchRoom(AVAL.public, id, history));
    }

    const handleTakedown = () => {
        dispatch(launchRoom(AVAL.private, id, history));
    }

    const renderStudentBtn = () => {
        return (
            <Link to={`/room/${id}/booking`}>
                <button className='btn btn-primary btn-block'>Book Room</button>
            </Link>
            
        )
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

    if(messages.message){
        const unlisten = history.listen(() => {
            dispatch(removeMessage());
            unlisten();
        })
    }
     
    return(
    <div className='row justify-content-md-center'>
        <div className='col-md-4'>
            <div className='card room-details' style={{width: '18rem'}}>
                <div className='card-body'>
                    <Message messages={messages}/> 
                    {currentRoom && !loading.isLoading ?
                    <>
                        <h4 className='fw-bold'>
                            Room {currentRoom.name}
                        </h4>     
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>Availability: {currentRoom.availability}</li>
                            <li className='list-group-item'>Capacity: {currentRoom.capacity} person</li>
                            <li className='list-group-item'>Price: {currentRoom.price ? `${currentRoom.price}` : "Free" }</li>                     
                            {currentRoom.promotionCode ? <li className='list-group-item'>Promotion Code: {currentRoom.promotionCode}</li> : null}
                        </ul>
                        <div className='card-body text-center'>
                            {auth.user.role === ROLE.staff ? renderStaffBtn() : renderStudentBtn()}
                        </div>
                        <div className='card-body booked-list'>
                            <h6>Booked timeslot:</h6>
                            <ul className='list-group text-center'>
                                {currentRoom.booking && currentRoom.booking.map(b=>(
                                    <li className='list-group-item' key={b._id}>                                     
                                        <p className='fw-bold'>
                                            {dayjs(b.timestamp).format("DD-MMMM-YYYY HH:mm")}
                                        </p>
                                        <p className='fw-normal'>Booked by: {b.user.username}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </> :
                    <Loading small/>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default RoomPage;