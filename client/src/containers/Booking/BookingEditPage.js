import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { fetchBooking, updateBooking, removeMessage, deleteBooking } from '../../store/actions';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const BookingEditPage = ({history}) => {
    const messages = useSelector(state=>state.messages);
    const booking = useSelector(state=>state.booking);
    const loading = useSelector(state=>state.loading);

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
    
        dispatch(updateBooking(bookingEditData, id));
    }

    const handleDelete = () => {
        dispatch(deleteBooking(id, history));
    }

    if(messages.message){
        const unlisten = history.listen(() => {
            dispatch(removeMessage());
            unlisten()
        })
    }

    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'>
                <div className='card'>
                    <form onSubmit={handleSubmit}>                            
                        <div className='card-body'>                          
                        <Message messages={messages}/>                             
                        {booking && !loading.isLoading ?
                        <>
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


                            <div className='card-body text-center'>
                                <button type="submit" className='btn btn-primary'>Update Booking</button>
                                <button type='button' onClick={handleDelete} className='btn btn-danger btn-block' style={{ marginLeft: "0.5rem"}}>Cancel Booking</button>
                            </div>
                        </> :
                        <Loading small/>
                        }
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default BookingEditPage;