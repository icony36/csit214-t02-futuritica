import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchRooms, updateRoom } from '../store/actions';

const RoomEditForm = () => {
    const errors = useSelector(state=>state.errors);
    const rooms = useSelector(state => state.rooms);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    const initState = {
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

    const handleSubmit = e => {
        e.preventDefault();
    
        dispatch(updateRoom(roomEditData, id));
    }
    
    return(
        <>
            {currentRoom && 
                <div>
                    <form onSubmit={handleSubmit}>
                        {errors.message && 
                            <div className='alert alert-danger'>
                                {errors.message}
                            </div>
                        }
                        
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
                            type="number" 
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

                        <button style={{marginTop: '1rem'}}type="submit" className='btn btn-primary'>Update</button>
                    </form>
                </div>
            }
        </>
    )
}

export default RoomEditForm;