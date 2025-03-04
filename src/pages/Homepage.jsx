// import React, { useState, useEffect } from 'react';  // Fecth API soon
import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const Homepage = () => {
    console.log("Homepage is rendering!"); // Debugging log
    
    return (
        <div>
            <Header />
            <h1>Welcome to the Homepage</h1>
            <Footer />
        </div>
    );
};

export default Homepage;
