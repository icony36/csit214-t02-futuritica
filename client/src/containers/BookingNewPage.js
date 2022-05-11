import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { fetchRooms, removeError, bookRoom } from '../store/actions';
import { BOOKING } from "../constants";

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
    
        dispatch(bookRoom(bookData, BOOKING.book, id, history));
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
                               
                                <label htmlFor='timestamp'>Date:</label>
                                <div className='form-group'>
                                    <DatePicker 
                                    className={'form-control'} 
                                    format={'dd-MM-y'} 
                                    minDate={new Date()} 
                                    clearIcon={null} 
                                    onChange={handleDate} 
                                    value={bookData.timestamp}
                                    />
                                </div>

                                <label htmlFor='timestamp'>Timeslot:</label>
                                    <span>
                                    <select 
                                        className='form-control' 
                                        id='timestamp-hours' 
                                        name='timestamp-hours' 
                                        onChange={handleHours} 
                                        value={bookData.timestamp.getHours()}                        
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
                                <button type="submit" className='btn btn-primary'>Confirm Booking</button>
                            </div>
                        </form>
                    </div>  
                }
            </div>
        </div>
    )
}

export default BookingNewPage;