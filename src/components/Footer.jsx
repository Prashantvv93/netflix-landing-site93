import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer__links">
                <ul>
                    <li>FAQ</li>
                    <li>Investor Relations</li>
                    <li>Ways to Watch</li>
                    <li>Corporate Information</li>
                    <li>Netflix Originals</li>
                </ul>
                <ul>
                    <li>Help Center</li>
                    <li>Jobs</li>
                    <li>Terms of Use</li>
                    <li>Contact Us</li>
                </ul>
                <ul>
                    <li>Account</li>
                    <li>Redeem Gift Cards</li>
                    <li>Privacy</li>
                    <li>Speed Test</li>
                </ul>
                <ul>
                    <li>Media Center</li>
                    <li>Buy Gift Cards</li>
                    <li>Cookie Preferences</li>
                    <li>Legal Notices</li>
                </ul>
            </div>
            <div className="footer__bottom">
                <span className="footer__copy">&copy; 2024 Netflix Clone</span>
            </div>
        </div>
    );
}

export default Footer;
