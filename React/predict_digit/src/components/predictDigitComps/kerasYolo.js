import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Results from "./result/resultDigit";

const KerasYolo = (props) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [prediction, setPrediction] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = props.api;
    const token = props.token;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.canvas-container',
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
            );
            gsap.fromTo('.canvas-title',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
            );
            gsap.fromTo('.canvas-btn',
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "back.out(1.7)" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const startDrawing = (e) => {
        setDrawing(true);
        const ctx = canvasRef.current.getContext("2d");
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
    };

    const draw = (e) => {
        if (!drawing) return;
        const ctx = canvasRef.current.getContext("2d");
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        setDrawing(true);
    };

    const handleTouchMove = (e) => {
        if (!drawing) return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setPrediction("");
        
        // Animate the clear
        gsap.fromTo(canvasRef.current,
            { scale: 0.98 },
            { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
        );
    };

    const recognize = async () => {
        setIsLoading(true);
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        const digitCanvas = canvasRef.current;
        const times = 9;
        tempCanvas.width = digitCanvas.width / (times - 3);
        tempCanvas.height = digitCanvas.height / times;

        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvasRef.current, 0, 0, digitCanvas.width / (times - 3), digitCanvas.height / times);

        const imageData = tempCanvas.toDataURL("image/png");

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ image: imageData })
            });

            const result = await res.json();
            setPrediction(result.digits || "Could not recognize");
        } catch (error) {
            console.error("Error uploading image:", error);
            setPrediction("Error occurred during recognition");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="mb-12">
            <div className="canvas-container p-8 md:p-12 rounded-3xl bg-card border border-border shadow-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-4">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span className="text-sm font-medium text-muted-foreground">Drawing Mode</span>
                    </div>
                    <h2 className="canvas-title text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Draw a Digit
                    </h2>
                    <p className="text-muted-foreground">
                        Use your mouse or finger to draw a digit in the area below
                    </p>
                </div>

                {/* Canvas */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl opacity-50"></div>
                    <canvas
                        ref={canvasRef}
                        width="1000"
                        height="300"
                        className="drawing-canvas relative w-full h-[200px] md:h-[300px] rounded-2xl border-2 border-border shadow-inner"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={stopDrawing}
                    ></canvas>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        className="canvas-btn group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg glow-primary hover:shadow-xl transition-all duration-300 btn-lift overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={recognize}
                        disabled={isLoading}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Recognize
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                    <button
                        className="canvas-btn px-8 py-4 text-foreground font-semibold rounded-xl border-2 border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300 btn-lift flex items-center justify-center gap-2"
                        onClick={clearCanvas}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear
                    </button>
                </div>

                {/* Results */}
                {prediction && Object.keys(prediction).length > 0 && (
                    <Results prediction={prediction} closeModal={() => setPrediction("")} />
                )}
            </div>
        </div>
    );
};

export default KerasYolo;
