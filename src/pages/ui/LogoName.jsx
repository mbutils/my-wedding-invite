import "../../styles/pages/ui/logoName.css"

export default function LogoName() {
    return (
        <div className="logo-name">
            <img className="logo-frame-img" src="/imgs/ui/logo-frame.png" />
            <img className="logo-frame-img" src="/imgs/ui/family-frame.png" />
            <div className="ele lg-groom ff-camaro">H</div>
            <div className="ele lg-bride ff-camaro">L</div>
            <div className="ele lg-and ff-camaro">&</div>
        </div>
    )
}