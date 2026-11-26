import React, { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

const ALL_PROJECTS = [
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
    {
        id: "p9", title: "Task CRUD + Automated Test Suite", category: "web",
        desc: "A full-stack task management application featuring an automated multi-layer testing architecture with Vitest, React Testing Library, and Supertest.",
        tags: ["JavaScript", "React", "Vitest", "Supertest"],
        github: "https://github.com/Faizanbhattiii/CRUD-Application-with-Automated-Test-Suite", demo: null
    },
    {
        id: "p10", title: "Flowspace SaaS Landing", category: "web",
        desc: "A modern, responsive landing page for an all-in-one task prioritization and deep focus app featuring a dark aesthetic and glassmorphic UI elements.",
        tags: ["JavaScript", "HTML/CSS", "Glassmorphism", "UI/UX"],
        github: "https://github.com/Faizanbhattiii/Flowspace", demo: null
    },
    {
        id: "p11", title: "Analytics Dashboard", category: "web",
        desc: "A CRUD, auth, and profile application refactored with Zustand for global state management, featuring consistent loading skeletons, empty states, and charts.",
        tags: ["JavaScript", "React", "Zustand", "Charts"],
        github: "https://github.com/Faizanbhattiii/Analytics-Dashboard-with-Charts", demo: null
    },
    {
        id: "p12", title: "Agri Twin", category: "web",
        desc: "An agriculture-focused web project built with clean HTML, CSS, and interactive front-end components.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Faizanbhattiii/agri_twin", demo: null
    },
    {
        id: "p13", title: "Drag-and-Drop File Uploader", category: "web",
        desc: "A reusable drag-and-drop file uploader component built with React, Axios, and Tailwind CSS, backed by an Express server and Cloudinary CDN.",
        tags: ["React", "Axios", "Express", "Cloudinary"],
        github: "https://github.com/Faizanbhattiii/file-upload", demo: null
    },
    {
        id: "p14", title: "Multi-Field Validated Form", category: "web",
        desc: "A full-stack Edit Profile application demonstrating two independent layers of validation: client-side UX feedback and server-side security validation.",
        tags: ["JavaScript", "React", "Express", "Validation"],
        github: "https://github.com/Faizanbhattiii/Multi-Field-Validated-Form-Client-Server-", demo: null
    },
];

const FILTERS = [
    { key: "all", label: "All Projects", icon: "fa-grid-2" },
    { key: "ai", label: "AI & ML", icon: "fa-brain" },
    { key: "web", label: "Web Apps", icon: "fa-globe" },
];

function AllProjects() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);

    const filtered = useMemo(() => {
        return ALL_PROJECTS.filter(proj => {
            const matchesFilter = activeFilter === "all" || proj.category === activeFilter;
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                !q ||
                proj.title.toLowerCase().includes(q) ||
                proj.desc.toLowerCase().includes(q) ||
                proj.tags.some(t => t.toLowerCase().includes(q));
            return matchesFilter && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    return (
        <main className="main-content">
            <div style={{ paddingTop: "120px", paddingBottom: "80px" }}>
                {/* Header */}
                <div style={{ marginBottom: "0.5rem" }}>
                    <span className="section-num" style={{ fontSize: "1rem" }}>
                        <i className="fa-solid fa-laptop-code" style={{ marginRight: "8px" }}></i>
                        All Projects
                    </span>
                </div>
                <h1 className="page-title" style={{ marginTop: "0.5rem" }}>
                    What I've <span className="accent-text">Built</span>
                </h1>
                <p className="page-subtitle">
                    A complete showcase of my personal projects, coursework implementations, and open-source contributions.
                    Each one reflects a passion for building things that work at scale and with elegance.
                </p>

                {/* Search & Filters */}
                <div className="search-filter-container">
                    <div className="search-input-wrapper">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            id="project-search"
                            placeholder="Search by name, tech, or description..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="project-filters" style={{ marginBottom: "0" }}>
                        {FILTERS.map(f => (
                            <button
                                key={f.key}
                                className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}
                                data-filter={f.key}
                                id={`filter-${f.key}`}
                                onClick={() => setActiveFilter(f.key)}
                            >
                                <i className={`fa-solid ${f.icon}`} style={{ marginRight: "6px" }}></i>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <div style={{ marginBottom: "2rem", color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "'JetBrains Mono', monospace" }}>
                    <i className="fa-solid fa-terminal" style={{ marginRight: "6px", color: "var(--cyan)" }}></i>
                    Showing <span style={{ color: "var(--cyan)" }}>{filtered.length}</span> of {ALL_PROJECTS.length} projects
                    {activeFilter !== "all" && <span> in <span style={{ color: "var(--accent-color)" }}>{activeFilter}</span></span>}
                    {searchQuery && <span> matching "<span style={{ color: "var(--accent-color)" }}>{searchQuery}</span>"</span>}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid" id="projects-container">
                    {filtered.length > 0 ? (
                        filtered.map(proj => (
                            <ProjectCard
                                key={proj.id}
                                project={proj}
                                onOpenDetails={setSelectedProject}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <i className="fa-solid fa-circle-xmark"></i>
                            <p style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>No projects found</p>
                            <p style={{ fontSize: "0.9rem" }}>Try adjusting your search query or filter selection.</p>
                        </div>
                    )}
                </div>

                {/* Technologies used section */}
                <div style={{ marginTop: "60px", padding: "2.5rem", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "16px", backdropFilter: "blur(12px)" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                        <i className="fa-solid fa-code" style={{ color: "var(--cyan)", marginRight: "10px" }}></i>
                        Technologies Across All Projects
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {["TypeScript", "JavaScript", "Dart", "React", "Flutter", "Express", "Tailwind CSS", "Zustand", "Vitest", "Cloudinary", "Vite"].map(tech => (
                            <span key={tech} style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.78rem",
                                padding: "0.3rem 0.8rem",
                                borderRadius: "6px",
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-color)",
                                color: "var(--text-secondary)",
                                cursor: "default",
                                transition: "all 0.3s ease",
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = "var(--accent-color)";
                                    e.currentTarget.style.borderColor = "var(--accent-color)";
                                    e.currentTarget.style.background = "var(--accent-glow)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                    e.currentTarget.style.borderColor = "var(--border-color)";
                                    e.currentTarget.style.background = "var(--bg-tertiary)";
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </main>
    );
}

export default AllProjects;
