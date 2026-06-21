import React, { useState } from "react";
import SkillsOrb from "../components/SkillsOrb.jsx";
import avatarImg from "../assets/avatar.png";

const HOBBIES = [
    { icon: "fa-gamepad", label: "Gaming", desc: "Competitive strategy games. Currently grinding Valorant ranked & chess puzzles." },
    { icon: "fa-chess", label: "Chess", desc: "1850 Elo on Lichess. Enjoy studying classical games and sharp tactical positions." },
    { icon: "fa-guitar", label: "Guitar", desc: "Self-taught fingerstyle guitarist. Currently working through fingerpicking arrangements." },
    { icon: "fa-mountain", label: "Hiking", desc: "Weekend hiker on SF Bay Area trails. Muir Woods is a personal favourite." },
    { icon: "fa-book", label: "Reading", desc: "Technical books, system design papers, and CS history. Currently reading The Art of Doing Science and Engineering." },
    { icon: "fa-robot", label: "Open Source", desc: "Actively contributing to open-source projects. Maintains a small CLI tool for git commit formatting." },
];

const COURSES = [
    { code: "CS 110", name: "Principles of Computer Systems", grade: "A+" },
    { code: "CS 161", name: "Design and Analysis of Algorithms", grade: "A" },
    { code: "CS 229", name: "Machine Learning", grade: "A" },
    { code: "CS 145", name: "Data Management and Databases", grade: "A+" },
    { code: "CS 244", name: "Advanced Computer Networks", grade: "A" },
    { code: "CS 143", name: "Compilers", grade: "A-" },
    { code: "CS 149", name: "Parallel Computing", grade: "A" },
    { code: "CS 255", name: "Introduction to Cryptography", grade: "A-" },
    { code: "MATH 104", name: "Applied Matrix Theory", grade: "A" },
    { code: "STATS 116", name: "Theory of Probability", grade: "A+" },
];

const VALUES = [
    { icon: "fa-bolt", label: "Performance First", desc: "I write code that is fast, lean, and doesn't waste cycles.", color: "var(--cyan)" },
    { icon: "fa-shield-halved", label: "Security Minded", desc: "Security isn't an afterthought. It's baked into every system I design.", color: "var(--purple)" },
    { icon: "fa-people-group", label: "Collaboration", desc: "The best products come from teams that communicate clearly and respectfully.", color: "var(--green)" },
    { icon: "fa-seedling", label: "Continuous Learning", desc: "Technology evolves fast. I read papers, audit courses, and prototype constantly.", color: "var(--accent-color)" },
];

function AboutUs() {
    const [activeHobby, setActiveHobby] = useState(null);

    return (
        <main className="main-content">
            <div style={{ paddingTop: "120px", paddingBottom: "80px" }}>
                {/* Header */}
                <div style={{ marginBottom: "0.5rem" }}>
                    <span className="section-num" style={{ fontSize: "1rem" }}>
                        <i className="fa-solid fa-user" style={{ marginRight: "8px" }}></i>
                        About Me
                    </span>
                </div>
                <h1 className="page-title" style={{ marginTop: "0.5rem" }}>
                    The Person Behind <span className="accent-text">the Code</span>
                </h1>
                <p className="page-subtitle">
                    A deep dive into who I am, what I study, what I've built, and what gets me excited every day.
                </p>

                {/* Bio Section */}
                <div className="about-grid" style={{ marginBottom: "80px" }}>
                    <div className="about-text">
                        <p>
                            Hello! My name is <span className="highlight-text">Alex Chen</span> and I enjoy building things that live on the internet—and deep inside operating systems. My journey in computer science started back in 2020 when I tried modifying a Python web scraper to download online manga. I ended up accidentally DoS-ing a website, learning about TCP rate limiting, and never looked back.
                        </p>
                        <p>
                            Fast-forward to today, and I've had the privilege of working as a Software Engineering Intern at <span className="highlight-text">TechCorp</span>, serving as a Head Teaching Assistant for Operating Systems, and contributing to several popular open-source CLI tools and libraries.
                        </p>
                        <p>
                            I believe great software is more than functional code. It should be <span className="highlight-text">correct</span>, <span className="highlight-text">observable</span>, and <span className="highlight-text">maintainable</span> by the next developer who reads it—even if that developer is future me at 2am.
                        </p>

                        <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent-color)" }}>3.94</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>GPA / 4.00</div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--cyan)" }}>6+</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Projects Built</div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--purple)" }}>3+</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Years of Study</div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--green)" }}>1</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Industry Internship</div>
                            </div>
                        </div>
                    </div>

                    <div className="education-card glass-panel">
                        <div className="card-glow"></div>

                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <div className="avatar-wrapper" style={{ width: "160px", height: "160px", margin: "0 auto 1rem" }}>
                                <div className="avatar-glow"></div>
                                <img src={avatarImg} alt="Alex Chen" className="avatar-img" />
                            </div>
                            <h3 style={{ fontWeight: "700", fontSize: "1.2rem" }}>Alex Chen</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "'JetBrains Mono', monospace" }}>
                                CS @ Stanford University '27
                            </p>
                        </div>

                        <h3 className="card-title"><i className="fa-solid fa-graduation-cap"></i> Education</h3>
                        <div className="edu-item">
                            <div className="edu-header">
                                <span className="edu-school">Stanford University</span>
                                <span className="edu-date">2023 – 2027</span>
                            </div>
                            <div className="edu-degree">B.S. in Computer Science (Systems Track)</div>
                            <div className="edu-gpa"><span className="badge">GPA: 3.94 / 4.00</span></div>
                        </div>
                        <div className="edu-item">
                            <div className="edu-header">
                                <span className="edu-school">Coursera & Self-Study</span>
                                <span className="edu-date">Ongoing</span>
                            </div>
                            <div className="edu-degree">Deep Learning Specialization (DeepLearning.AI)</div>
                            <div className="edu-gpa"><span className="badge">Verified Certificate</span></div>
                        </div>
                    </div>
                </div>

                {/* 3D Skills Orb */}
                <div style={{ marginBottom: "80px" }}>
                    <h2 className="section-title">
                        <span className="section-num">01.</span> Technical Skills Universe
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        Drag and rotate the orb to explore the technologies I work with.
                    </p>
                    <SkillsOrb />
                </div>

                {/* Values Section */}
                <div style={{ marginBottom: "80px" }}>
                    <h2 className="section-title">
                        <span className="section-num">02.</span> Engineering Values
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                        {VALUES.map((v, i) => (
                            <div key={i} className="glass-panel" style={{ padding: "2rem" }}>
                                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${v.color}22`, border: `1px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                                    <i className={`fa-solid ${v.icon}`} style={{ fontSize: "1.2rem", color: v.color }}></i>
                                </div>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "0.5rem" }}>{v.label}</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coursework Section */}
                <div style={{ marginBottom: "80px" }}>
                    <h2 className="section-title">
                        <span className="section-num">03.</span> Academic Coursework
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        A selection of the coursework that shaped my technical foundation. Focus on Systems, Theory, and Applied ML.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
                        {COURSES.map((c, i) => (
                            <div key={i} className="glass-panel" style={{ padding: "1.25rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--cyan)", marginBottom: "4px" }}>{c.code}</div>
                                    <div style={{ fontSize: "0.95rem", fontWeight: "600" }}>{c.name}</div>
                                </div>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "0.85rem",
                                    fontWeight: "700",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "6px",
                                    background: c.grade === "A+" ? "rgba(16,185,129,0.15)" : c.grade === "A-" ? "rgba(99,102,241,0.15)" : "rgba(6,182,212,0.15)",
                                    color: c.grade === "A+" ? "var(--green)" : c.grade === "A-" ? "var(--accent-color)" : "var(--cyan)",
                                }}>{c.grade}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hobbies Section */}
                <div style={{ marginBottom: "80px" }}>
                    <h2 className="section-title">
                        <span className="section-num">04.</span> Beyond the Terminal
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        Click any card to learn more about what I enjoy when I'm not pushing commits.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                        {HOBBIES.map((h, i) => (
                            <div
                                key={i}
                                className="glass-panel"
                                style={{
                                    padding: "1.75rem",
                                    cursor: "pointer",
                                    borderColor: activeHobby === i ? "var(--accent-color)" : undefined,
                                    transform: activeHobby === i ? "translateY(-4px)" : undefined,
                                    transition: "all 0.3s ease",
                                }}
                                onClick={() => setActiveHobby(activeHobby === i ? null : i)}
                            >
                                <div style={{ fontSize: "2rem", color: activeHobby === i ? "var(--accent-color)" : "var(--cyan)", marginBottom: "0.75rem" }}>
                                    <i className={`fa-solid ${h.icon}`}></i>
                                </div>
                                <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: activeHobby === i ? "0.75rem" : "0" }}>{h.label}</h4>
                                {activeHobby === i && (
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "0.5rem" }}>{h.desc}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="glass-panel" style={{ padding: "3rem", textAlign: "center" }}>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: "800", marginBottom: "1rem" }}>
                        Want to work together?
                    </h3>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
                        I'm always open to interesting conversations about systems, ML, or open-source projects. Don't hesitate to reach out!
                    </p>
                    <a href="mailto:alex@example.com" className="btn btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}>
                        <i className="fa-solid fa-envelope"></i> Get in Touch
                    </a>
                </div>
            </div>
        </main>
    );
}

export default AboutUs;
