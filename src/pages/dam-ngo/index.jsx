import '../../styles/pages/dam-ngo/index.css';

function DamNgo() {
  return (
    <div className="damngo-page">
        <div className="damngo-content">
            <img src="/imgs/damngo/pink_watercolor_texture.jpeg" className='content-background'/>

            <div className="cherry-blossom-left">
                <div className="cherry-blossom-1">
                    <img src="/imgs/damngo/cherry_blossom_1.png" />
                </div>
                <div className="cherry-blossom-2">
                    <img src="/imgs/damngo/cherry_blossom_5.png" />
                </div>
            </div>
            <div className="cherry-blossom-right">
                <div className="cherry-blossom-3">
                    <img src="/imgs/damngo/cherry_blossom_2.png" />
                </div>
                <div className="cherry-blossom-4">
                    <img src="/imgs/damngo/cherry_blossom_3.png" />
                </div>
                <div className="cherry-blossom-5">
                    <img src="/imgs/damngo/cherry_blossom_4.png" />
                </div>
                <div className="cherry-blossom-6">
                    <img src="/imgs/damngo/cherry_blossom_6.png" />
                </div>
            </div>
            <div className="main-content">
                <div className="double-happy ff-chinesedouble">
                    囍
                    <div className="wedding-rings">
                        <img src="/imgs/damngo/rings.png" />
                    </div>
                </div>
                <div className="title ff-roycou-sef">
                    LỄ DẠM NGÕ
                </div>
                <div className="name name--groom ff-fzthemoritza">
                    Q5uốc8 Huy5
                </div>
                <div className="name name--bride ff-fzthemoritza">
                    P2han5 L2an6
                </div>
                <div className='thank ff-brunet'>
                    <div>Chúng con xin cảm ơn hai bên gia đình</div>
                    <div>đã yêu thương và vun đắp cho chúng con !</div>
                </div>
                <div className='date-area'>
                    <div className='solar'>
                        <div className='month ff-kedanty'>THÁNG 10</div>
                        <div className='date ff-roycou'>25</div>
                        <div className='year ff-kedanty'>2026</div>
                    </div>
                    <div className='lunar'>
                        <div className='left ff-roycou-sef'>CHỦ NHẬT</div>
                        <div className='right ff-roycou-sef'>16.09 BÍNH NGỌ</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DamNgo;