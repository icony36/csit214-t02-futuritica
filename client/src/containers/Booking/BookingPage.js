import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchBooking } from '../../store/actions';
import Loading from '../../components/Loading';

const BookingPage = () => {
    const booking = useSelector(state => state.booking);
    const loading = useSelector(state => state.loading);


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
                    {booking.room && booking.user && !loading.isLoading ?
                    <>
                        <h4 className='card-title'>
                            Booking Details
                        </h4>                       

                        <h6 className='text-muted'>
                            booked by: {booking.user.username}
                        </h6>

                        <ul className='list-group'>
                            <li className='list-group-item'>Location: Room {booking.room.name}</li>
                            <li className='list-group-item'>Date: {dayjs(booking.timestamp).format("DD-MMMM-YYYY")}</li>
                            <li className='list-group-item'>Time: {dayjs(booking.timestamp).format("HH:mm")}</li>
                        </ul>

                        <div className='card-body text-center'>
                            <Link to={`/booking/${id}/edit`}>
                                <button className='btn btn-primary btn-block'>Edit Booking</button>
                            </Link>
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

export default BookingPage;