import React, { useEffect, useState } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onFinish }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onFinish, 500); // Wait for fade out
        }, 4000); // 4 seconds duration

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`intro-container ${!show ? 'fade-out' : ''}`}>
            <div className="intro-logo">
                <span className="n-letter">N</span>
                <span className="e-letter">E</span>
                <span className="t-letter">T</span>
                <span className="f-letter">F</span>
                <span className="l-letter">L</span>
                <span className="i-letter">I</span>
                <span className="x-letter">X</span>
            </div>
        </div>
    );
};

export default IntroAnimation;
