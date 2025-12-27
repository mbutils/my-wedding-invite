import { useEffect } from 'react'
import '../../../styles/pages/WeddingInvite/timeline.css'
import gsap from 'gsap'
import * as UIUtils from "../../../utils/UIUtils";
import LogoName from '../../ui/LogoName';

export default function Timeline() {
    const program = [
        {time: '8:00', name: 'Đón khách'},
        {time: '10:00', name: 'Bữa cơm thân mật'},
        {time: '13:00', name: 'Khởi hành đón dâu'},
        {time: '15:00', name: 'Lễ thành hôn'},
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.tl-frame', {
                y: -150,
                opacity: 0,
                duration: 2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.tl-frame', '60%', '45%')
            })

            gsap.from('.tl-logo', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.tl-logo', '85%', '50%')
            })

            program.forEach((p, i) => {
                gsap.from('.tl-program-time-' + i, {
                    x: -50,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar('.tl-program-time-'+i, (85 - 3*i) + '%', '65%')
                })
                gsap.from('.tl-program-name-' + i, {
                    x: 50,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'sine.out',
                    scrollTrigger: UIUtils.scrollTriggerVar('.tl-program-name-'+i, (85 - 3*i) + '%', '65%')
                })
            })

            gsap.from('.tl-time-month', {
                x: -30,
                opacity: 0,
                duration: 1.2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.tl-time-month', '60%', '30%')
            })
            gsap.from('.tl-time-year', {
                x: 30,
                opacity: 0,
                duration: 1.2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.tl-time-year', '60%', '30%')
            })
            gsap.from('.tl-time-day', {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'sine.out',
                scrollTrigger: UIUtils.scrollTriggerVar('.tl-time-year', '50%', '30%')
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="section timeline">
            <div className='section-content'>
                <div className='ele tl-frame'>
                    <div className="ele tl-frame-1">
                        <div className="ele tl-frame-1-in"></div>
                        <div className="ele tl-mask-1"></div>
                        <div className="ele tl-frame-3">
                            <div className="ele tl-frame-3-in"></div>
                        </div>
                    </div>
                    <div className="ele tl-frame-2">
                        <div className="ele tl-frame-2-in"></div>
                        <div className="ele tl-mask-2"></div>
                    </div>
                </div>
                <div className='ele tl-text'>
                    <div className='ele tl-title-time ff-roycou'>
                        <div className='tl-time-month'>Tháng ?</div>
                        <div className='tl-time-day'>?</div>
                        <div className='tl-time-year'>2026</div>
                    </div>
                    {/* <LogoName></LogoName> */}
                    <img className="ele tl-logo" src="/imgs/ui/logo.png" />
                    <div className='ele tl-program ff-montserr'>
                        {program.map((p, i) => (
                            <div className='tl-program-item'>
                                <div className={`tl-program-time tl-program-time-${i}`}>{p.time}</div>
                                <div className={`tl-program-name tl-program-name-${i}`}>{p.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}