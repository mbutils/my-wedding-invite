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
            </div>
        </section>
    )
}