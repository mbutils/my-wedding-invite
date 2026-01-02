import gsap from "gsap"
import { useEffect } from "react"
import '../../../styles/pages/WeddingInvite/album.css'
import * as UIUtils from "../../../utils/UIUtils";

export default function Album() {
    const albumLine1 = ["/imgs/couple/album/IMG_5086.jpeg",
        "/imgs/couple/album/IMG_5087.jpeg",
        "/imgs/couple/album/IMG_5088.jpeg"]

    const albumLine2 = ["/imgs/couple/album/IMG_5089.jpeg",
        "/imgs/couple/album/IMG_5090.jpeg",
        "/imgs/couple/album/IMG_5091.jpeg"]

    useEffect(() => {
        const ctx = gsap.context(() => {
            albumLine1.forEach((image,i) => {
                gsap.from('.al-line1-item-'+i, {
                    x: 150,
                    opacity: 0,
                    duration: 1,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar('.al-line1-item-'+i, (80 - i*8) + '%', '40%')
                })
            })
            albumLine2.forEach((image,i) => {
                gsap.from('.al-line2-item-'+i, {
                    x: -150,
                    opacity: 0,
                    duration: 1,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar('.al-line2-item-'+i, (90 - i*8) + '%', '50%')
                })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: ".al-parallax-item",
                start: "top 80%",      // when it reaches middle
                end: "+=1000",          // controls slow movement
                scrub: 1.5,
                },
            })

            // PHASE 1 → 2 (Reveal)
            tl.fromTo(
                ".al-parallax-item",
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: "power2.out",
                }
            )

            // PHASE 3 (Parallax follow-through)
            tl.to(".al-parallax-1", {
                y: 150, // smaller movement = slower than page
                ease: "none",
            })
            tl.to(".al-parallax-2", {
                y: -100, // smaller movement = slower than page
                ease: "none",
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="section album">
            <div className='section-content'>
                <div className="al-album-sec">
                    <div className="al-album-1">
                        {albumLine1.map((image, i) => (
                            <div className={`al-album-1-item al-line1-item-${i}`}><img src={image}/></div>
                        ))}
                    </div>
                    <div className="al-album-1 mt-3">
                        {albumLine2.map((image, i) => (
                            <div className={`al-album-1-item al-line2-item-${i}`}><img src={image}/></div>
                        ))}
                    </div>
                </div>

                <div className="al-parallax">
                    <img className="al-parallax-item al-parallax-1" src="/imgs/couple/album/IMG_5088.jpeg" />
                    <img className="al-parallax-item al-parallax-2" src="/imgs/couple/album/IMG_5090.jpeg" />
                </div>
            </div>
        </section>
    )
}