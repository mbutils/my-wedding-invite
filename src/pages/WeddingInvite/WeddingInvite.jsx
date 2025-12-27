import { useParams, useSearchParams } from "react-router-dom"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../../styles/pages/WeddingInvite/weddingInvite.css'

import { GuestOf, InviteAttachment } from "../../utils/Constants";
import Hero from "./sections/Hero";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import Story from "./sections/Story";
import Timeline from "./sections/Timeline";
import Album from "./sections/Album";
import Invitation from "./sections/Invitation";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger)

function WeddingInvite() {
    const { guest } = useParams();
    const [params] = useSearchParams(); // a-attachment, o-guest of groom or bride
    const attach = params.get('a');
    const guestOf = params.get('o') || 1;

    // init scroll
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.08,          // lower = smoother (mobile-friendly)
            wheelMultiplier: 1,
            touchMultiplier: 1.2
        })
    
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    
        lenis.on('scroll', ScrollTrigger.update)

        // ScrollTrigger.scrollerProxy(document.body, {
        //     scrollTop(value) {
        //         return arguments.length
        //         ? lenis.scrollTo(value)
        //         : window.scrollY;
        //     },
        //     getBoundingClientRect() {
        //         return {
        //         top: 0,
        //         left: 0,
        //         width: window.innerWidth,
        //         height: window.innerHeight,
        //         };
        //     },
        // });
    
        ScrollTrigger.refresh()
    
        return () => lenis.destroy()
    }, [])

    return (
        <div className="invite-wrapper">
            {/* <div>Trân trọng kính mời {guest}</div>
            <div>và {InviteAttachment[attach]}</div>
            <div>là bạn của {GuestOf[guestOf]}</div> */}
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