import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const MessageItem = props => {
    const { id, availability, timestamp, capacity, price, bookedBy } = props;

    const date = dayjs(timestamp);

    return(
        <Link to={`/room/${id}`}>
            <li className='list-group-item'>
                <span className='text-muted'>
                    {date.format("DD-MM-YYYY")}              
                </span>
                <span className='text-muted'>
                    {date.format("HH:mm")}
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
        </Link>
    )   
}

export default MessageItem;