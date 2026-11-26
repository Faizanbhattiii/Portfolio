import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

function Terminal() {
    const { toggleTheme } = useTheme();
    const [lines, setLines] = useState([
        { text: "System initialized. Welcome to Muhammad Faizan Bhatti's Interactive Terminal.", type: "text-cyan" },
        { text: "Type 'help' to see list of available commands, or try 'skills' or 'sudo rm -rf'.", type: "text-muted" },
        { text: '<span class="terminal-prompt">visitor@mfbhatti.dev:~$</span> <span class="text-white">neofetch</span>', type: "raw" }
    ]);
    const [history, setHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto scroll to bottom when lines change
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [lines]);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const cmd = inputValue.trim();
            if (cmd) {
                executeCommand(cmd);
                setHistory(prev => [...prev, cmd]);
                setHistoryIdx(-1);
                setInputValue("");
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) return;
            const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
            setHistoryIdx(newIdx);
            setInputValue(history[newIdx]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx === -1) return;
            const newIdx = historyIdx + 1;
            if (newIdx >= history.length) {
                setHistoryIdx(-1);
                setInputValue("");
            } else {
                setHistoryIdx(newIdx);
                setInputValue(history[newIdx]);
            }
        }
    };

    const executeCommand = (cmd) => {
        // Echo command line
        const echoLine = {
            text: `<span class="terminal-prompt">visitor@mfbhatti.dev:~$</span> <span class="text-white">${escapeHTML(cmd)}</span>`,
            type: "raw"
        };
        
        const args = cmd.toLowerCase().split(" ");
        const baseCmd = args[0];
        let responseLines = [];

        switch (baseCmd) {
            case "help":
                responseLines = [{
                    text: `Available commands:
  <span class="text-cyan">about</span>       - Brief background about me
  <span class="text-cyan">skills</span>      - My technical core skills
  <span class="text-cyan">projects</span>    - List featured codebases
  <span class="text-cyan">experience</span>  - Academic and industry track
  <span class="text-cyan">contact</span>     - Show contact links
  <span class="text-cyan">theme &lt;mode&gt;</span> - Set theme: 'theme light' or 'theme dark'
  <span class="text-cyan">clear</span>      - Clear terminal logs
  <span class="text-cyan">sudo ...</span>    - Run command with root privileges`,
                    type: "raw"
                }];
                break;
            case "about":
                responseLines = [{ text: "Muhammad Faizan Bhatti - CS Student @ Bahria University Islamabad. Passionate about Operating Systems, Networks, and Machine Learning.", type: "text-cyan" }];
                break;
            case "skills":
                responseLines = [{
                    text: `<span class="text-purple">Languages:</span>
  Python, C/C++, TypeScript, JavaScript
<span class="text-purple">Frameworks:</span>
  React, Next.js, PyTorch, TensorFlow
<span class="text-purple">DevOps & Databases:</span>
  Git, Linux, PostgreSQL, MySQL`,
                    type: "raw"
                }];
                break;
            case "projects":
                responseLines = [{
                    text: `<span class="text-green">GitHub Projects:</span>\n  - <span class="text-white">Seeker AI</span> [TypeScript/React]\n  - <span class="text-white">AI Driving Assistant</span> [Dart/Flutter]\n  - <span class="text-white">TaskFlow Platform</span> [React/Express]\n  - <span class="text-white">World Explorer</span> [React/REST API]\n  - <span class="text-white">Task CRUD + Test Suite</span> [Vitest/Supertest]\n  - <span class="text-white">Flowspace</span> [JavaScript/UI]`,
                    type: "raw"
                }];
                break;
            case "experience":
                responseLines = [{
                    text: `<span class="text-cyan">Certifications:</span>
<span class="text-purple">Deep Learning Specialization @ Coursera</span>
  - Learned the foundations of deep learning, neural networks, and AI project leadership.
  - Gained practical experience with Python, TensorFlow, and PyTorch.`,
                    type: "raw"
                }];
                break;
            case "contact":
                responseLines = [{
                    text: `Email: <a href='mailto:muhammad.bhatti486@gmail.com' class='text-cyan'>muhammad.bhatti486@gmail.com</a><br>GitHub: <a href='https://github.com' target='_blank' class='text-cyan'>github.com</a><br>LinkedIn: <a href='https://linkedin.com' target='_blank' class='text-cyan'>linkedin.com</a>`,
                    type: "raw"
                }];
                break;
            case "theme":
                const mode = args[1];
                if (mode === "light" || mode === "dark") {
                    document.documentElement.setAttribute("data-theme", mode);
                    localStorage.setItem("theme", mode);
                    responseLines = [{ text: `Theme shifted to ${mode.toUpperCase()}`, type: "text-green" }];
                } else {
                    responseLines = [{ text: "Usage: theme &lt;light | dark&gt;", type: "text-red" }];
                }
                break;
            case "clear":
                setLines([]);
                return;
            case "sudo":
                const subArgs = args.slice(1).join(" ");
                if (subArgs.includes("rm -rf")) {
                    setLines(prev => [...prev, echoLine, { text: "Permission denied.", type: "text-red" }]);
                    setTimeout(() => {
                        setLines(prev => [...prev, { text: "Executing override...", type: "text-red" }]);
                    }, 500);
                    setTimeout(() => {
                        setLines(prev => [...prev, { text: "<span class='text-red'>FATAL KERNEL PANIC: ACCESS CRITICAL SEGMENTATION FAULT</span><br>Just kidding! Nice try, hacker. Have a cookie instead! 🍪", type: "raw" }]);
                    }, 1200);
                    return;
                } else {
                    responseLines = [{ text: "visitor is not in the sudoers file. This incident will be reported.", type: "text-red" }];
                }
                break;
            default:
                responseLines = [{ text: `bash: command not found: ${escapeHTML(baseCmd)}. Type 'help' for options.`, type: "text-red" }];
        }

        setLines(prev => [...prev, echoLine, ...responseLines]);
    };

    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    return (
        <div className="terminal-wrapper reveal-element revealed" id="terminal-section">
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="t-btn t-close"></span>
                    <span className="t-btn t-minimize"></span>
                    <span className="t-btn t-expand"></span>
                </div>
                <div className="terminal-title">bash - visitor@mfbhatti.dev:~</div>
                <div className="terminal-actions">
                    <span className="terminal-tag"><i className="fa-solid fa-terminal"></i> Interactive Shell</span>
                </div>
            </div>
            <div className="terminal-body" id="terminal-body" ref={terminalBodyRef} onClick={focusInput}>
                <div className="terminal-output" id="terminal-output">
                    {lines.map((l, idx) => (
                        l.type === "raw" ? (
                            <div key={idx} className="terminal-line" dangerouslySetInnerHTML={{ __html: l.text }}></div>
                        ) : (
                            <div key={idx} className={`terminal-line ${l.type}`}>{l.text}</div>
                        )
                    ))}
                    
                    {lines.length > 0 && lines[lines.length-1].text.includes("neofetch") && (
                        <div className="neofetch-container">
                            <pre className="neofetch-ascii">
{`    /\\___/\\
   /       \\
  |  #   #  |
  \\  __v__  /
   \\_______/ 
   /       \\
  / |     | \\
  \\ \\_____/ /
   \\_______/`}
                            </pre>
                            <div className="neofetch-info">
                                <div><span className="text-purple">muhammad.bhatti486@gmail.com</span></div>
                                <div>--------------------</div>
                                <div><span className="text-cyan">OS:</span> Bahria ArchLinux v2026.06</div>
                                <div><span class="text-cyan">Host:</span> Brain (AI-Powered) v1.0.0</div>
                                <div><span class="text-cyan">Kernel:</span> C++20 / Python3.11 / WebTech</div>
                                <div><span class="text-cyan">Uptime:</span> 3 years of hard learning</div>
                                <div><span class="text-cyan">Shell:</span> Custom JS Command Shell</div>
                                <div><span class="text-cyan">Terminal Theme:</span> Neon Glass</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="terminal-input-line">
                    <span className="terminal-prompt">visitor@mfbhatti.dev:~$</span>
                    <input 
                        type="text" 
                        className="terminal-input" 
                        id="terminal-input" 
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off" 
                        spellCheck="false" 
                        aria-label="Terminal Input"
                    />
                </div>
            </div>
        </div>
    );
}

export default Terminal;
