import gsap from "gsap"
import { useEffect } from "react"
import '../../../styles/pages/WeddingInvite/invitation.css'
import * as UIUtils from "../../../utils/UIUtils";

export default function Invitation() {
    const titleStr = "Thư mời tham dự";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // title
            for (let i = 0; i < titleStr.split(" ").length; i++) {
                gsap.from('.iv-title-' + i, {
                    y: -60,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar('.iv-title-' + i, (105-i*5)+'%')
                })
            }

            gsap.from('.iv-splitter', {
                y: -80,
                opacity: 0,
                duration: 2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.iv-splitter', '70%')
            })
            gsap.from('.iv-title-desc', {
                y: -80,
                opacity: 0,
                duration: 0.7,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.iv-title-desc', '80%')
            })
            
            gsap.from('.iv-gr-image', {
                y: -180,
                opacity: 0,
                duration: 2.5,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.iv-br-image', '80%', '55%')
            })
            gsap.from('.iv-br-image', {
                y: 180,
                opacity: 0,
                duration: 2.5,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.iv-br-image', '80%', '55%')
            })

            var t1 = ['.iv-gr-title','.iv-gr-name'];
            t1.forEach(ref => {
                gsap.from(ref, {
                    x: 40,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar(ref, '40%', '30%')
                })
            });
            var t2 = ['.iv-br-title','.iv-br-name'];
            t2.forEach((ref, i) => {
                gsap.from(ref, {
                    x: -40,
                    opacity: 0,
                    duration: 0.1,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar(t1[i], '40%', '30%')
                })
            });
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="section invitation">
            <div className='section-content'>
                <div className="ele iv-title ff-kedanty">
                    {titleStr.split(" ").map((str, i) => <div className={'ms-2 iv-title-' + i}>{str}</div>)}
                </div>
                <div className="ele iv-splitter"></div>
                <div className="ele iv-title-desc ff-roycou-sef">Trân trọng kính mời đến dự lễ thành hôn của</div>
                <div className="iv-cdcr">
                    <div className="iv-cdcr-content me-1">
                        <div className="iv-gr-title ff-imperial">Chú rể</div>
                        <div className="iv-gr-name ff-utmencore">Phan Huy</div>
                        <img className="iv-gr-image" src="/imgs/couple/IMG_5065.jpeg" />
                    </div>
                    <div className="iv-cdcr-content ms-1">
                        <img className="iv-br-image" src="/imgs/couple/IMG_5064.jpeg" />
                        <div className="iv-br-title ff-imperial">Cô dâu</div>
                        <div className="iv-br-name ff-utmencore">Phan Lan</div>
                    </div>
                </div>
            </div>
        </section>
    )
}