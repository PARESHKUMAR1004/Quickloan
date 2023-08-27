import React, {useContext} from 'react'

import { AuthContext } from '../../service/AuthContext'
import { Navigate } from 'react-router-dom';
import Employees from '../Employees';

export default function MainEmployee(){

    const { isLoading,isUserAuthenticated,userType } = useContext(AuthContext);
    if(isLoading){
        return(<div>Loading</div>)
    } else if(!isUserAuthenticated) {
        return (
            <Navigate to='/login' />
        )
    } else {
        return userType===1?<Employees/> : <Navigate to="/" />
    }
}