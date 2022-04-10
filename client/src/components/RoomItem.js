import React from 'react';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';

const MessageItem = props => {
    const { id, availability, timestamp, capacity, price, bookedBy } = props;


    return(
        <li className='list-group-item'>
            <span className='text-muted'>
                {/* <Moment className='text-muted' format="DD MM YYYY">
                    {timestamp}
                </Moment> */}
            </span>
            <span>
                Availability: {availability}
            </span>
            <span>
                Capacity: {capacity}
            </span>
            <span>
                Price: {price}
            </span>
            <span>
                Booked by: {bookedBy}
            </span>
        </li>
    )   
}

export default MessageItem;