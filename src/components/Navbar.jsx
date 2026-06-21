import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-nav">
                <div class="nav-container">
                    <Link to="/" className="logo" id="nav-logo" onClick={closeDrawer}>
                        <span className="logo-terminal">&lt;</span>AlexChen<span className="logo-terminal"> /&gt;</span>
                    </Link>
                    
                    <nav className="nav-links" id="nav-menu">
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} id="link-home">
                            <i className="fa-solid fa-house"></i> Home
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} id="link-about">
                            <i className="fa-solid fa-user"></i> About
                        </NavLink>
                        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} id="link-projects">
                            <i className="fa-solid fa-laptop-code"></i> Projects
                        </NavLink>
                    </nav>

                    <div className="nav-actions">
                        <button className="theme-toggle" id="theme-toggle-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
                            {theme === "dark" ? (
                                <i className="fa-solid fa-sun sun-icon" style={{ display: "block" }}></i>
                            ) : (
                                <i className="fa-solid fa-moon moon-icon" style={{ display: "block" }}></i>
                            )}
                        </button>
                        <button className="mobile-menu-toggle" id="mobile-toggle" aria-label="Toggle Mobile Menu" onClick={toggleDrawer}>
                            <i className={`fa-solid ${drawerOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div className={`mobile-drawer ${drawerOpen ? "active" : ""}`} id="mobile-drawer">
                <nav className="mobile-drawer-links">
                    <NavLink to="/" className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`} id="mlink-home" onClick={closeDrawer}>
                        <i className="fa-solid fa-house"></i> Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`} id="mlink-about" onClick={closeDrawer}>
                        <i className="fa-solid fa-user"></i> About
                    </NavLink>
                    <NavLink to="/projects" className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`} id="mlink-projects" onClick={closeDrawer}>
                        <i className="fa-solid fa-laptop-code"></i> Projects
                    </NavLink>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
