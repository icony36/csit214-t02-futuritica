import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { fetchBooking, updateBooking, removeError, deleteBooking } from '../store/actions';

const BookingEditPage = ({history}) => {
    const errors = useSelector(state=>state.errors);
    const booking = useSelector(state=>state.booking);

    const { id } = useParams();

    const dispatch = useDispatch();

    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);

    const initState = {
        timestamp: booking.timestamp ? new Date(booking.timestamp) : currentDate
    }

    const [bookingEditData, setBookingEditData] = useState(initState);

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchBooking(id));
        }
        
        fetchData();
    },[])
    
    useEffect(()=> {
        setBookingEditData(()=>({...initState}));        
    },[])

    const handleDate = date => {
        date.setHours(8, 0, 0, 0);
        
        setBookingEditData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleHours = e => {
        const date = bookingEditData.timestamp;
        date.setHours(e.target.value)
        
        setBookingEditData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();
    
        dispatch(updateBooking(bookingEditData, id, history));
    }

    const handleDelete = () => {
        dispatch(deleteBooking(id, history));
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
                {booking && 
                    <div className='card'>
                        <form onSubmit={handleSubmit}>                            
                            <div className='card-body'>  

                            {errors.message && 
                            <div className='alert alert-danger card-body'>
                                {errors.message}
                            </div>
                            }  

                            <label htmlFor='timestamp'>Date:</label>
                            <div className='form-group'>
                                <DatePicker 
                                className={'form-control'} 
                                format={'dd-MM-y'} 
                                minDate={new Date()} 
                                clearIcon={null} 
                                onChange={handleDate} 
                                value={bookingEditData.timestamp}
                                />
                            </div>

                                <label htmlFor='timestamp'>Timeslot:</label>
                                <span>
                                    <select 
                                        className='form-control' 
                                        id='timestamp-hours' 
                                        name='timestamp-hours' 
                                        onChange={handleHours} 
                                        value={bookingEditData.timestamp.getHours()}                        
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

                            </div>

                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary'>Update Booking</button>
                                <button type='button' onClick={handleDelete} className='btn btn-danger btn-block' style={{ marginLeft: "0.5rem"}}>Cancel Booking</button>
                            </div>
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default BookingEditPage;