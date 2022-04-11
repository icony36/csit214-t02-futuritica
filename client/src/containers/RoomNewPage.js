import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-date-picker';
import { postNewRoom, removeError } from '../store/actions';

const RoomNewPage = ({history}) => {
    const errors = useSelector(state => state.errors);
    
    const dispatch = useDispatch();

    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);

    const defaultRoomData = {
        timestamp: currentDate,
        availability: "",
        capacity: 1,
        price: 0,
        promotionCode: "",
    }
    
    const [roomData, setRoomData] = useState(defaultRoomData)

    const handleChange = e => {
        setRoomData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleDate = date => {
        setRoomData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleHours = e => {
        const date = roomData.timestamp;
        date.setHours(e.target.value)
        
        setRoomData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    // const handleMinutes = e => {
    //     const date = roomData.timestamp;
    //     date.setMinutes(e.target.value)

    //     setRoomData(prevState => (
    //         {
    //             ...prevState,
    //             timestamp: date
    //         }
    //     ))
    // }

    const handleSubmit = e => {
        e.preventDefault();
    
        console.log(roomData);
        dispatch(postNewRoom(roomData));
        setRoomData(defaultRoomData);
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten()
        })
    }

    return(
        <div>
            <h2>Create a new room</h2>
            <form onSubmit={handleSubmit}>
                {errors.message && 
                    <div className='alert alert-danger'>
                        {errors.message}
                    </div>
                }
                
                <label htmlFor='timestamp'>Date (required):</label>
                <div className='form-group'>
                    {/* <DateTimePicker clearIcon={null} disableClock onChange={handleChange} value={roomData.timestamp}/> */}
                    <DatePicker className={'form-control'} format={'dd-MM-y'}clearIcon={null} onChange={handleDate} value={roomData.timestamp} />
                </div>

                {/* <div>{roomData.timestamp}</div> */}

                <label htmlFor='timestamp'>Timeslot (required):</label>
                    <span>
                    <select 
                        className='form-control' 
                        id='timestamp-hours' 
                        name='timestamp-hours' 
                        onChange={handleHours} 
                        value={roomData.timestamp.getHours()}                        
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
                {/* <span>
                    <select 
                        className='form-control' 
                        id='timestamp-minutes' 
                        name='timestamp-minutes' 
                        onChange={handleMinutes} 
                        value={roomData.timestamp.getMinutes()}
                    >
                        <option value={0}>
                            00
                        </option>
                        <option value={30}>
                            30
                        </option>
                    </select>                    
                </span> */}

                <label htmlFor='capacity'>Capacity (required):</label> 
                 <select 
                    className='form-control' 
                    id='capacity' 
                    name='capacity' 
                    onChange={handleChange} 
                    value={roomData.capacity}
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

                <label htmlFor='price'>Price (required):</label>
                <input 
                    className='form-control' 
                    id='price' 
                    name='price' 
                    onChange={handleChange} 
                    value={roomData.price} 
                    type="number" 
                />

                <label htmlFor='promotionCode'>PromotionCode:</label>
                <input 
                    className='form-control' 
                    id='promotionCode' 
                    name='promotionCode' 
                    onChange={handleChange} 
                    value={roomData.promotionCode} 
                    type="text" 
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

                <button type="submit" className='btn btn-primary btn-block btn-lg' style={{marginTop: "2rem"}}>Create room</button>
            </form>
        </div>
    )
}

export default RoomNewPage;