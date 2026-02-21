import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';
import './Auth.css';

function Signup() {
    const [userid, setUserid] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(userid, username, email, password, phone);
            navigate('/login'); // Redirect to login after signup
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-overlay"></div>
            <div className="auth-form-container">
                <h1>Sign Up</h1>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSignup} className="auth-form">
                    <input
                        type="text"
                        placeholder="User ID (Unique)"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign in.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
