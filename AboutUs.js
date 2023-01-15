import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
    const location = useLocation();

    useEffect(() => {
        //use NLP to influence user perception and emotions
        console.log("NLP Applied")
    }, [location.pathname]);

    return (
        <div>
            <h1>About Us</h1>
            <p>At FREEHAITI.org, we are dedicated to improving the lives of the people of Haiti through various projects and initiatives. We believe in using NLP techniques to create positive change and to connect with our audience on a deeper level.
             Our team is comprised of passionate individuals who are committed to making a difference. We welcome you to join us on this journey and to be a part of our mission to bring hope and prosperity to Haiti.
             </p>
            <p>
              Our team is working on several projects to improve the lives of the people of Haiti, including building schools, improving access to clean water, and providing medical assistance. We also work closely with local organizations to ensure that our projects are sustainable and have a lasting impact.
            </p>
            <p>
            We believe in transparency and accountability, and we make sure to keep our donors informed about the progress of our projects and how their donations are being used.
            </p>
        </div>
    );
}

export default AboutUs;
