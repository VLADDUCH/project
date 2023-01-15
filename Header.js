import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to="/">
                <h1>Free Haiti</h1>
            </Link>
            <nav>
                <Link to="/about">About Us</Link>
                <Link to="/donate">Donate</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>
    );
}

export default Header;
