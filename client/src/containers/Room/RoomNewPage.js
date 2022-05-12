import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postNewRoom, removeMessage } from '../../store/actions';
import { AVAL } from '../../constants';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const RoomNewPage = ({history}) => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
    
    const dispatch = useDispatch();

    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);

    const defaultRoomData = {
        name: "",
        availability: "",
        capacity: 1,
        price: 0,
        promotionCode: "",
    }
    
    const [roomData, setRoomData] = useState(defaultRoomData)

    const handleChange = e => {
        setRoomData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(postNewRoom(roomData));
        setRoomData(defaultRoomData);
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
                    <div className='card-body'>
                        <Message messages={messages}/>
                        <h4 className='class-title'>Create a new room</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            {!loading.isLoading ? 
                            <>
                                <label htmlFor='price'>Room Name (required):</label>
                                <input 
                                    className='form-control' 
                                    id='name' 
                                    name='name' 
                                    onChange={handleChange} 
                                    value={roomData.name} 
                                    type='text'
                                />
                            

                                <label htmlFor='capacity'>Capacity (required):</label> 
                                <select 
                                    className='form-control' 
                                    id='capacity' 
                                    name='capacity' 
                                    onChange={handleChange} 
                                    value={roomData.capacity}
                                >
                                    <option value={1}>
                                        1 person
                                    </option>
                                    <option value={6}>
                                        6 person
                                    </option>
                                    <option value={12}>
                                        12 person
                                    </option>
                                </select>   

                                <label htmlFor='price'>Price (required):</label>
                                <input 
                                    className='form-control' 
                                    id='price' 
                                    name='price' 
                                    onChange={handleChange} 
                                    value={roomData.price} 
                                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} 
                                />

                                <label htmlFor='promotionCode'>Promotion Code:</label>
                                <input 
                                    className='form-control' 
                                    id='promotionCode' 
                                    name='promotionCode' 
                                    onChange={handleChange} 
                                    value={roomData.promotionCode} 
                                    type="text" 
                                />

                                <label htmlFor='availability'>Availability (required):</label>
                                <select 
                                    className='form-control' 
                                    id='availability' 
                                    name='availability' 
                                    onChange={handleChange} 
                                    value={roomData.availability}
                                >
                                    <option value="" disabled hidden>Choose...</option>
                                    <option value={AVAL.private}>
                                        Private
                                    </option>
                                    <option value={AVAL.public}>
                                        Public
                                    </option>
                                </select>
                                <div className='card-body text-center'>
                                    <button type="submit" className='btn btn-primary btn-block btn-lg' >Create room</button>
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

export default RoomNewPage;