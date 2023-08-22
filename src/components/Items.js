import React,{ useContext} from 'react'
import { AuthContext } from '../service/AuthContext';

export default function Items () {
    const { isLoading, user } = useContext(AuthContext);

    return (
        <div>
            <h1>Hi {isLoading ? "" : user ? user.email : ""}</h1>
            <h1>Items List</h1>
        </div>
    );
}