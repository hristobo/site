import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot from react-dom/client
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import PingPong from "./PingPong";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Use createRoot
root.render(
    <Router>
        <Routes>
            <Route path="/site" element={<App />} />
            <Route path="/pingpong" element={<PingPong />} />
        </Routes>
    </Router>
);