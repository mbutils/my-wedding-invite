import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

export default function CylinderText(props) {
    const {radius,text} = props
    const containerRef = useRef(null)
    const textRef = useRef(null)

    useLayoutEffect(() => {
        const split = new SplitType(textRef.current, {
            types: "words",
        })

        const chars = split.words
        const radius = 20 // cylinder radius

        // INITIAL STATE (text on ground, hidden)
        gsap.set(textRef.current, {
            rotationX: 90,
            transformOrigin: `50% 50% ${radius}px`,
            z: -radius,
            opacity: 0,
        })

        // SCROLL ANIMATION
        gsap.to(textRef.current, {
            rotationX: 0,
            z: 0,
            opacity: 1,
            stagger: {
                each: 0.04,
                from: "start",
            },
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 50%",
                scrub: true,
            },
        })

        return () => split.revert()
    }, [])

    return (
        <section ref={containerRef} className="scene">
            <h1 ref={textRef} className="text-wrap" style={{'color':'#fff'}}>
                ROLLING INTO VIEW
            </h1>
        </section>
    )
}
