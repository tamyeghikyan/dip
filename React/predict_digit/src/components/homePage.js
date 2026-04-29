import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
      
      heroTl.fromTo('.hero-badge', 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1 }
      );
      heroTl.fromTo('.hero-title', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0 }, 
        "-=0.4"
      );
      heroTl.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        "-=0.4"
      );
      heroTl.fromTo('.hero-cta', 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1 }, 
        "-=0.3"
      );
      heroTl.fromTo('.hero-stats', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.1 }, 
        "-=0.2"
      );

      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Advanced CNN Model",
      description: "Our model uses modern Convolutional Neural Network architecture for highly accurate handwritten digit recognition."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Real-time Processing",
      description: "Get instant results with our optimized system that processes your input in milliseconds."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "High Accuracy",
      description: "Achieve over 98% accuracy in digit recognition with our well-trained neural network model."
    }
  ];

  return (
    <div ref={heroRef} className="py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center mb-20 md:mb-32">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-muted-foreground">CNN Handwritten Digit Recognition</span>
        </div>

        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="text-foreground">Digit Recognition</span>
          <br />
          <span className="gradient-text">AI Technology</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed px-4">
          Our neural network model using Convolutional Neural Networks (CNN) can recognize handwritten digits with high accuracy. Upload an image or draw a digit to test the model.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            to="/try" 
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg glow-primary hover:shadow-xl transition-all duration-300 btn-lift overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Try Now
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
          <a 
            href="#features" 
            className="px-8 py-4 text-foreground font-medium rounded-xl border border-border hover:bg-secondary transition-all duration-300 btn-lift"
          >
            Learn More
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">98%+</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{'<'}50ms</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">0-9</div>
            <div className="text-sm text-muted-foreground">Digits</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our system offers advanced capabilities for digit recognition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-card to-secondary border border-border">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to Try?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Draw or upload an image and see the recognition result instantly.
        </p>
        <Link 
          to="/try" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg glow-primary hover:shadow-xl transition-all duration-300 btn-lift"
        >
          Start Now
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
