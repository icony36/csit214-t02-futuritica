import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchBooking } from '../store/actions';
import { BOOKING } from "../constants";


const BookingPage = () => {
    const booking = useSelector(state => state.booking);
    const dispatch = useDispatch();

    const { id } = useParams();
    
    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchBooking(id));

        }

        fetchData();
    },[])

    return(
        <div className='row justify-content-md-center'>
        <div className='col-md-4'>
            <div className='card room-details' style={{width: '18rem'}}>
                <div className='card-body'>
                    {booking.room && 
                        <>
                            <h4 className='fw-bold'>
                                Room {booking.room.name}
                            </h4>                       

                            <h6 className='text-muted'>
                               Booking date: {dayjs(booking.timestamp).format("DD-MMMM-YYYY")}
                            </h6>

                            <h6 className='text-muted'>
                               Booking time: {dayjs(booking.timestamp).format("HH:mm")}
                            </h6>

                            <div className='card-body text-center'>
                                <Link to={`/booking/${id}/edit`}>
                                    <button className='btn btn-primary btn-block'>Edit Booking</button>
                                </Link>
                            </div>                       
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default BookingPage;