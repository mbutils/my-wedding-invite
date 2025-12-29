import '../../styles/pages/Guide.css';
import { Select, Input, Col, Row, Button, message } from 'antd';
import { GuestOf, InviteAttachment } from '../../utils/Constants';
import { useEffect, useState, useMemo, useRef } from 'react';
import { BlockOutlined, ExportOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
// import Lenis from '@studio-freight/lenis'
import {isMobile} from 'react-device-detect';
import {ReactLenis,useLenis} from 'lenis/react'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GuidePage() {
  const [guest, setGuest] = useState('');
  const [attach, setAttach] = useState('1');
  const [guestOf, setGuestOf] = useState('1');
  const [link, setLink] = useState();
  const lenisRef = useRef();
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    changeLink(guest);
  }, [attach, guestOf])

  const changeLink = (name) => {
    var defLink = import.meta.env.VITE_INVITE_LINK;
    var guestName = encodeURIComponent(name);
    
    defLink += guestName;
    var deli = "?";
    if (attach) {
      defLink += deli + `a=${attach}`;
      deli = "&";
    }
    defLink += guestOf ? deli + `o=${guestOf}` : '';
    setLink(defLink);
  }

  const changeGuest = useMemo(
    () => debounce(v => {
      setGuest(v);
      changeLink(v);
    }, 500),
    []
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      message.success('Copied to clipboard')
    } catch {
      message.error('Copy failed')
    }
  }

  const accessLink = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  const lenis = useLenis(({ scroll }) => {
    // suppose need to update here the ScrollTriggers
    ScrollTrigger.update();
  });
  
  // init scroll
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     smooth: true,
  //     lerp: 0.08,          // lower = smoother (mobile-friendly)
  //     wheelMultiplier: 1,
  //     touchMultiplier: 1.2
  //   })

  //   function raf(time) {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }
  //   requestAnimationFrame(raf)

  //   lenis.on('scroll', ScrollTrigger.update)

  //   ScrollTrigger.refresh()

  //   return () => lenis.destroy()
  // }, [])

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add(update);

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({ scroller: wrapper.current });

    const rafId = requestAnimationFrame(update)

    // ScrollTrigger.scrollerProxy(wrapper.current, {
    //   scrollTop(value) {
    //     return arguments.length
    //       ? lenisRef.current?.scrollTo(value, { duration: 0, immediate: true })
    //       : lenisRef.current?.scroll;
    //   },
    //   getBoundingClientRect() {
    //     return {
    //       top: 0,
    //       left: 0,
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     };
    //   },
    // });
    return () => {
      cancelAnimationFrame(rafId)
      gsap.ticker.remove(update)
    };
  }, []);

  // effects
  const fadeRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // gsap.fromTo(fadeRef.current, 
      //   { opacity: 0, y: 40 },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 1,
      //     ease: 'power2.out',
      //     scrollTrigger: {
      //       trigger: fadeRef.current,
      //       start: 'top 80%',
      //       end: 'top 40%',
      //       toggleActions: 'play reverse play reverse',
      //     }
      //   }
      // )
      gsap.from(fadeRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: fadeRef.current,
          // start: 'top 80%',
          // end: 'top 40%',
          scrub: true,
          toggleActions: 'play reverse play reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      options={{
        autoRaf: false,
        wrapper: wrapper.current,
        content: content.current,
        duration: isMobile ? 1.5 : 3,
        smoothTouch: true,
        touchMultiplier: 1.0,
        touchInertiaMultiplier: 50,
        direction: "vertical",
        gestureDirection: "vertical",
        syncTouch: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //eventsTarget: document.documentElement,
      }}
    >
    {/* <> */}
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>Tên khách:</Col>
            <Col span={16}>
              <Input onChange={e => changeGuest(e.target.value)}/>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col span={6}>Đi cùng:</Col>
            <Col span={16}>
              <Select
                defaultValue={attach}
                style={{ width: '100%' }}
                allowClear
                onChange={v => setAttach(v)}
                options={Object.entries(InviteAttachment).map(([value, label]) => ({value, label}))}
              ></Select>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col span={6}>Là khách của:</Col>
            <Col span={16}>
              <Select
                defaultValue={guestOf}
                onChange={v => setGuestOf(v)}
                options={Object.entries(GuestOf).map(([value, label]) => ({value, label}))}
              ></Select>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col span={6}>Link:</Col>
            <Col span={16}>
              <Input readOnly value={link} />
            </Col>
          </Row>
          <Row className='mt-1'>
            <Col span={6}></Col>
            <Col span={16}>
              <Button type='primary' onClick={accessLink}><ExportOutlined /> Truy cập</Button>
              <Button className='ms-2' onClick={copy}><BlockOutlined /> Copy link</Button>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <button className='h-btn'>
            count
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <div className='font-item'>
            <label>ff-austin</label>
            <p className='ff-austin'>Lễ thành hôn</p>
          </div>

          <div className='font-item'>
            <label>ff-diam</label>
            <p className='ff-diam'>Sự hiện diện</p>
          </div>

          <div className='font-item'>
            <label>ff-houst</label>
            <p className='ff-houst'>Chung vui cùng gia đình</p>
          </div>

          <div className='font-item'>
            <label>ff-justsun</label>
            <p className='ff-justsun'>Là niềm hạnh phúc</p>
          </div>

          <div className='font-item'>
            <label>ff-walig</label>
            <p className='ff-walig'>Quốc Huy & Phan Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-magel</label>
            <p className='ff-magel'>Trân trọn kính mời</p>
          </div>

          <div className='font-item'>
            <label>ff-spen</label>
            <p className='ff-spen'>Anh Kiên và Gia đình</p>
          </div>

          <div className='font-item'>
            <label>ff-imperial</label>
            <p className='ff-imperial'>Bay vào vũ trụ</p>
          </div>

          <div className='font-item'>
            <label>ff-mjlove</label>
            <p className='ff-mjlove'>Bao điều muốn nói</p>
          </div>

          <div className='font-item'>
            <label>ff-mjvip</label>
            <p className='ff-mjvip'>Hân hạnh</p>
          </div>

          <div className='font-item'>
            <label>ff-brunet</label>
            <p className='ff-brunet'>Nhà cửa ổn định</p>
          </div>

          <div className='font-item'>
            <label>ff-betrayos</label>
            <p className='ff-betrayos'>Tình yêu và tiền bạc</p>
          </div>

          <div className='font-item'>
            <label>ff-thalune</label>
            <p className='ff-thalune'>Ngày trọng đại</p>
          </div>

          <div className='font-item'>
            <label>ff-sidney</label>
            <p className='ff-sidney'>Đại diện nhà trai</p>
          </div>

          <div className='font-item'>
            <label>ff-woodsen</label>
            <p className='ff-woodsen'>Đại diện nhà gái</p>
          </div>

          <div className='font-item'>
            <label>ff-azkia</label>
            <p className='ff-azkia'>Hai con chúng tôi</p>
          </div>
        </Col>

        <Col span={12}>
          <div className='font-item'>
            <label>ff-kedanty</label>
            <p className='fs-1 ff-kedanty'>Thư mời tham gia &</p>
          </div>
          <div className='font-item'>
            <label>ff-kedanty-i</label>
            <p className='fs-1 ff-kedanty-i'>Thư mời tham gia &</p>
          </div>

          <div className='font-item'>
            <label>ff-roycou</label>
            <p className='ff-roycou'>Trân trọng kính mời &</p>
          </div>
          <div className='font-item'>
            <label>ff-roycou-sef</label>
            <p className='ff-roycou-sef'>Trân trọng kính mời &</p>
          </div>
          <div className='font-item'>
            <label>ff-roycou-scr</label>
            <p className='ff-roycou-scr'>Trân trọng kính mời &</p>
          </div>

          <div className='font-item'>
            <label>ff-utmencore</label>
            <p className='ff-utmencore'>Phan Quốc Huy  & Phan Thị Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-qastars</label>
            <p className='ff-qastars'>Phan Quốc Huy & </p>
          </div>

          <div className='font-item'>
            <label>ff-parispro</label>
            <p className='ff-parispro'>Phan Quốc Huy &</p>
          </div>

          <div className='font-item'>
            <label>ff-camaro</label>
            <p className='ff-camaro'>Phan Quốc Huy &</p>
          </div>

          <div className='font-item'>
            <label>ff-cyrano</label>
            <p className='ff-cyrano'>Phan Quốc Huy &</p>
          </div>

          <div className='font-item'>
            <label>ff-seiston</label>
            <p className='ff-seiston'>Phan Quốc Huy &</p>
          </div>

          <div className='font-item'>
            <label>ff-elegantwoman</label>
            <p className='ff-elegantwoman'>Phan Quốc Huy & Phan Thị Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-donnasmith</label>
            <p className='ff-donnasmith'>Phan Quốc Huy & Phan Thị Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-egorycastle</label>
            <p className='ff-egorycastle'>Phan Quốc Huy & Phan Thị Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-monalisa</label>
            <p className='ff-monalisa'>Phan Quốc Huy & Phan Thị Lan</p>
          </div>

          <div className='font-item'>
            <label>ff-montserr</label>
            <p className='ff-montserr'>Phan Quốc Huy & Phan Thị Lan</p>
          </div>
        </Col>
      </Row>

      {/* <div style={{ height: '100vh' }} /> */}
      {/* <div className='guide-lenis'> */}
        <h1 ref={fadeRef}>Lenis Effects</h1>
      {/* </div> */}
      {/* <div style={{ height: '100vh' }} /> */}
    {/* </> */}
    </ReactLenis>
  )
}

export default GuidePage