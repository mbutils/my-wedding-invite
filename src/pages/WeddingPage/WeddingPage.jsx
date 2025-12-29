import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import 'lenis/dist/lenis.css';

function WeddingPage() {
    const containerRef = useRef(null);
    const lenisRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: true, // Disable on touch for better mobile performance
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;

        // GSAP ScrollTrigger integration with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Example ScrollTrigger animations
        const sections = gsap.utils.toArray('.scroll-section');
        
        sections.forEach((section, i) => {
        //   gsap.from(section, {
        //     scrollTrigger: {
        //       trigger: section,
        //       start: 'top 80%',
        //       end: 'top 20%',
        //       scrub: 1,
        //     //   markers: false,
        //     },
        //     opacity: 0,
        //     y: 100,
        //     duration: 1,
        //   });
        gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            markers: false, // Set to true to debug
          },
        }
      );
        });

        // Cleanup
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
  };

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem',
  };

  const heroStyle = {
    ...sectionStyle,
    height: '100vh',
  };

  const textCenterStyle = {
    textAlign: 'center',
  };

  const h1Style = {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
  };

  const heroSubtitleStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
    color: '#cbd5e1',
    maxWidth: '42rem',
    margin: '0 auto',
  };

  const scrollIndicatorStyle = {
    marginTop: '2rem',
    color: '#94a3b8',
  };

  const contentSectionStyle = {
    ...sectionStyle,
    padding: '5rem 1rem',
  };

  const contentInnerStyle = {
    maxWidth: '64rem',
    margin: '0 auto',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: 'clamp(2rem, 5vw, 3rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const h2Style = {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
  };

  const paragraphStyle = {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    color: '#cbd5e1',
    lineHeight: '1.8',
  };

  const gridStyle = {
    marginTop: '1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  };

  const featureCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const iconBoxStyle = {
    width: '3rem',
    height: '3rem',
    background: '#3b82f6',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
  };

  const featureTitleStyle = {
    color: 'white',
    fontWeight: '600',
    marginBottom: '0.5rem',
  };

  const featureTextStyle = {
    color: '#94a3b8',
    fontSize: '0.875rem',
  };

  const footerStyle = {
    ...sectionStyle,
    height: '100vh',
    background: '#020617',
  };

  const codeBlockStyle = {
    marginTop: '1.5rem',
    textAlign: 'left',
    maxWidth: '42rem',
    margin: '1.5rem auto 0',
    background: '#0f172a',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    fontSize: '0.875rem',
    color: '#cbd5e1',
    fontFamily: 'monospace',
  };

  const commandStyle = {
    color: '#60a5fa',
    display: 'block',
    marginBottom: '0.25rem',
  };

  const commentStyle = {
    color: '#94a3b8',
    marginTop: '1rem',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* Hero Section */}
      <section className="scroll-section" style={heroStyle}>
        <div style={textCenterStyle}>
          <h1 style={h1Style}>
            Smooth Scroll Demo
          </h1>
          <p style={heroSubtitleStyle}>
            React 19.2 + Lenis 1.3 + GSAP 3.14 with ScrollTrigger
          </p>
          <div style={scrollIndicatorStyle}>
            <p style={{ fontSize: '0.875rem' }}>Scroll down to see the magic ↓</p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {[1, 2, 3, 4].map((num) => (
        <section
          key={num}
          className="scroll-section"
          style={contentSectionStyle}
        >
          <div style={contentInnerStyle}>
            <div style={cardStyle}>
              <h2 style={h2Style}>
                Section {num}
              </h2>
              <p style={paragraphStyle}>
                This section will fade in and slide up as you scroll. The smooth scrolling
                is powered by Lenis, while GSAP's ScrollTrigger handles the animations.
                Touch interactions are optimized for mobile devices.
              </p>
              <div style={gridStyle}>
                {[1, 2, 3].map((card) => (
                  <div key={card} style={featureCardStyle}>
                    <div style={iconBoxStyle}></div>
                    <h3 style={featureTitleStyle}>Feature {card}</h3>
                    <p style={featureTextStyle}>
                      Mobile-friendly scroll animations
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <section className="scroll-section" style={footerStyle}>
        <div style={textCenterStyle}>
          <h2 style={{ ...h2Style, fontSize: 'clamp(2.5rem, 7vw, 4rem)', marginBottom: '1rem' }}>
            End of Demo
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
            Setup Instructions:
          </p>
          <div style={codeBlockStyle}>
            <p style={{ marginBottom: '0.5rem' }}># Install dependencies:</p>
            <span style={commandStyle}>npm install react@19.2 react-dom@19.2</span>
            <span style={commandStyle}>npm install lenis@1.3</span>
            <span style={commandStyle}>npm install gsap@3.14</span>
            <p style={commentStyle}>
              Then uncomment the code in useEffect to activate smooth scrolling
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WeddingPage