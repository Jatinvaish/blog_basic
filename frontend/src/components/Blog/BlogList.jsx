import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../common';
import '../../App.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await axios.get(`${BASE_URL}/api/blogs`);
            setBlogs(res.data);
        };
        fetchBlogs();
    }, []);

    const deleteBlog = async id => {
        try {
            await axios.delete(`${BASE_URL}/api/blogs/${id}`);
            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        // <div>
        //     <h1>Blogs</h1>
        //     <Link to='/create-blog'>Create Blog</Link>
        //     <ul>
        //         {blogs.map(blog => (
        //             <li key={blog._id}>
        //                 <Link to={`/create-blog/${blog._id}`}>{blog.title}</Link>
        //                 <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className="container">
            <Link to='/create-blog'>Create Blog</Link>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Title </th>
                            <th>Category </th>
                            <th>Status </th>
                            <th>Slug </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.length > 0 ?
                                blogs.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>{item.category}</td>
                                            <td>{item.status}</td>
                                            <td>{item.slug}</td>
                                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link className="btn btn-edit" to={`/create-blog/${item._id}`}>Update</Link>
                                                <button className="btn btn-danger" onClick={() => { deleteBlog(item._id) }}>delete</button>   </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={6}>
                                        data not found
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogList;
