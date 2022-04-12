import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const MessageItem = props => {
    const { id, availability, timestamp, capacity, price, bookedBy } = props;

    const date = dayjs(timestamp);

    return(
        <li className='list-group-item'>
            <Link to={`/room/${id}`}>
                <span className='roomitem-date'>
                    {date.format("DD-MM-YYYY")}              
                </span>
                <span className='roomitem-time'>
                    {date.format("HH:mm")}              
                </span>
            </Link>
        </li>
    )   
}

export default MessageItem;