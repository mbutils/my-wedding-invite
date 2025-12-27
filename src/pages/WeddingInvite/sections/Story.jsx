import gsap from "gsap"
import { useEffect } from "react"
import '../../../styles/pages/WeddingInvite/story.css'

export default function Story() {
    const titleStr = "Thư mời tham dự";
    useEffect(() => {
        const ctx = gsap.context(() => {
            // title
            for (let i = 0; i < titleStr.split(" ").length; i++) {
                gsap.from('.st-title-' + i, {
                    y: -100,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.2 + i*0.2,
                    ease: 'sine.out',
                    scrollTrigger: {
                        trigger: '.st-title-' + i,
                        start: 'top 90%',
                        end: 'top 40%',
                        scrub: true,
                        toggleActions: 'play reverse play reverse',
                    }
                })
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="section story">
            <div className='section-content'>
                
            </div>
        </section>
    )
}