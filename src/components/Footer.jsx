import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-socials">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="f-social-link"><i className="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="f-social-link"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="f-social-link"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="mailto:alex@example.com" className="f-social-link"><i class="fa-solid fa-envelope"></i></a>
                </div>
                <p className="footer-text">Built from scratch with React, Three.js, and Vanilla CSS.</p>
                <p className="footer-copyright">&copy; 2026 Alex Chen. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
