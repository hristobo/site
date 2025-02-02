import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Ensure your CSS is linked

const App = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);
    const terminalEndRef = useRef(null);

    const handleCommand = (e) => {
        if (e.key === "Enter") {
            if (command.trim().toLowerCase() === "clear") {
                setOutput([]); // Clear the output properly
            } else {
                setOutput((prevOutput) => [...prevOutput, `$ ${command}`, processCommand(command)]);
            }
            setCommand("");
        }
    };

    const processCommand = (cmd) => {
        switch (cmd.toLowerCase()) {
            case "hello":
                return "👋 Hello, hacker!";
            case "about":
                return "I am a React Developer!";
            case "clear":
                return ""; // This won't be reached since we handle "clear" separately
            default:
                return "❌ Command not found!";
        }
    };

    // Auto-scroll to the bottom when output updates
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div className="container">
            <div className="terminal">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                <div ref={terminalEndRef} /> {/* Keeps scroll at bottom */}
            </div>

            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="terminal-input"
                autoFocus
            />
        </div>
    );
};

export default App;