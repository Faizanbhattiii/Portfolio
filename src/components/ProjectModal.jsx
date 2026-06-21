import React, { useEffect } from "react";

const PROJECTS_DATA = {
    p1: {
        title: "Choreographer OS",
        tags: ["C", "x86 Assembly", "QEMU", "Linker Scripts"],
        category: "Systems",
        desc: "A custom 32-bit preemptive multitasking kernel built from scratch to study kernel abstractions, memory allocation, and CPU architectures.",
        bullets: [
            "Written in assembly and C to interface directly with virtualized x86 hardware platforms (tested in QEMU and VirtualBox).",
            "Designed a custom Virtual Memory Manager implementing page translation, identity mapping, dynamic page frames, and custom heap allocator.",
            "Built dynamic scheduling models featuring a round-robin preemptive scheduler using PIT interrupt ticks.",
            "Implements virtual consoles, system calls (syscalls via software interrupt 0x80), keyboard driver, and basic shell interpreter."
        ],
        design: `+------------------------------------------------------------+
|                       Shell / Programs                     |
+------------------------------------------------------------+
|       Syscalls (0x80) | Key Events | Screen Output         |
+------------------------------------------------------------+
|                         OS Kernel                          |
|  [Scheduler]    [VMM / Heap]    [FAT Filesystem]           |
+------------------------------------------------------------+
|                       Hardware (x86)                       |
+------------------------------------------------------------+`,
        github: "https://github.com",
        demo: null
    },
    p2: {
        title: "Git-Visualizer",
        tags: ["TypeScript", "React", "D3.js", "Web Workers"],
        category: "Web Apps",
        desc: "An educational web interface built to help CS students visualize the internal Git directed acyclic graph (DAG) and master operations like interactive rebase and cherry-pick.",
        bullets: [
            "Uses D3.js force-directed layouts to render commits, references, heads, and tags with beautiful visual nodes.",
            "Compiles a micro-Git interpreter inside the browser context, simulating staging area, commit operations, checkout, and branch merging.",
            "Features interactive tutorial courses with automated verification schemas checking the user's local tree against the goal state.",
            "Utilizes Web Workers to parse local Git repositories uploaded by users without transferring files to external servers."
        ],
        design: `+-------------+      +-------------------+      +-------------+
| User input  | ---> |   Git Emulator    | ---> | D3 Node Tree|
| (Interactive|      |   (JS In-Memory)  |      | Visualizer  |
|  Term / UI) |      +-------------------+      +-------------+
+-------------+                |
                               v
                     +-------------------+
                     | Tutorial Validator|
                     +-------------------+`,
        github: "https://github.com",
        demo: "https://example.com"
    },
    p3: {
        title: "NeuralArt-Transfer",
        tags: ["Python", "PyTorch", "CUDA", "OpenCV"],
        category: "AI & ML",
        desc: "A machine learning pipeline utilizing convolutional networks to transfer artistic styles to videos while maintaining temporal smoothness between successive frames.",
        bullets: [
            "Implements Gatys' neural style transfer algorithm utilizing pretrained VGG-19 features for content and style losses.",
            "Added temporal consistency constraint using optical flow estimation (Farneback method via OpenCV) to penalize style changes on moving objects.",
            "Optimized CUDA memory allocation strategies, allowing style transfers on full 1080p video sequences at 12fps on consumer hardware.",
            "Features automated style palette synthesis using color histograms, allowing users to preserve the original video's color scheme."
        ],
        design: `+-------------+
| Input Frame | --+
+-------------+   |     +-------------------------+      +--------------+
                  +---> | Loss = Content + Style  | ---> | Neural Frame |
+-------------+   |     |      + Temporal Flow    |      +--------------+
| Style Image | --+     +-------------------------+
+-------------+`,
        github: "https://github.com",
        demo: null
    },
    p4: {
        title: "KeySync Distributed DB",
        tags: ["Go", "gRPC", "Protobuf", "Raft Consensus"],
        category: "Systems",
        desc: "A highly available, strongly consistent key-value store built in Go using the Raft consensus algorithm. Designed to withstand network partitions and system restarts.",
        bullets: [
            "Implements complete Raft consensus protocol including leader election, log replication, membership changes, and log compaction.",
            "Created customized gRPC server interfaces enabling low latency inter-node communication.",
            "Engineered robust snapshotting triggers to limit disk and memory usage, ensuring database recovery from persistent WAL logs.",
            "Tested against Jepsen network partition simulators to guarantee strict linearizability on key-value operations."
        ],
        design: `   +---------+  Heartbeat / Append  +---------+
   | Raft-A  | -------------------> | Raft-B  |
   | (Leader)| <------------------- |(Follower)|
   +---------+     Commit Status    +---------+
        |
        | State Apply
        v
   +---------+
   | LSM-Tree|
   | DB Engine|
   +---------+`,
        github: "https://github.com",
        demo: null
    },
    p5: {
        title: "DevScribe Markdown",
        tags: ["JavaScript", "Next.js", "Yjs", "WebRTC", "Supabase"],
        category: "Web Apps",
        desc: "A real-time collaborative Markdown editor that supports multi-user editing, visual conflicts resolution, and automated exports.",
        bullets: [
            "Utilizes Conflict-free Replicated Data Types (CRDTs via Yjs library) to allow concurrent client edits with zero server merge friction.",
            "Uses peer-to-peer WebRTC signalling tunnels for document syncing, with Supabase PostgreSQL as backup database storage.",
            "Implements markdown parsing featuring LaTeX syntax support (via KaTeX) and Mermaid.js diagram compilation.",
            "Provides an online presentation view that automatically converts slides from Markdown headings."
        ],
        design: `+----------+            WebRTC P2P             +----------+
| Client A | <-------------------------------> | Client B |
+----------+                                   +----------+
     \\                                              /
      \\-- Backup Sync --> +--------------+ <-------/
                          | Supabase DB  |
                          +--------------+`,
        github: "https://github.com",
        demo: "https://example.com"
    },
    p6: {
        title: "EyeAssist ML",
        tags: ["Python", "FastAPI", "YOLOv8", "WebSockets"],
        category: "AI & ML",
        desc: "An accessibility web application converting dynamic webcam feeds into custom voice and system commands using computer vision.",
        bullets: [
            "Fine-tuned custom YOLOv8 model layers on a dataset of 15 essential sign-language gestures, achieving 94.6% mAP metrics.",
            "Utilizes WebSockets to pipe webcam stream frames from the frontend React view directly to FastAPI pipeline processing threads.",
            "Implements automated text-to-speech feedback engines via browser audio context Web Speech API.",
            "Integrated system command shortcuts, enabling disabled developers to scroll, select text, and trigger code builds via gestures."
        ],
        design: `+--------------+   WebSocket Frame   +--------------+
| Browser Feed | ------------------> | FastAPI Host |
| (Webcam/Web) | <------------------ | (YOLO Model) |
+--------------+   Gesture Results   +--------------+
        |
        v Audio Event
+--------------+
| Web Speech   |
| (Voice UI)   |
+--------------+`,
        github: "https://github.com",
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
