import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-date-picker';
import { postNewRoom, removeError } from '../store/actions';
import { AVAL } from '../constants';

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
        dispatch(postNewRoom(roomData, history));
        setRoomData(defaultRoomData);
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
                <div className='card'>
                    <div className='card-body'>
                        <h4 className='class-title'>Create a new room</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            {errors.message && 
                                <div className='alert alert-danger'>
                                    {errors.message}
                                </div>
                            }
                            
                            <label htmlFor='timestamp'>Date (required):</label>
                            <div className='form-group'>
                                <DatePicker className={'form-control'} format={'dd-MM-y'} minDate={new Date()} clearIcon={null} onChange={handleDate} value={roomData.timestamp} />
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
                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} 
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
                                <option value={AVAL.private}>
                                    Private
                                </option>
                                <option value={AVAL.public}>
                                    Public
                                </option>
                            </select>
                        </div>
                        <div className='card-body text-center'>
                            <button type="submit" className='btn btn-primary btn-block btn-lg' >Create room</button>
                        </div>
                    </form>
                </div>

                   
            </div>
        </div>
    )
}

export default RoomNewPage;