import gsap from "gsap";
import Lenis from "lenis";
import {isMobile} from 'react-device-detect';
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import 'lenis/dist/lenis.css';
import '../../styles/pages/WeddingPage/weddingPage.css';
import CylinderText from "../ui/CylinderText";
import { GuestOf } from "../../utils/Constants";
import * as UIUtils from "../../utils/UIUtils";

function WeddingPage() {
    const containerRef = useRef(null);
    const lenisRef = useRef(null);
    const [guestOf, setGuestOf] = useState(2);

    useEffect(() => {
      // Initialize Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: isMobile, // Disable on touch for better mobile performance
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

      // Example ScrollTrigger animations
      // const sections = gsap.utils.toArray('.scroll-section');
      
      // sections.forEach((section, i) => {
      //   gsap.fromTo(
      //     section,
      //     {
      //       opacity: 0,
      //       y: 100,
      //     },
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 1,
      //       ease: 'power2.out',
      //       scrollTrigger: {
      //         trigger: section,
      //         start: 'top 80%',
      //         end: 'top 50%',
      //         scrub: 1,
      //         markers: false, // Set to true to debug
      //       },
      //     }
      //   );
      // });

      // Cleanup
      return () => {
          lenis.destroy();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

  function info(key) {
    return UIUtils.getFirst(guestOf, key);
  }
  function info2nd(key) {
    return UIUtils.getSecond(guestOf, key);
  }

  return (
    <div ref={containerRef} className={`wedding-page-wrapper ${isMobile ? '' : '--desktop'}`}>
      {/* Hero Section */}
      <section className="scroll-section">
        <div className="wp-hero">
          <img className="hero-img" src="/imgs/couple/album/IMG_5087.jpeg" />
          <div className="hero-text ff-betrayos">We get <span className="hero-text-2">married!</span></div>
        </div>
      </section>

      {/* Invite & Stories */}
      <section className="scroll-section">
        <div className="wp-invite-stories">
          <div className="ff-parispro invite-letter">Thư mời tham dự</div>
          <div className="ff-roycou-scr invite-name">Anh Kiều và Gia đình</div>
          <div className="invite-text">Trân trọng kính mời đến dự buổi {info("event").toLowerCase()} của</div>

          <div className="groom-bride-instruct">
            <div className="groom-instruct">
              <div className="groom-title ff-parispro">{info("name").title}</div>
              <div className="groom-name ff-utmencore">{info("name").fullName}</div>
              <img className="groom-img" src={info("name").img} />
            </div>
            <div className="bride-instruct">
              <img className="bride-img" src={info2nd("name").img} />
              <div className="bride-title ff-parispro">{info2nd("name").title}</div>
              <div className="bride-name ff-utmencore">{info2nd("name").fullName}</div>
            </div>
          </div>

          <div className="story-para ff-montserr">Ngày ấy, tôi 25! Một mình giữa phố thị nấp tập. Mỗi chiều cuối tuần thường chạy xe vòng quanh qua những con phố, len lỏi trong từng dòng người tấp nập. Nhưng rồi một ngày đẹp trời, người con trai ấy xuất hiện, nắm tay rồi thủ thỉ vào tai: “Hy vọng sau này anh được làm những điều ấy cùng em".</div>
          <img className="story-img" src="/imgs/couple/album/IMG_5090.jpeg" />

        </div>
      </section>

      {/* Details */}
      <section className="scroll-section">
        <div className="wp-announcement">
          {/* Family */}
          {/* <img className="family-frame-img" src="/imgs/ui/family-frame.png" /> */}
          
          <div className="wp-logo-name">
            <img className="wp-logo-frame-img" src="/imgs/ui/logo-frame.png" />
            <div className="wp-logo-groom ff-camaro">{info("logo")}</div>
            {/* <div className="wp-logo-and">&</div> */}
            <div className="wp-logo-bride ff-camaro">{info2nd("logo")}</div>
          </div>

          <div className="family">
            <div className="family-names family-groom">
              <div className="family-title ff-parispro">{info("family").title}</div>
              <div className="family-name"><span className="name-title">Bố.</span> {info("family").father}</div>
              <div className="family-name"><span className="name-title">Mẹ.</span> {info("family").mother}</div>
            </div>
            <div className="family-names family-bride">
              <div className="family-title ff-parispro">{info2nd("family").title}</div>
              <div className="family-name"><span className="name-title">Bố.</span> {info2nd("family").father}</div>
              <div className="family-name"><span className="name-title">Mẹ.</span> {info2nd("family").mother}</div>
            </div>
          </div>

          <div className="announcement-title">
            <div className="ff-kedanty">Trân trọng báo tin</div>
            <div className="ff-roycou">{info("event")}</div>
            <div className="ff-kedanty">của</div>
          </div>
          


          <div className="announcement-time">
            <div className="ff-roycou">Hôn lễ được cử hành tại tư gia</div>
            <div className="ff-roycou">vào lúc 
              <span className="mx-1">{info("weddingTime").at}</span>
              -<span className="ms-1">{info("weddingTime").on}</span>
            </div>
          </div>
          <div className="announcement-date">
            <div className="date-item">{info("weddingTime").day}</div>
            <div className="date-item">{info("weddingTime").month}</div>
            <div className="date-item">{info("weddingTime").year}</div>
          </div>
          <div className="announcement-time-lunar">
            Nhằm ngày {info("weddingTime").lunar}
          </div>

          {/* Location */}

          {/* Save the date */}
        </div>
      </section>

      {/* Timeline */}
      <section className="scroll-section">
        <div className="wp-timeline ff-roycou-sef">
          <div className="timeline-title ff-roycou-scr">Lịch trình ngày cưới</div>

          {info("timeline").map((item, index) => (
            <div className="timeline-item" key={index}>
              <img className="item-img" src={item.img} />
              <div className="item-time">
                <div>{item.time}</div>
                <div>{item.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Album */}
      <section className="scroll-section">
        
      </section>

      {/* RSVP */}
      <section className="scroll-section">
        <div className="wp-rsvp">
          <input className="rsvp-input" placeholder="Họ và tên" />
          <select className="rsvp-input">
            <option value="" disabled selected>Bạn sẽ đến chứ?</option>
            <option value="yes">Tôi sẽ đến</option>
            <option value="no">Tôi xin lỗi không thể đến</option>
          </select>
          <select className="rsvp-input">
            <option value="" disabled selected>Bạn tham dự cùng ai?</option>
            {Array.from({length: 8}, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} người</option>
            ))}
          </select>
          <input className="rsvp-input" placeholder="Số điện thoại của bạn" />
          <textarea className="rsvp-input" placeholder="Lời nhắn tới cô dâu chú rể"></textarea>
          <button className="rsvp-submit-btn ff-montserr">Gửi lời nhắn & xác nhận</button>
        </div>
      </section>

      {/* Footer */}
      <section className="scroll-section">
        <div className="wp-footer">
          {/* Countdown */}

          {/* Thank you */}
          <div className="thankyou-wrapper">
            <img className="thankyou-img" src="/imgs/couple/footer/DSCF0117.JPG" />
            <div className="thankyou-text-1 ff-monalisa">
              <div>Cảm ơn bạn đã dành tình cảm cho chúng mình!</div>
              <div>Sự hiện hiện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.</div>
            </div>
            <div className="thankyou-text-2 ff-betrayos">Cảm ơn bạn đã ghé thăm!</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WeddingPage