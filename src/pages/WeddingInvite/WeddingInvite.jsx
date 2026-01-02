import { useParams, useSearchParams } from "react-router-dom"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../../styles/pages/WeddingInvite/weddingInvite.css'

import { GuestOf, InviteAttachment } from "../../utils/Constants";
import Hero from "./sections/Hero";
// import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import Story from "./sections/Story";
import Timeline from "./sections/Timeline";
import Album from "./sections/Album";
import Invitation from "./sections/Invitation";
import Footer from "./sections/Footer";
import { isMobile } from "react-device-detect";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger)

function WeddingInvite() {
    const { guest } = useParams();
    const [params] = useSearchParams(); // a-attachment, o-guest of groom or bride
    const attach = params.get('a');
    const guestOf = params.get('o') || 1;
    const containerRef = useRef(null);
    const lenisRef = useRef(null);

    // init scroll
    // useEffect(() => {
    //     const lenis = new Lenis({
    //         smooth: true,
    //         lerp: 0.08,          // lower = smoother (mobile-friendly)
    //         wheelMultiplier: 1,
    //         touchMultiplier: 1.2
    //     })
    
    //     function raf(time) {
    //         lenis.raf(time)
    //         requestAnimationFrame(raf)
    //     }
    //     requestAnimationFrame(raf)
    
    //     lenis.on('scroll', ScrollTrigger.update)

    //     ScrollTrigger.refresh()
    
    //     return () => lenis.destroy()
    // }, [])

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: !isMobile, // Disable on touch for better mobile performance
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

        // Cleanup
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <div className="invite-wrapper" ref={containerRef}>
            <Hero/>
            <Invitation/>
            <Timeline/>
            <Album/>
            <Story/>
            <Footer/>
        </div>
    )
}

export default WeddingInvite