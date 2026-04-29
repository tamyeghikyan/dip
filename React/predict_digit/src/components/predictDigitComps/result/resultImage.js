import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ResultImage = ({ prediction, closeModal }) => {
    const modalContentRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        if (prediction) {
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

    return (
        <div
            ref={backgroundRef}
            className="fixed inset-0 modal-backdrop bg-black/60 flex items-center justify-center z-50 p-4"
            style={{ visibility: "hidden" }}
            onClick={handleClose}
        >
            <div
                ref={modalContentRef}
                className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                style={{ visibility: "hidden" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-border bg-secondary/30">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Recognized Text</h2>
                                <p className="text-sm text-muted-foreground">Text extracted from image</p>
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

                {/* Content */}
                <div className="p-6">
                    <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap text-center font-medium">
                            {prediction || "No text recognized"}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-secondary/20 flex gap-4">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(prediction);
                        }}
                        className="flex-1 py-3 px-6 bg-secondary text-foreground font-semibold rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300 btn-lift flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                    </button>
                    <button
                        onClick={handleClose}
                        className="flex-1 py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-lift"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultImage;
