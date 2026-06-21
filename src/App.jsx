import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import AboutUs from "./pages/AboutUs.jsx";

// Scroll to top on route change helper
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="grid-overlay"></div>
            <div className="blobblob blob-1"></div>
            <div className="blobblob blob-2"></div>
            
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
            
            <Footer />
        </Router>
    );
}

export default App;
