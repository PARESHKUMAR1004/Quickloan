import React,{ useContext} from 'react'
import { AuthContext } from '../service/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Items () {
    const { isLoading,isUserAuthenticated, user } = useContext(AuthContext);

    const ItemComp = (data) => (
        <div>
            <h1>Hi {data.email}</h1>
            <h1>Items List</h1>
        </div>
    )

    if(isLoading){
        return(<div>Loading</div>)
    } else if(isUserAuthenticated) {
        return (<ItemComp data={user}></ItemComp>)
    } else {
        return <Navigate to='/login' />
    }
}