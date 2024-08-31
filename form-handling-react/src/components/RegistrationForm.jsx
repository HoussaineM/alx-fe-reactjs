// src/components/RegistrationForm.js

import React, { useState } from 'react';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const username = formData.username
    const email = formData.email
    const password = formData.password

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!username) tempErrors.usernames = 'Username is required';
        if (!email) tempErrors.emails = 'Email is required';
        if (!password) tempErrors.passwords = 'Password is required';
        return tempErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Data:', formData);
            // Simulate API call
            // fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                {errors.usernames && <p>{errors.usernames}</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                {errors.emails && <p>{errors.emails}</p>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                {errors.passwords && <p>{errors.passwords}</p>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;