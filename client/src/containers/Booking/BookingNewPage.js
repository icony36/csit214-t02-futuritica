import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchRooms, removeMessage, createBooking } from '../../store/actions';
import { BOOKING } from "../../constants";
import BookingNewForm from "../../components/Booking/BookingNewform";
import PaymentPage from "../../components/Booking/PaymentPage";
import Message from "../../components/Message";
import Loading from "../../components/Loading";

const BookingNewPage = () => {
    const messages = useSelector(state=>state.messages);
    const rooms = useSelector(state => state.rooms);
    const loading = useSelector(state => state.loading);

    const { id } = useParams();

    const history = useHistory();

    const dispatch = useDispatch();

    const currentRoom = rooms.filter(r => r._id === id)[0];
    
    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);

    const [bookData, setBookData] = useState({
        timestamp: currentDate
    });
    
    const [isPaymentPage, setIsPaymentPage] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchRooms());            
        }

        fetchData();
     },[]);

    const handleDate = date => {
        date.setHours(8, 0, 0, 0);
        
        setBookData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleHours = e => {
        const date = bookData.timestamp;
        date.setHours(e.target.value)
        
        setBookData(prevState => (
            {
                ...prevState,
                timestamp: date
            }
        ))
    }

    const handleBook = e => {
        e.preventDefault();

        dispatch(removeMessage());
            
        dispatch(createBooking(bookData, BOOKING.book, id, history));
    }

    const handlePaymentPage = () => {
        dispatch(removeMessage());
        setIsPaymentPage(true);
    }

    if(messages.message){
        const unlisten = history.listen(() => {
            dispatch(removeMessage());
            unlisten();
        })
    }
    
    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'> 
                <div className='card'>
                    <form onSubmit={handleBook}>                            
                        <div className='card-body'>  
                            <Message messages={messages}/>
                            {currentRoom && !loading.isLoading ?
                            <>
                                <h4 className='class-title '>Room {currentRoom.name}</h4>   
            
                                <h6 className='class-subtitle mb-2 text-muted'>Capacity: {currentRoom.capacity}</h6>                   
                                <h6 className='class-subtitle mb-2 text-muted'>Price: {currentRoom.price}</h6>             
                                <h6 className='class-subtitle mb-2 text-muted'>Promotion Code: {currentRoom.promotionCode}</h6>            
                                                                                                    
                                {isPaymentPage ? 
                                <>
                                    <PaymentPage />
                                    <div className='card-body text-center'>
                                        <button onClick={()=>setIsPaymentPage(false)} className='btn btn-primary' style={{marginRight: '1rem'}}>Back To Booking</button>
                                        <button type="submit" className='btn btn-success'>Confirm Payment</button>
                                    </div>
                                </> : 
                                <>
                                    <BookingNewForm 
                                    handlePaymentPage={handlePaymentPage} 
                                    currentRoom={currentRoom} 
                                    bookData={bookData} 
                                    handleDate={handleDate} 
                                    handleHours={handleHours}/>                                    
                                </>   
                                }
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

export default BookingNewPage;