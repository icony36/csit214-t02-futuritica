import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postNewRoom, removeError } from '../store/actions';

const RoomNewPage = ({history}) => {
    const errors = useSelector(state => state.errors);
    
    const dispatch = useDispatch();

    const defaultState = {
        timestamp: 0,
        availability: "",
        capacity: 0,
        price: 0,
        promotionCode: "",
    }
    
    const [roomData, setRoomData] = useState(defaultState)

    const handleChange = e => {
        setRoomData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();
    
        console.log(roomData);
        dispatch(postNewRoom(roomData));
        setRoomData(defaultState);
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten()
        })
    }

    return(
        <div>
            <h2>Create new room</h2>
            <form onSubmit={handleSubmit}>
                {errors.message && 
                    <div className='alert alert-danger'>
                        {errors.message}
                    </div>
                }

                <label htmlFor='timestamp'>Time (required):</label>
                <input 
                    className='form-control' 
                    id='timestamp' 
                    name='timestamp' 
                    onChange={handleChange} 
                    value={roomData.timestamp} 
                    type="text" 
                />

                <label htmlFor='capacity'>Capacity (required):</label>
                <input 
                    className='form-control' 
                    id='capacity' 
                    name='capacity' 
                    onChange={handleChange} 
                    value={roomData.capacity} 
                    type="number" 
                />

                <label htmlFor='price'>Price (required):</label>
                <input 
                    className='form-control' 
                    id='price' 
                    name='price' 
                    onChange={handleChange} 
                    value={roomData.price} 
                    type="number" 
                />

                <label htmlFor='promotionCode'>PromotionCode (required):</label>
                <input 
                    className='form-control' 
                    id='promotionCode' 
                    name='promotionCode' 
                    onChange={handleChange} 
                    value={roomData.promotionCode} 
                    type="number" 
                />

                <label htmlFor='availability'>Availability (required):</label>
                <select 
                    className='form-control' 
                    id='availability' 
                    name='availability' 
                    onChange={handleChange} 
                    value={roomData.availability}
                >
                    <option value="" disabled hidden>Choose...</option>
                    <option value="private">
                        Private
                    </option>
                    <option value="public">
                        Public
                    </option>
                </select>

                <button type="submit" className='btn btn-primary btn-block btn-lg' style={{marginTop: "2rem"}}>Craete room</button>
            </form>
        </div>
    )
}

export default RoomNewPage;