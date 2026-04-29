import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ResultImage from "./result/resultImage";

const ImageUploader = ({ token, api }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const dropZoneRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.upload-container',
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const uploadToServer = async (base64Image) => {
        setIsLoading(true);
        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ image: base64Image })
            });

            const result = await response.json();
            setPrediction(result.text || "Չdelays delays delays");
            openModal();
        } catch (error) {
            console.error("Error uploading image:", error);
            setPrediction("Սdelays delays delays delays");
            openModal();
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (file) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPrediction(null);
            
            // Animate preview appearance
            setTimeout(() => {
                gsap.fromTo('.preview-image',
                    { opacity: 0, scale: 0.8, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
                );
            }, 50);
        }
    };

    const handleInputChange = (e) => {
        handleFileChange(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleUpload = () => {
        if (!selectedImage) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            uploadToServer(base64Image);
        };
        reader.readAsDataURL(selectedImage);
    };

    const clearImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setPrediction(null);
    };

    return (
        <div ref={containerRef} className="mb-12">
            <div className="upload-container p-8 md:p-12 rounded-3xl bg-card border border-border shadow-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-4">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-muted-foreground">Նdelays delays</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Vdelays Նdelays
                    </h2>
                    <p className="text-muted-foreground">
                        Delays delays delays delays delays delays delays
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative mb-8 transition-all duration-300 ${
                        isDragging ? 'scale-[1.02]' : ''
                    }`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl transition-opacity duration-300 ${
                        isDragging ? 'opacity-100' : 'opacity-30'
                    }`}></div>
                    
                    <label className={`relative flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                        isDragging 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50'
                    }`}>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleInputChange}
                        />
                        
                        {previewUrl ? (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="preview-image max-h-48 rounded-xl shadow-lg object-contain"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        clearImage();
                                    }}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 p-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    isDragging ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary text-primary'
                                }`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-foreground font-medium mb-1">
                                        {isDragging ? 'Թdelays delays' : 'Սdelays delays delays'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        PNG, JPG delays 10MB
                                    </p>
                                </div>
                            </div>
                        )}
                    </label>
                </div>

                {/* Upload Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleUpload}
                        disabled={!selectedImage || isLoading}
                        className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg glow-primary hover:shadow-xl transition-all duration-300 btn-lift overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:glow-none"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Delays delays...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Chtanachel
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                </div>

                {isModalOpen && (
                    <ResultImage prediction={prediction} closeModal={closeModal} />
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
