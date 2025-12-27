import { useEffect } from 'react'
import '../../../styles/pages/WeddingInvite/hero.css'
import gsap from 'gsap'
import SnowCanvas from '../../ui/SnowCanvas';

function Hero() {
    const titleStr = "Lễ Thành Hôn";
    const namAndStr = "kết duyên cùng";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // title
            for (let i = 0; i < titleStr.split(" ").length; i++) {
                gsap.from('.hr-title-' + i, {
                    y: -100,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.2 + i*0.2,
                    ease: 'sine.out',
                })
            }

            gsap.from('.hr-name-groom', {
                x: -20,
                y: -20,
                opacity: 0,
                duration: 1,
                ease: 'sine.out',
            })
            gsap.from('.hr-name-bride', {
                x: 20,
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: 'sine.out',
            })
            for (let i = 0; i < namAndStr.split(" ").length; i++) {
                gsap.from('.hr-name-and-' + i, {
                    y: -5,
                    opacity: 0,
                    duration: 1,
                    delay: 0.5 + i*0.2,
                    ease: 'sine.out',
                })
            }

            gsap.from('.hr-letter-groom', {
                y: 5,
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: 'sine.out',
            })
            gsap.from('.hr-letter-bride', {
                y: 5,
                opacity: 0,
                duration: 1,
                delay: 1.5,
                ease: 'sine.out',
            })
            gsap.from('.hr-letter-and', {
                y: 30,
                opacity: 0,
                duration: 1.5,
                delay: 2,
                ease: 'sine.out',
            })
        })
    
        return () => ctx.revert()
    }, [])

    return (
        <section className="section hero">
            {/* <SnowCanvas/> */}
            <div className='section-content'>
                {/* <div className='ele img-wrapper flower-l-0' style={{}}>
                    <img className='ele' style={{maxWidth:'190vw'}} src='/imgs/IMG_5041.png'/>
                </div>
                <div className='ele flower-l-1'>
                    <img className='ele' style={{width:'200px'}} src='/imgs/IMG_5031.png'/>
                </div>
                <div className='ele flower-l-2'>
                    <img className='ele' style={{
                        transform: 'rotate(90deg)',
                        right: '-40%',
                    }} src='/imgs/IMG_5038.png'/>
                </div>
                <div className='ele flower-l-1'>
                    <img className='ele' style={{}} src='/imgs/IMG_5046.png'/>
                </div> */}

                <div className="ele hr-title ff-diam">
                    {titleStr.split(" ").map((str, i) => <div className={'ms-2 hr-title-' + i}>{str}</div>)}
                </div>
                <div className="ele hr-name-groom ff-walig">Phan Quốc Huy</div>
                <div className="ele hr-name-and ff-magel">
                    {namAndStr.split(" ").map((str, i) => <div className={'ms-2 name-and-' + i}>{str}</div>)}
                </div>
                <div className="ele hr-name-bride ff-walig">Phan Thị Lan</div>

                <div className="ele hr-letter-and ff-spen">&</div>
                <div className="ele hr-letter-groom ff-spen">H</div>
                <div className="ele hr-letter-bride ff-spen">L</div>
            </div>
        </section>
    )
}

export default Hero;