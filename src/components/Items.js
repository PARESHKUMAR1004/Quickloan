import React,{ useContext} from 'react'
import { AuthContext } from '../service/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Items () {
    const { isLoading,isUserAuthenticated, user } = useContext(AuthContext);

    if(isLoading){
        return(<div>Loading</div>)
    } else if(isUserAuthenticated) {
        return (<div >
            <h1>Hi {user.email}</h1>
            <h1>Items List</h1>
        </div>)
    } else {
        return <Navigate to='/login' />
    }
}