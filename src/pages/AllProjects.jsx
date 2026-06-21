import React, { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

const ALL_PROJECTS = [
    {
        id: "p1", title: "Choreographer OS", category: "systems",
        desc: "A lightweight, preemptive multitasking Operating System kernel built from scratch for x86 architecture. Implements paging, IPC, and custom FAT-like filesystem.",
        tags: ["C", "x86 Assembly", "Make", "QEMU"],
        github: "https://github.com", demo: null
    },
    {
        id: "p2", title: "Git-Visualizer", category: "web",
        desc: "An interactive, web-based tool that visualizes git commit trees, branches, and merges in real-time. Features interactive rebasing drills for students.",
        tags: ["TypeScript", "React", "D3.js", "Node.js"],
        github: "https://github.com", demo: "https://example.com"
    },
    {
        id: "p3", title: "NeuralArt-Transfer", category: "ai",
        desc: "A deep neural style transfer pipeline implemented in PyTorch that allows users to stylize videos while maintaining temporal consistency across frames.",
        tags: ["Python", "PyTorch", "OpenCV", "Docker"],
        github: "https://github.com", demo: null
    },
    {
        id: "p4", title: "KeySync Distributed DB", category: "systems",
        desc: "A strongly consistent, distributed key-value store using Raft consensus protocol. Supports dynamic cluster reconfigurations, snapshots, and heartbeats.",
        tags: ["Go", "gRPC", "Protobuf", "Raft"],
        github: "https://github.com", demo: null
    },
    {
        id: "p5", title: "DevScribe Markdown", category: "web",
        desc: "Collaborative Markdown editor with live preview, auto-save, PDF exports, and version history. Uses CRDTs for seamless conflict-free collaborative editing.",
        tags: ["JavaScript", "Next.js", "Yjs", "Supabase"],
        github: "https://github.com", demo: "https://example.com"
    },
    {
        id: "p6", title: "EyeAssist ML", category: "ai",
        desc: "A computer vision accessibility tool designed to translate real-time hand gestures into text and audio commands to help blind users navigate interfaces.",
        tags: ["Python", "FastAPI", "YOLOv8", "WebSockets"],
        github: "https://github.com", demo: null
    },
];

const FILTERS = [
    { key: "all", label: "All Projects", icon: "fa-grid-2" },
    { key: "systems", label: "Systems", icon: "fa-microchip" },
    { key: "web", label: "Web Apps", icon: "fa-globe" },
    { key: "ai", label: "AI & ML", icon: "fa-brain" },
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
                        {["C", "x86 Assembly", "Go", "Python", "TypeScript", "React", "D3.js", "PyTorch", "CUDA", "gRPC", "Protobuf", "Yjs", "WebRTC", "FastAPI", "YOLOv8", "Docker", "QEMU", "Raft", "Next.js", "Supabase", "PostgreSQL", "WebSockets", "OpenCV", "Node.js"].map(tech => (
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
