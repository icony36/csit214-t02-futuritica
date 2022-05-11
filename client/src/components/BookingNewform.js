import React from "react";
import DatePicker from 'react-date-picker';


const BookingNewForm = ({setIsPaymentPage, currentRoom, handleDate, handleHours, bookData}) => {
    return(
        <>        
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

            <div className='card-body text-center'>
                <button onClick={()=>setIsPaymentPage(true)} className='btn btn-primary'>Proceed To Payment</button>
            </div>
        </>
    )   
}

export default BookingNewForm;