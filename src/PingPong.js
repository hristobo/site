import React, { useEffect, useRef, useState } from "react";
import "./pingpong.css"; // Scoped CSS

const PingPong = () => {
    const canvasRef = useRef(null);
    const ballRef = useRef({ x: 300, y: 200, dx: 2, dy: 2 }); // Ball state
    const paddleRef = useRef({ x: 275, width: 80 }); // Paddle state
    const [score, setScore] = useState(0); // Score state
    const paddleSpeed = 8;
    let animationFrameId = useRef(null); // Store animation frame ID
    const keys = { left: false, right: false }; // Track pressed keys

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Function to draw paddle
        const drawPaddle = () => {
            ctx.fillStyle = "white";
            ctx.fillRect(paddleRef.current.x, canvas.height - 20, paddleRef.current.width, 10);
        };

        // Function to draw ball
        const drawBall = () => {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(ballRef.current.x, ballRef.current.y, 8, 0, Math.PI * 2);
            ctx.fill();
        };

        // Main game loop
        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Move Paddle
            if (keys.left && paddleRef.current.x > 0) {
                paddleRef.current.x -= paddleSpeed;
            }
            if (keys.right && paddleRef.current.x + paddleRef.current.width < canvas.width) {
                paddleRef.current.x += paddleSpeed;
            }

            // Move Ball
            ballRef.current.x += ballRef.current.dx;
            ballRef.current.y += ballRef.current.dy;

            // Bounce off left/right walls
            if (ballRef.current.x <= 0 || ballRef.current.x >= canvas.width) {
                ballRef.current.dx *= -1;
                setScore((prev) => prev + 1); // Increase score
            }

            // Bounce off the top wall
            if (ballRef.current.y <= 0) {
                ballRef.current.dy *= -1;
                setScore((prev) => prev + 1); // Increase score
            }

            // Paddle collision
            if (
                ballRef.current.y >= canvas.height - 30 &&
                ballRef.current.x >= paddleRef.current.x &&
                ballRef.current.x <= paddleRef.current.x + paddleRef.current.width
            ) {
                ballRef.current.dy *= -1;
            }

            // Game over if ball hits bottom
            if (ballRef.current.y > canvas.height) {
                alert(`Game Over! Your Score: ${score}`);
                ballRef.current.x = 300;
                ballRef.current.y = 200;
                ballRef.current.dx = 2;
                ballRef.current.dy = -2;
                setScore(0); // Reset score
            }

            // Increase ball speed every 5 points (max limit to prevent insane speed)
            if (score > 0 && score % 5 === 0) {
                ballRef.current.dx = Math.sign(ballRef.current.dx) * (2 + score * 0.1); // Increase dx speed
                ballRef.current.dy = Math.sign(ballRef.current.dy) * (2 + score * 0.1); // Increase dy speed
            }

            drawPaddle();
            drawBall();

            animationFrameId.current = requestAnimationFrame(update); // Loop the game
        };

        // Start the game loop
        animationFrameId.current = requestAnimationFrame(update);

        // Track key presses for smooth movement
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") keys.left = true;
            if (e.key === "ArrowRight") keys.right = true;
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowLeft") keys.left = false;
            if (e.key === "ArrowRight") keys.right = false;
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId.current); // Stop animation on unmount
        };
    }, [score]);

    return (
        <div className="pingpong-container">
            <h2>🏓 Ping Pong Game - Use Arrow Keys to Move</h2>
            <h3>Score: {score}</h3> {/* Display score */}
            <canvas ref={canvasRef} width="600" height="400" className="pingpong-canvas"></canvas>
            <a href="/site" className="back-button">⬅ Go Back</a>
        </div>
    );
};

export default PingPong;