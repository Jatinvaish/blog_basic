import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import BASE_URL from '../../common';
import { useNavigate, useParams } from 'react-router-dom';

const categoryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' },
    { value: 'Education', label: 'Education' },
];

const statusOptions = [
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Reject', label: 'Reject' },
];

const BlogForm = () => {
    let navigate = useNavigate()
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'Pending'
    });

    const { title, description, category, status } = formData;

    const isEditMode = id;
    useEffect(() => {
        if (isEditMode) {
            const fetchBlog = async () => {
                const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
                setFormData({
                    title: res.data.title,
                    description: res.data.description,
                    category: res.data.category,
                    status: res.data.status
                });
            };
            fetchBlog();
        }
    }, [isEditMode]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCategoryChange = selectedOption => {
        setFormData({ ...formData, category: selectedOption.value });
    };

    const onStatusChange = selectedOption => {
        setFormData({ ...formData, status: selectedOption.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (title.length < 5 || title.length > 100) {
            return alert('Title must be between 5 and 100 characters');
        }

        try {
            if (isEditMode) {
                await axios.put(`${BASE_URL}/api/blogs/${id}`, formData);
            } else {
                await axios.post(`${BASE_URL}/api/blogs`, formData);
            }
            navigate('/blogs');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
                placeholder='Title'
                required
            />
            <textarea
                name='description'
                value={description}
                onChange={onChange}
                placeholder='Description'
                required
            />
            <Select
                name='category'
                options={categoryOptions}
                value={categoryOptions.find(option => option.value === category)}
                onChange={onCategoryChange}
                placeholder='Category'
                required
            />
            <br/>
            <Select
                name='status'
                options={statusOptions}
                value={statusOptions.find(option => option.value === status)}
                onChange={onStatusChange}
                placeholder='Status'
            />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default BlogForm;
