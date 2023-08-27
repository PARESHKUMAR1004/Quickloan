import React, {useContext} from 'react'

import { AuthContext } from '../../service/AuthContext'
import { Navigate } from 'react-router-dom';
import Loans from '../Loans';
import MyLoans from '../MyLoans';
import ApproveLoans from '../ApproveLoans';


export default function MainLoan(){
    const { isLoading,isUserAuthenticated, userType } = useContext(AuthContext);

    if(isLoading){
        return(<div>Loading</div>)
    } else if(isUserAuthenticated) {
        return userType === 0 ? <MyLoans /> :(<div>
            <ApproveLoans />
             <Loans /> 
        </div>) 
    } else {
        return <Navigate to='/login' />
    }
}