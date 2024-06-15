import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from '../../common';

const Login = () => {

    //state for hadeling form's Data
    //state ==>one is variabel which store the value and secondone is the function which updates the variabels value
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.asyncToken);
            navigate("/dashboard");

        } catch (error) {
            alert(e?.response?.data?.mes);
        }
    }

    useEffect(() => {
        const theTokenThing = localStorage.getItem('token');
        if (theTokenThing) navigate('/dashboard')
    }, [])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input placeholder='Enter your email ' type='email' name='email' value={email} onChange={onChange} required />
                <input placeholder='Enter your password ' type='password' name='password' value={password} onChange={onChange} required />
                <button type='submit'>Login </button>
            </form>
            don't have an account  <Link to="/sign-up">
                sign up
            </Link>
        </>
    )
}

export default Login