import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/actions';
import UserItem from '../../components/User/UserItem';
import { ROLE } from '../../constants';
import Loading from '../../components/Loading';

const UserList = () => {
    const users = useSelector(state => state.users);
    const loading = useSelector(state => state.loading);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
       const fetchData = async () => {
           await dispatch(fetchUsers());
       }

       fetchData();
       
    },[]);

    const compare = (a, b) => {        
        if (a.logInTime === null) {
            return 1;
          }
        
          if (b.logInTime === null) {
            return -1;
          }
        
          if (a.logInTime === b.logInTime) {
            return 0;
          }
        
          return a.logInTime < b.logInTime ? 1 : -1;
    }

    users.sort(compare); // sort users based on timestamp
   
    const staffList = users.filter(u => (u.role === ROLE.staff && !u.isSuspended )).map(u => (
        <UserItem
            key={u._id}    
            id={u._id} 
            username={u.username} 
            role={u.role} 
            lastLogin={u.logInTime} 
        />
    ))

    const studentList = users.filter(u => (u.role === ROLE.student && !u.isSuspended )).map(u => (
        <UserItem 
            key={u._id}
            id={u._id}     
            username={u.username} 
            role={u.role} 
            lastLogin={u.logInTime} 
        />
    ))

    const suspendedList = users.filter(u => (u.isSuspended)).map(u => (
        <UserItem 
            key={u._id}
            id={u._id}     
            username={u.username} 
            role={u.role} 
            lastLogin={u.logInTime} 
        />
    ))

    return(
        <div className='row'>
            <div className='offset-1 col-sm-10'>
                <div className='list-info'>
                    <span className="text-warning">Total staff: {staffList.length}</span>
                </div>
                <ul className='room-list list-group list-group-flush' >
                    {staffList}
                </ul>
                <div className='list-info'>
                    <span className="text-info">Total student: {studentList.length}</span>
                </div>
                <ul className='room-list list-group list-group-flush' >
                    {studentList}
                </ul>
                <div className='list-info'>
                    <span className="text-danger">Suspended account: {suspendedList.length}</span>
                </div>
                <ul className='room-list list-group list-group-flush' >
                    {suspendedList}
                </ul>
            </div>
            <Loading loading={loading}/>
        </div>
    )

}

export default UserList;