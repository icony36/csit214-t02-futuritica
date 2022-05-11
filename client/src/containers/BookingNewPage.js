import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchRooms, removeError, bookRoom } from '../store/actions';
import { BOOKING } from "../constants";
import BookingNewForm from "../components/BookingNewform";
import PaymentPage from "../components/PaymentPage";

const BookingNewPage = () => {
    const errors = useSelector(state=>state.errors);
    const rooms = useSelector(state => state.rooms);
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

        dispatch(removeError());
            
        dispatch(bookRoom(bookData, BOOKING.book, id, history));
    }

    const handlePaymentPage = () => {
        dispatch(removeError());
        setIsPaymentPage(true);
    }

    if(errors.message){
        const unlisten = history.listen(() => {
            dispatch(removeError());
            unlisten();
        })
    }
    
    return(
        <div className='row justify-content-md-center'>
            <div className='col-md-4'> 
                {currentRoom && 
                    <div className='card'>
                        <form onSubmit={handleBook}>                            
                            <div className='card-body'>  
                                {errors.message && 
                                        <div className='alert alert-danger card-body'>
                                            {errors.message}
                                        </div>
                                }

                                 <h4 className='class-title '>{currentRoom.name}</h4>   
          
                                <h6 className='class-subtitle mb-2 text-muted'>Capacity: {currentRoom.capacity}</h6>                   
                                <h6 className='class-subtitle mb-2 text-muted'>Price: {currentRoom.price}</h6>             
                                <h6 className='class-subtitle mb-2 text-muted'>Promotion Code: {currentRoom.promotionCode}</h6>            
                                                
                                                    
                                {isPaymentPage ? (
                                <>
                                    <PaymentPage />
                                    <div className='card-body text-center'>
                                        <button onClick={()=>setIsPaymentPage(false)} className='btn btn-primary' style={{marginRight: '1rem'}}>Back To Booking</button>
                                        <button type="submit" className='btn btn-success'>Confirm Payment</button>
                                    </div>
                                </>
                                ) : ( 
                                <>
                                    <BookingNewForm handlePaymentPage={handlePaymentPage} currentRoom={currentRoom} bookData={bookData} handleDate={handleDate} handleHours={handleHours}/>
                                   
                                </>   
                                )}


                            </div>                    
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default BookingNewPage;