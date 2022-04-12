import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker'
import dayjs from 'dayjs';
import { fetchRooms, updateRoom, removeError } from '../store/actions';

const RoomEditPage = ({history}) => {
    const errors = useSelector(state=>state.errors);
    const rooms = useSelector(state => state.rooms);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);

    const initState = {
        timestamp: currentRoom ? new Date(currentRoom.timestamp) : currentDate,
        capacity: currentRoom ? currentRoom.capacity : 0,
        price: currentRoom ? currentRoom.price : 0,
        promotionCode: currentRoom ? currentRoom.promotionCode : "",
    }

    const [roomEditData, setRoomEditData] = useState(initState)
    
    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());            
        }

        fetchData();
     },[]);

    useEffect(()=> {
        setRoomEditData(()=>({...initState}));        
    },[currentRoom])

    const handleChange = e => {
        setRoomEditData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleDate = date => {
        date.setHours(8, 0, 0, 0);
        
        setRoomEditData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleHours = e => {
        const date = roomEditData.timestamp;
        date.setHours(e.target.value)
        
        setRoomEditData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();
    
        dispatch(updateRoom(roomEditData, id, history));
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten()
        })
    }

    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'> 
                {errors.message && 
                           <div className='alert alert-danger card-body'>
                               {errors.message}
                           </div>
                }                              
                {currentRoom && 
                    <div className='card'>
                        <form onSubmit={handleSubmit}>                            
                            <div className='card-body'>  
                                <label htmlFor='timestamp'>Date:</label>
                                <div className='form-group'>
                                    <DatePicker 
                                    className={'form-control'} 
                                    format={'dd-MM-y'} 
                                    minDate={new Date()} 
                                    clearIcon={null} 
                                    onChange={handleDate} 
                                    value={roomEditData.timestamp}
                                    />
                                </div>

                                <label htmlFor='timestamp'>Timeslot:</label>
                                    <span>
                                    <select 
                                        className='form-control' 
                                        id='timestamp-hours' 
                                        name='timestamp-hours' 
                                        onChange={handleHours} 
                                        value={roomEditData.timestamp.getHours()}                        
                                    >
                                        <option value={8}>
                                            08:00
                                        </option>
                                        <option value={9}>
                                            09:00
                                        </option>
                                        <option value={10}>
                                            10:00
                                        </option>
                                        <option value={11}>
                                            11:00
                                        </option>
                                        <option value={12}>
                                            12:00
                                        </option>
                                        <option value={13}>
                                            13:00
                                        </option>
                                        <option value={14}>
                                            14:00
                                        </option>
                                        <option value={15}>
                                            15:00
                                        </option>
                                        <option value={16}>
                                            16:00
                                        </option>
                                        <option value={17}>
                                            17:00
                                        </option>
                                        <option value={18}>
                                            18:00
                                        </option>
                                        <option value={19}>
                                            19:00
                                        </option>
                                        <option value={20}>
                                            20:00
                                        </option>
                                        <option value={21}>
                                            21:00
                                        </option>
                                        <option value={22}>
                                            22:00
                                        </option>
                                    </select>
                                </span>

                                <label htmlFor='capacity'>Capacity:</label> 
                                <select 
                                    className='form-control' 
                                    id='capacity' 
                                    name='capacity' 
                                    onChange={handleChange} 
                                    value={roomEditData.capacity}
                                >
                                    <option value={1}>
                                        1 person
                                    </option>
                                    <option value={6}>
                                        6 person
                                    </option>
                                    <option value={12}>
                                        12 person
                                    </option>
                                </select>   

                                <label htmlFor='price'>Price:</label>
                                <input 
                                    className='form-control' 
                                    id='price' 
                                    name='price' 
                                    onChange={handleChange} 
                                    value={roomEditData.price} 
                                    type="text" 
                                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                />

                                <label htmlFor='promotionCode'>PromotionCode:</label>
                                <input 
                                    className='form-control' 
                                    id='promotionCode' 
                                    name='promotionCode' 
                                    onChange={handleChange} 
                                    value={roomEditData.promotionCode} 
                                    type="text" 
                                />  
                            </div>

                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary'>Update</button>
                            </div>
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default RoomEditPage;