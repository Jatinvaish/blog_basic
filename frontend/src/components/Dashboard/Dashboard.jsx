import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BASE_URL from '../../common';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    let navigate =  useNavigate()
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const theTokenThing = localStorage.getItem('token');
        if (theTokenThing) {
            const res = await axios.get(`${BASE_URL}/api/auth/user`, {
                //sending a header for token 
                headers: {
                    'x-auth-token': theTokenThing
                }
            })
            setUser(res?.data);
        }
    }
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            {user
                ? <h1> Welcome , {user?.name} </h1>
                : <h1> Contact to admin </h1>
            }
            <button onClick={handleLogOut}>Log Out</button>  
            <button  style={{marginLeft:'20px'}}onClick={()=>navigate('/blogs')}>Blogs </button>
        </>)

}
export default Dashboard;