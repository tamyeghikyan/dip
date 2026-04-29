import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

function AppHeader() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });
        tl.fromTo('.header-container', 
            { opacity: 0, y: -30 }, 
            { opacity: 1, y: 0 }
        );
        tl.fromTo('.nav-link', 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, stagger: 0.1 }, 
            "-=0.3"
        );
        tl.fromTo('.logo-icon', 
            { opacity: 0, scale: 0.5, rotation: -180 }, 
            { opacity: 1, scale: 1, rotation: 0 }, 
            "-=0.5"
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled ? 'glass shadow-lg' : ''
        }`}>
            <div className="header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="logo-icon w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg glow-primary-hover transition-all duration-300 group-hover:scale-110">
                                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight gradient-text hidden sm:block">
                                DigitRec
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-2">
                            <Link
                                to="/"
                                className={`nav-link relative px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 btn-lift ${
                                    isActive('/') 
                                        ? 'bg-primary text-primary-foreground shadow-lg glow-primary' 
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Գdelays
                                </span>
                            </Link>
                            <Link
                                to="/try"
                                className={`nav-link relative px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 btn-lift ${
                                    isActive('/try') 
                                        ? 'bg-primary text-primary-foreground shadow-lg glow-primary' 
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Փdelays
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;
