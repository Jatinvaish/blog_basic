import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../common';

const Register = () => {

    //state for hadeling form's Data
    //state ==>one is variabel which store the value and secondone is the function which updates the variabels value
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/register`, formData);
            localStorage.setItem('token', res.data.asyncToken);
            navigate("/dashboard");
        }
        catch (e) {
            alert(e?.response?.data?.mes);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Enter your name ' type='text' name='name' value={name} onChange={onChange} required />
            <input placeholder='Enter your email' type='email' name='email' value={email} onChange={onChange} required />
            <input placeholder='Enter your password' type='password' name='password' value={password} onChange={onChange} required />
            <button type='submit'>Register </button>
        </form>
    )
}

export default Register