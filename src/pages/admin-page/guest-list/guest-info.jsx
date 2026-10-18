import { CheckOutlined, DeleteOutlined, EditOutlined, ExclamationCircleTwoTone, LinkOutlined, MailOutlined, SafetyCertificateTwoTone, SendOutlined, TeamOutlined } from "@ant-design/icons";
import "../../../styles/pages/admin-page/guest-info.css";
import { Button, Tag, Tooltip } from "antd";
import GuestDetailModal from "./guest-detail-modal";
import { useState } from "react";
import GuestListService from "../../../services/guestListService";

function GuestInfo(props) {
    const { guestInfo, reload, messageApi } = props;
    const [openDetail, setOpenDetail] = useState(false);

    async function updateInvited() {
        const toggeleInvite = !guestInfo.is_invite ? 1 : 0;
        await GuestListService.updateInvited(guestInfo.id, toggeleInvite);
        reload();
    }

    return (
        <div className="guest-info-container">
            <div className="content-left">
                <Button icon={<LinkOutlined />} size="small" className="mb-1" >
                    Thiệp ĐT
                </Button>
                <Button icon={!guestInfo.is_invite ? <MailOutlined />: <CheckOutlined />} size="small" onClick={updateInvited}
                    color={guestInfo.is_invite ? "green" : "default"} variant="outlined"
                >
                    {guestInfo.is_invite ? "Đã mời" : "Phát thiệp"}
                </Button>
            </div>
            <div className="content-center">
                <div className="name mb-1">{guestInfo.name}
                    {guestInfo.attachment_invite
                    ? (<span> và {guestInfo.attachment_invite_txt}</span>)
                    : null}

                    {/* icon đã phản hồi */}
                    {guestInfo.is_attend
                    ? (<Tooltip title={"Tham dự: " + guestInfo.num_attend}>
                            <SafetyCertificateTwoTone twoToneColor="#52c41a" style={{fontSize: '16px'}} className="ms-1"/>
                            <Tag variant="filled" style={{color: '#49ad17'}} className="me-1"><TeamOutlined /> {guestInfo.num_attend}</Tag>
                        </Tooltip>)
                    : (
                        /* icon từ chối */
                        guestInfo.response_id
                        ? (<Tooltip title="Không tham dự được">
                                <ExclamationCircleTwoTone twoToneColor="#f32929" style={{fontSize: '16px'}} className="ms-1"/>
                            </Tooltip>)
                        : null
                    )}
                </div>
                <div className="more-info">
                    <Tag variant="filled" className="me-1"><TeamOutlined /> {guestInfo.total_invite}</Tag>
                    <Tag variant="filled" color="blue" className="me-1">{guestInfo.group_name_txt}</Tag>
                    {guestInfo.sub_group
                    ? (<Tag variant="outlined" className="me-1">{guestInfo.sub_group}</Tag>)
                    : null}
                    <Tag variant="filled" color={guestInfo.relationship === 2 ? 'magenta' : "geekblue"}  className="me-1">
                        {guestInfo.relationship === 2 ? "CD" : "CR"}
                    </Tag>
                </div>
            </div>
            <div className="content-right">
                <EditOutlined className="mb-3" onClick={() => setOpenDetail(true)}/>
                <DeleteOutlined/>
            </div>

            <GuestDetailModal
                visible={openDetail}
                mode="edit"
                messageApi={messageApi}
                guestId={guestInfo.id}
                onClose={(isReload) => {
                    setOpenDetail(false);
                    if (isReload) reload();
                }}
            />
        </div>
    )
}

export default GuestInfo;