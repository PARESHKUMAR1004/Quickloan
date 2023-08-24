import React,{ useContext} from 'react'
import { AuthContext } from '../service/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

export default function Profile () {
    const { isLoading,isUserAuthenticated} = useContext(AuthContext);

    if(isLoading){
        return(<div>Loading</div>)
    } else if(isUserAuthenticated) {
        return (
         <ProfilePage />
        )
    } else {
        return <Navigate to='/login' />
    }
}