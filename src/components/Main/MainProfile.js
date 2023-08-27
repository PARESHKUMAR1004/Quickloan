import React,{ useContext} from 'react'
import { AuthContext } from '../../service/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfilePage from '../ProfilePage';

export default function MainProfile () {
    const { isLoading,isUserAuthenticated,userType} = useContext(AuthContext);

    if(isLoading){
        return(<div>Loading</div>)
    } else if(!isUserAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return userType === 0 ? <ProfilePage /> : <Navigate to='/' />
        
    }
}