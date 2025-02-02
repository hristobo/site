import React, { useState } from "react";
import "./style.css"; // Import the external CSS

const App = () => {
    // State variables for dynamic text
    const [mainText, setMainText] = useState("Taina e idiot!");
    const [subText, setSubText] = useState("Taina me obicha!");

    return (
        <div className="container">
            <h1>{mainText}</h1>
            <h2>{subText}</h2>

            <input 
                type="text" 
                placeholder="Enter new main text" 
                onChange={(e) => setMainText(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Enter new sub text" 
                onChange={(e) => setSubText(e.target.value)}
            />

            <button onClick={() => alert(`Main: ${mainText}\nSub: ${subText}`)}>
                Show Alert
            </button>
        </div>
    );
};

export default App;