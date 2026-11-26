import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroScene from "../components/HeroScene.jsx";
import Terminal from "../components/Terminal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import avatarImg from "../assets/avatar.png";

const TYPING_WORDS = ["Software Engineer", "Systems Developer", "Machine Learning Student", "Open Source Contributor"];

const FEATURED_PROJECTS = [
    {
        id: "p3", title: "Seeker AI", category: "ai",
        desc: "An intelligent AI-powered seeker application built with React and TypeScript for smart search, discovery, and information retrieval.",
        tags: ["TypeScript", "React", "Vite", "AI/ML"],
        github: "https://github.com/Faizanbhattiii/SEEKER_AI", demo: null
    },
    {
        id: "p6", title: "AI Driving Assistant", category: "ai",
        desc: "An AI-powered mobile driving assistant built with Flutter and Dart to provide real-time driving guidance and intelligent navigation support.",
        tags: ["Dart", "Flutter", "Computer Vision", "AI/ML"],
        github: "https://github.com/Faizanbhattiii/AI-Driving-assistant", demo: null
    },
    {
        id: "p7", title: "TaskFlow Platform", category: "web",
        desc: "A full-stack task management application engineered with React 18, Vite, Express, Tailwind CSS, and Cloudinary with focus on performance and accessibility.",
        tags: ["React 18", "Express", "Tailwind CSS", "Cloudinary"],
        github: "https://github.com/Faizanbhattiii/TaskFlow-Full-Stack-Task-Management-Platform", demo: null
    },
    {
        id: "p8", title: "World Explorer", category: "web",
        desc: "A responsive React single-page application showcasing full network request lifecycle management, search, and filtering with a live public API.",
        tags: ["JavaScript", "React", "REST API", "Search & Filter"],
        github: "https://github.com/Faizanbhattiii/live-data-app", demo: null
    },
];

function Typewriter() {
    const [displayText, setDisplayText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = TYPING_WORDS[wordIndex];
        let timeout;

        if (!isDeleting && charIndex < currentWord.length) {
            timeout = setTimeout(() => setCharIndex(c => c + 1), 100);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex(c => c - 1), 50);
        } else if (!isDeleting && charIndex === currentWord.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setWordIndex(w => (w + 1) % TYPING_WORDS.length);
            timeout = setTimeout(() => {}, 400);
        }

        setDisplayText(currentWord.substring(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    return (
        <h2 className="hero-subtitle">
            I'm a <span className="typed-text">{displayText}</span>
            <span className="cursor">&nbsp;</span>
        </h2>
    );
}

function SkillBar({ label, percent, colorClass }) {
    const ref = useRef(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="skill-item" ref={ref}>
            <div className="skill-name"><span>{label}</span><span>{percent}%</span></div>
            <div className="skill-bar">
                <div className="skill-progress" style={{ width: animated ? `${percent}%` : "0%" }}></div>
            </div>
        </div>
    );
}

function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.email && form.subject && form.message) {
            setSubmitted(true);
        }
    };

    return (
        <div className="contact-form-wrapper glass-panel">
            <div className="card-glow"></div>
            {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" id="form-name" required placeholder=" " className="form-input"
                                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            <label htmlFor="form-name" className="form-label">Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="form-email" required placeholder=" " className="form-input"
                                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                            <label htmlFor="form-email" className="form-label">Email</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" id="form-subject" required placeholder=" " className="form-input"
                            value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                        <label htmlFor="form-subject" className="form-label">Subject</label>
                    </div>
                    <div className="form-group">
                        <textarea id="form-message" required rows="5" placeholder=" " className="form-input form-textarea"
                            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}></textarea>
                        <label htmlFor="form-message" className="form-label">Message</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit" id="form-submit-btn">
                        <span>Send Message</span>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                    <h4 className="success-title">Message Sent!</h4>
                    <p className="success-desc">Thank you for reaching out. Muhammad Faizan Bhatti will get back to you shortly.</p>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                        Send another message
                    </button>
                </div>
            )}
        </div>
    );
}

function Home() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <main className="main-content">
            {/* Hero Section */}
            <section className="hero-section" id="hero" style={{ position: "relative" }}>
                <HeroScene />
                <div className="hero-container">
                    <div className="hero-info">
                        <div className="welcome-tag">
                            <span className="terminal-prompt">~</span> Welcome to my space
                        </div>
                        <h1 className="hero-title">
                            Hey, I'm <span className="accent-text">Muhammad Faizan Bhatti</span>
                        </h1>
                        <Typewriter />
                        <p className="hero-bio">
                            CS Student @ Bahria University Islamabad. I build scalable software systems, design ML pipelines, and write neat, efficient code. Passionate about open source and systems engineering.
                        </p>
                        <div className="hero-ctas">
                            <Link to="/projects" className="btn btn-primary" id="hero-btn-projects">
                                <i className="fa-solid fa-eye"></i> View Projects
                            </Link>
                            <a href="#contact" className="btn btn-secondary" id="hero-btn-contact">
                                <i className="fa-solid fa-paper-plane"></i> Let's Talk
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link-item" id="social-github" title="GitHub">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link-item" id="social-linkedin" title="LinkedIn">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link-item" id="social-twitter" title="Twitter">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a href="mailto:muhammad.bhatti486@gmail.com" className="social-link-item" id="social-email" title="Email Me">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="avatar-wrapper">
                            <div className="avatar-glow"></div>
                            <img src={avatarImg} alt="Muhammad Faizan Bhatti's Avatar" className="avatar-img" id="avatar" />
                        </div>
                    </div>
                </div>

                {/* Terminal */}
                <Terminal />
            </section>

            {/* Featured Projects Section */}
            <section id="projects" style={{ paddingTop: "80px" }}>
                <h2 className="section-title">
                    <span className="section-num">01.</span> Featured Projects
                </h2>
                <div className="projects-grid">
                    {FEATURED_PROJECTS.map(proj => (
                        <ProjectCard key={proj.id} project={proj} onOpenDetails={setSelectedProject} />
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Link to="/projects" className="btn btn-secondary">
                        <i className="fa-solid fa-grid-2"></i> View All Projects
                    </Link>
                </div>
            </section>

            {/* Certifications Timeline Section */}
            <section className="experience-section" id="experience" style={{ paddingTop: "80px" }}>
                <h2 className="section-title"><span className="section-num">02.</span> Certifications</h2>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">Ongoing</div>
                        <div className="timeline-content glass-panel">
                            <h3 className="timeline-title">Deep Learning Specialization <span className="text-purple">@ Coursera</span></h3>
                            <p className="timeline-subtitle">DeepLearning.AI</p>
                            <ul className="timeline-bullets">
                                <li>Learned the foundations of deep learning, how to build neural networks, and how to lead successful machine learning projects.</li>
                                <li>Gained practical experience with Python, TensorFlow, and PyTorch for various AI applications.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" style={{ paddingTop: "80px" }}>
                <h2 className="section-title"><span className="section-num">03.</span> Technical Skills</h2>
                <div className="skills-grid">
                    <div className="skills-category glass-panel">
                        <div className="skills-category-header">
                            <i className="fa-solid fa-code-branch category-icon text-cyan"></i>
                            <h3>Languages</h3>
                        </div>
                        <div className="skills-list">
                            <SkillBar label="Python" percent={95} />
                            <SkillBar label="C++ / C" percent={88} />
                            <SkillBar label="TypeScript / JavaScript" percent={90} />
                        </div>
                    </div>
                    <div className="skills-category glass-panel">
                        <div className="skills-category-header">
                            <i className="fa-solid fa-cubes category-icon text-purple"></i>
                            <h3>Frameworks</h3>
                        </div>
                        <div className="skills-list">
                            <SkillBar label="React / Next.js" percent={90} />
                            <SkillBar label="PyTorch / TensorFlow" percent={80} />
                        </div>
                    </div>
                    <div className="skills-category glass-panel">
                        <div className="skills-category-header">
                            <i className="fa-solid fa-toolbox category-icon text-cyan"></i>
                            <h3>Developer Tools</h3>
                        </div>
                        <div className="skills-list">
                            <SkillBar label="Git & GitHub" percent={95} />
                            <SkillBar label="Linux & Shell Scripting" percent={85} />
                        </div>
                    </div>
                    <div className="skills-category glass-panel">
                        <div className="skills-category-header">
                            <i className="fa-solid fa-database category-icon text-green"></i>
                            <h3>Databases</h3>
                        </div>
                        <div className="skills-list">
                            <SkillBar label="PostgreSQL / MySQL" percent={85} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ paddingTop: "80px" }}>
                <h2 className="section-title"><span className="section-num">04.</span> Get In Touch</h2>
                <div className="contact-container">
                    <div className="contact-info">
                        <h3 className="contact-subtitle">What's Next?</h3>
                        <p className="contact-lead">I am currently looking for new Summer 2027 internship opportunities or open-source collaborations!</p>
                        <p className="contact-desc">Whether you have a question, want to talk about distributed systems, or just want to say hi, my inbox is always open.</p>
                        <div className="contact-details">

                            <div className="detail-item">
                                <i className="fa-solid fa-envelope detail-icon text-purple"></i>
                                <div>
                                    <h4 className="detail-label">Email</h4>
                                    <a href="mailto:muhammad.bhatti486@gmail.com" className="detail-value text-link">muhammad.bhatti486@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </section>

            {selectedProject && (
                <ProjectModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </main>
    );
}

export default Home;
