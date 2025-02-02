import React, { useState, useEffect, useRef } from "react";
import animeAscii from "./asciiArt"; // Import the ASCII art
import "./style.css"; // Ensure your CSS is linked
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const App = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([animeAscii, "zdr bqgai ot tuka be"]);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate(); // Hook to handle navigation

    const handleCommand = (e) => {
        if (e.key === "Enter") {
            if (command.trim().toLowerCase() === "clear") {
                setOutput([]); // Clears terminal output
            } else if (command.trim().toLowerCase() === "pingpong") {
                navigate("/pingpong"); // Redirect to the ping pong game page
            } else {
                setOutput((prevOutput) => [...prevOutput, `$ ${command}`, ...processCommand(command)]);
                setHistory((prevHistory) => [...prevHistory, command]); // Save command to history
                setHistoryIndex(-1);
            }
            setCommand("");
        } else if (e.key === "ArrowUp") {
            if (history.length > 0 && historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCommand(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCommand(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCommand("");
            }
        } else if (e.key === "Backspace") {
            setCommand((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1) {
            setCommand((prev) => prev + e.key);
        }
    };

    const processCommand = (cmd) => {
        switch (cmd.toLowerCase()) {
            case "hello":
                return ["👋 zdrkp!"];
            case "about":
                return ["Hristo gengsta"];
            case "ascii":
                return [animeAscii];
            case "boji":
                return [
                    "💖 Boji zdrr! 💖",
                    "💗 Boji mnogo si sladkaa! 💗",
                    "💗 I love you so much! 💗",
                ];
            case "clear":
                setOutput([]);
                return [];
            default:
                return ["❌ Command not found!"];
        }
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div className="container" onClick={() => inputRef.current.focus()}>
            <div className="terminal">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                <div ref={terminalEndRef} />
            </div>

            <input
                ref={inputRef}
                type="text"
                onKeyDown={handleCommand}
                autoFocus
                className="hidden-input"
            />

            <div className="input-container">
                <span className="input-prefix">$</span>
                <span className="input-text">{command}</span>
                <span className="blinking-cursor">█</span>
            </div>
        </div>
    );
};

export default App;