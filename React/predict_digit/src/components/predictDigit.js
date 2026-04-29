import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import KerasYolo from "./predictDigitComps/kerasYolo";
import ImageUploader from "./predictDigitComps/imageUploader";

export const TOKEN = window._env_?.REACT_APP_TOKEN;
export const API_BASE_URL = window._env_?.REACT_APP_API_BASE_URL;

const PredictDigit = () => {
    const pageRef = useRef(null);
    const token = TOKEN || "predict_digit";
    const baseUrl = (API_BASE_URL && API_BASE_URL.trim()) ? API_BASE_URL.trim().replace(/\/+$/, "") : "";
    const api = baseUrl ? `${baseUrl}/predict-digit` : "http://127.0.0.1:5000/predict-digit";
    const apiUrl = baseUrl ? `${baseUrl}/predict-text` : "http://127.0.0.1:5000/predict-text";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.page-header',
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="py-8">
            {/* Page Header */}
            <div className="page-header text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-sm font-medium text-muted-foreground">AI delays delays delays</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Delays delays <span className="gradient-text">Delays</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Delays delays delays delays delays delays delays delays delays delays delays delays.
                </p>
            </div>

            {/* Drawing Section */}
            <KerasYolo api={api} token={token} />
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm font-medium text-muted-foreground px-4">Delays</span>
                <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Image Upload Section */}
            <ImageUploader api={apiUrl} token={token} />
        </div>
    );
};

export default PredictDigit;
