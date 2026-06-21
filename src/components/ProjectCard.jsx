import React from "react";

function ProjectCard({ project, onOpenDetails }) {
    const { id, title, desc, tags, category, github, demo } = project;

    return (
        <article className="project-card glass-panel" data-category={category}>
            <div className="project-header">
                <div className="project-folder"><i className="fa-regular fa-folder-open"></i></div>
                <div className="project-links">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="p-link" title="GitHub Repo">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    )}
                    {demo && (
                        <a href={demo} target="_blank" rel="noopener noreferrer" className="p-link" title="Live Demo">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    )}
                    <button className="p-link open-modal-btn" onClick={() => onOpenDetails(id)} title="View Details">
                        <i className="fa-solid fa-circle-info"></i>
                    </button>
                </div>
            </div>
            <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{desc}</p>
            </div>
            <div className="project-footer">
                <ul className="project-tags">
                    {tags.map((t, idx) => (
                        <li key={idx}>{t}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default ProjectCard;
