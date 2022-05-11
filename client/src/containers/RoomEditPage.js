import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRooms, updateRoom, removeError, deleteRoom } from '../store/actions';

const RoomEditPage = ({history}) => {
    const errors = useSelector(state=>state.errors);
    const rooms = useSelector(state => state.rooms);
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];

    const initState = {
        name: currentRoom ? currentRoom.name : "",
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
    
        dispatch(updateRoom(roomEditData, id, history));
    }

    const handleDelete = () => {
        dispatch(deleteRoom(id, history));
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
                                <label htmlFor='name'>Room Name:</label>
                                    <input 
                                        className='form-control' 
                                        id='name' 
                                        name='name' 
                                        onChange={handleChange} 
                                        value={roomEditData.name} 
                                        type="text" 
                                    />  
                                

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

                                <label htmlFor='promotionCode'>Promotion Code:</label>
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
                                <button type='button' onClick={handleDelete} className='btn btn-danger btn-block' style={{ marginLeft: "0.5rem"}}>Delete Room</button>
                            </div>
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default RoomEditPage;