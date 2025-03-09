// src/pages/ContactPage.jsx
import React, { useState, useRef } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    // State for error messages
    const [errors, setErrors] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    // State to track form submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Create a reference for the subject input field
    const subjectRef = useRef(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Validate the form fields
    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters.';
        }

        // Subject validation
        if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters.';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Body validation
        if (formData.body.trim().length < 3) {
            newErrors.body = 'Body must be at least 3 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Validate form before submission
            setIsSubmitted(true); // Mark form as submitted to trigger error checks
            if (validateForm()) {
                // If the form is valid, handle submission (e.g., show success message or send data)
                alert('Form submitted successfully!');
                setFormData({ fullName: '', subject: '', email: '', body: '' }); // Reset form
                setErrors({}); // Clear any errors
                setIsSubmitted(false); // Reset the submission state
            } else {
                // If there's an error, focus on the subject field if it's invalid
                if (errors.subject) {
                    subjectRef.current.focus();
                }
            }
        } catch (error) {
            // Log the error if something goes wrong during submission
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div 
            className="flex justify-center items-center min-h-screen" 
            style={{
                backgroundImage: 'url("https://cdn.pixabay.com/photo/2025/01/26/00/27/flowers-9359943_1280.png")', 
                backgroundPosition: 'center'
            }}
        >
            <div 
                className="p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-lg"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
            >
                <h1 className="text-2xl font-semibold text-center">Contact Us</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your full name (min. 3 characters)"
                        />
                        {isSubmitted && errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Subject */}
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            ref={subjectRef} // Set the ref here to allow focus
                            placeholder="Enter the subject (min. 3 characters)"
                        />
                        {isSubmitted && errors.subject && (
                            <p className="text-red-500 text-sm">{errors.subject}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter a valid email address"
                        />
                        {isSubmitted && errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    {/* Body */}
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-sm font-medium">
                            Message Body
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your message (min. 3 characters)"
                        ></textarea>
                        {isSubmitted && errors.body && (
                            <p className="text-red-500 text-sm">{errors.body}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#B7B1F2] text-white rounded-md w-full hover:bg-[#A59EDD] transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
