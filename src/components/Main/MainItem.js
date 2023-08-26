import React, {useState,useContext} from 'react'

import { AuthContext } from '../../service/AuthContext'
import { Navigate } from 'react-router-dom';
import Items from '../Items';

export default function MainItem(){

    const { isLoading,isUserAuthenticated,userType } = useContext(AuthContext);
    if(isLoading){
        return(<div>Loading</div>)
    } else if(!isUserAuthenticated) {
        return (
            <Navigate to='/login' />
        )
    } else if(userType ===1){
        return (

            <Items/>
        )
    }

    else{

        return(
            <EmployeeItems/>
        )
    }



}