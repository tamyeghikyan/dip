import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Results = ({ prediction, closeModal }) => {
    const modalContentRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        if (prediction && Object.keys(prediction).length > 0) {
            gsap.fromTo(
                backgroundRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.3 }
            );
            gsap.fromTo(
                modalContentRef.current,
                { autoAlpha: 0, y: -30, scale: 0.95 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.1 }
            );
            // Animate each result item
            gsap.fromTo(
                '.result-item',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.3 }
            );
        }
    }, [prediction]);

    const handleClose = () => {
        gsap.to(modalContentRef.current, {
            autoAlpha: 0,
            y: 20,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
        });
        gsap.to(backgroundRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: closeModal,
        });
    };

    if (!prediction || Object.keys(prediction).length === 0) return null;

    return (
        <div
            ref={backgroundRef}
            className="fixed inset-0 modal-backdrop bg-black/60 flex items-center justify-center z-50 p-4"
            style={{ visibility: "hidden" }}
            onClick={handleClose}
        >
            <div
                ref={modalContentRef}
                className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                style={{ visibility: "hidden" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-border bg-secondary/30">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Կdelays Delays</h2>
                                <p className="text-sm text-muted-foreground">Delays delays delays</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-3">
                        {Object.entries(prediction).map(([index, value]) => {
                            const digit = value.digit;
                            const confidence = value.prediction;
                            const confidencePercent = (confidence * 100).toFixed(1);

                            return (
                                <div
                                    key={index}
                                    className="result-item flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl font-bold text-primary-foreground">{digit}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-foreground">Delays {parseInt(index) + 1}</span>
                                            <span className="text-sm font-semibold text-primary">{confidencePercent}%</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                                                style={{ width: `${confidencePercent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-secondary/20">
                    <button
                        onClick={handleClose}
                        className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-lift"
                    >
                        Փdelays
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
