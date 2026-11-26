import React, { useEffect } from "react";

const PROJECTS_DATA = {
    p3: {
        title: "Seeker AI",
        tags: ["TypeScript", "React", "Vite", "AI/ML"],
        category: "AI & ML",
        desc: "An intelligent AI-powered seeker application built with React and TypeScript for smart search, discovery, and information retrieval.",
        bullets: [
            "Built with React, TypeScript, and Vite for fast, type-safe frontend interactions.",
            "Designed intelligent search and discovery workflows for streamlined information retrieval.",
            "Structured modular components with ESLint and clean TypeScript interfaces."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/SEEKER_AI",
        demo: null
    },
    p6: {
        title: "AI Driving Assistant",
        tags: ["Dart", "Flutter", "Computer Vision", "AI/ML"],
        category: "AI & ML",
        desc: "An AI-powered mobile driving assistant built with Flutter and Dart to provide real-time driving guidance and intelligent navigation support.",
        bullets: [
            "Developed cross-platform mobile interface using Flutter and Dart.",
            "Designed real-time driving assistance and intelligent guidance workflows.",
            "Focused on clean, responsive UI suited for in-vehicle readability."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/AI-Driving-assistant",
        demo: null
    },
    p7: {
        title: "TaskFlow Platform",
        tags: ["React 18", "Express", "Tailwind CSS", "Cloudinary"],
        category: "Web Apps",
        desc: "A full-stack task management application engineered with React 18, Vite, Express, Tailwind CSS, and Cloudinary with emphasis on web performance, accessibility, SEO, and cross-device responsiveness.",
        bullets: [
            "Built full-stack task management workflows with React 18 on the frontend and Express on the backend.",
            "Integrated Cloudinary for media and file handling alongside Tailwind CSS for responsive styling.",
            "Focused on accessibility, SEO, and cross-device UI polish."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/TaskFlow-Full-Stack-Task-Management-Platform",
        demo: null
    },
    p8: {
        title: "World Explorer — Live Data App",
        tags: ["JavaScript", "React", "REST API", "Search & Filter"],
        category: "Web Apps",
        desc: "A responsive React single-page application showcasing complete network request lifecycle management (Loading, Success, Empty, and Error states) when consuming a live public API.",
        bullets: [
            "Consumes live public API data with robust Loading, Success, Empty, and Error UI states.",
            "Implements responsive search and filtering across fetched records.",
            "Built as a fast, interactive React single-page application."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/live-data-app",
        demo: null
    },
    p9: {
        title: "Task CRUD + Automated Test Suite",
        tags: ["JavaScript", "React", "Vitest", "Supertest"],
        category: "Web Apps",
        desc: "A full-stack Task Management application featuring an automated, multi-layer testing architecture.",
        bullets: [
            "Frontend unit and component testing implemented with Vitest and React Testing Library (RTL).",
            "Backend API and route testing implemented with Vitest and Supertest using an in-memory store.",
            "Full CRUD task lifecycle with verified automated test coverage."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/CRUD-Application-with-Automated-Test-Suite",
        demo: null
    },
    p10: {
        title: "Flowspace SaaS Landing",
        tags: ["JavaScript", "HTML/CSS", "Glassmorphism", "UI/UX"],
        category: "Web Apps",
        desc: "A modern, responsive landing page for an all-in-one task prioritization and deep focus app built for software engineering and product design teams.",
        bullets: [
            "Designed with a sleek dark aesthetic and glassmorphic UI elements.",
            "Built responsive layouts tailored for cross-device viewing.",
            "Interactive landing page sections highlighting product workflows."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/Flowspace",
        demo: null
    },
    p11: {
        title: "Analytics Dashboard with Charts",
        tags: ["JavaScript", "React", "Zustand", "Charts"],
        category: "Web Apps",
        desc: "A CRUD, authentication, and profile application refactored with Zustand for global state management, with consistent loading skeletons and empty states across all surfaces.",
        bullets: [
            "Refactored global application state using Zustand for clean, predictable updates.",
            "Implemented consistent loading skeletons and empty states across dashboard views.",
            "Includes authentication, profile management, and interactive chart visualizations."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/Analytics-Dashboard-with-Charts",
        demo: null
    },
    p12: {
        title: "Agri Twin",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "Web Apps",
        desc: "An agriculture-focused web project built with clean HTML, CSS, and interactive front-end components.",
        bullets: [
            "Structured responsive web interface for agriculture-oriented content.",
            "Built with semantic HTML and custom styling."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/agri_twin",
        demo: null
    },
    p13: {
        title: "Drag-and-Drop File Uploader",
        tags: ["React", "Axios", "Express", "Cloudinary"],
        category: "Web Apps",
        desc: "A reusable drag-and-drop file uploader component built with React, Axios, and Tailwind CSS, backed by an Express server with server-side validation and streaming uploads to Cloudinary CDN.",
        bullets: [
            "Built drag-and-drop UI with real upload progress tracking via Axios.",
            "Backed by an Express server enforcing strict server-side file validation.",
            "Streams validated uploads directly to Cloudinary CDN."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/file-upload",
        demo: null
    },
    p14: {
        title: "Multi-Field Validated Form",
        tags: ["JavaScript", "React", "Express", "Validation"],
        category: "Web Apps",
        desc: "A full-stack Edit Profile application demonstrating two independent layers of validation: client-side for immediate UX feedback, and server-side as the real security gate.",
        bullets: [
            "Implements client-side multi-field validation for instant user feedback.",
            "Enforces independent server-side validation as the authoritative security boundary.",
            "Clean full-stack Edit Profile workflow."
        ],
        design: null,
        github: "https://github.com/Faizanbhattiii/Multi-Field-Validated-Form-Client-Server-",
        demo: null
    }
};

export { PROJECTS_DATA };

function ProjectModal({ projectId, onClose }) {
    const data = PROJECTS_DATA[projectId];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (!data) return null;

    return (
        <div className={`modal-overlay active`} id="project-modal" onClick={(e) => { if (e.target.id === "project-modal") onClose(); }}>
            <div className="modal-container glass-panel">
                <button className="modal-close" id="modal-close-btn" aria-label="Close Modal" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="modal-body" id="modal-content-area">
                    <div className="modal-project-header">
                        <span className="badge" style={{ marginBottom: "0.5rem" }}>{data.category}</span>
                        <h3 className="modal-project-title">{data.title}</h3>
                        <ul className="modal-project-tags">
                            {data.tags.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    </div>

                    <div className="modal-content-section">
                        <h4>Project Summary</h4>
                        <p>{data.desc}</p>
                    </div>

                    <div className="modal-content-section">
                        <h4>Key Implementations & Contributions</h4>
                        <ul className="modal-list">
                            {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </div>

                    {data.design && (
                        <div className="modal-content-section">
                            <h4>System Architecture Flow</h4>
                            <pre className="modal-sys-design">{data.design}</pre>
                        </div>
                    )}

                    <div className="modal-project-ctas">
                        {data.github && (
                            <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                <i className="fa-brands fa-github"></i> GitHub Repository
                            </a>
                        )}
                        {data.demo && (
                            <a href={data.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
