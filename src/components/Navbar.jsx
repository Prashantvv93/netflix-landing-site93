import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaBell } from 'react-icons/fa';

function Navbar() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <Link to="/">
                    <img
                        className="nav__logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                    />
                </Link>

                <div className="nav__links">
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                    <span>TV Shows</span>
                    <span>Movies</span>
                    <span>New & Popular</span>
                    <Link to="/mylist" style={{ textDecoration: 'none', color: 'white' }}>My List</Link>
                </div>

                <div className="nav__right">
                    <Link to="/search" style={{ color: 'white' }}>
                        <FaSearch className="nav__icon" />
                    </Link>
                    <span>KIDS</span>
                    <FaBell className="nav__icon" />
                    <img
                        className="nav__avatar"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="User Avatar"
                    />
                    <button
                        className="nav__signout"
                        onClick={() => {
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
