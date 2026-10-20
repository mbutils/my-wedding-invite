import { Button, Drawer, Form, Input, Select, Space, Spin, Tooltip } from "antd";
import { CategoryType, GuestOfOp } from "../../../utils/Constants";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import GuestListService from "../../../services/guestListService";
import "../../../styles/pages/admin-page/guest-detail.css";
import { CopyOutlined, ExportOutlined, FacebookOutlined } from "@ant-design/icons";


function GuestDetailModal(props) {
    const {visible, onClose, mode, guestId, messageApi} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [guestGroupOp, setGuestGroupOp] = useState([]);
    const [attachOp, setAttachOp] = useState([]);

    useEffect(() => {
        reloadOptions();
    }, []);

    useEffect(() => {
        if (visible) {
           loadAll();
        }
    }, [visible]);

    async function loadAll() {
        setLoading(true);
        form.resetFields();

        if (mode === "edit") {
            await loadGuest();
        } else {
            form.setFieldsValue({
                relationship: 1,
                group_name: 'FRIEND',
                total_invite: 1,
            });
        }
        setLoading(false);
    }

    async function loadGuest() {
        const guestInfo = await GuestListService.getById(guestId);
        form.setFieldsValue(guestInfo);
    }

    async function reloadOptions() {
        const groupRes = await CategoryService.getByType(CategoryType.RELATIONSHIP);
        setGuestGroupOp(groupRes.map(i => {return {value: i.group_name, label: i.display_text}}));

        const attachRes = await CategoryService.getByType(CategoryType.ATTACH);
        setAttachOp(attachRes.map(i => {return {value: i.group_name, label: i.display_text}}));
    }

    async function handleSave(values) {
        setLoading(true);
        if (mode === "add") {
            await GuestListService.insertGuest(values);
            onClose(true);
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Thêm khách mời thành công',
            });
        } else if (mode === "edit") {
            await GuestListService.updateGuest(guestId, values);
            onClose(true);
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Cập nhật khách mời thành công',
            });
        }
    }

    async function copyPhone() {
        if (!form.getFieldValue('phone')) {
            messageApi.open({
                type: 'warning',
                content: 'Chưa nhập số điện thoại',
            });
            return;
        }
        await navigator.clipboard.writeText(form.getFieldValue('phone'));
        messageApi.open({
            type: 'success',
            content: 'Đã copy số điện thoại',
        });
    }
    function openLink() {
        if (!form.getFieldValue('messenger_link')) {
            messageApi.open({
                type: 'warning',
                content: 'Chưa nhập link',
            });
            return;
        }
        window.open(
            form.getFieldValue('messenger_link'),
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <>
            <Drawer
                title={mode === "add" ? "Thêm khách mời" : "Sửa khách mời"}
                placement="bottom"
                closable={{ placement: 'end' }}
                open={visible}
                onClose={onClose}
                size={700}
            >
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={handleSave}>
                        <Form.Item name="name" label="Tên khách mời" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                            <Input placeholder="Anh Chị Kiều Linh" allowClear/>
                        </Form.Item>
                        <div className="form-row">
                            <Form.Item name="attachment_invite" label="Mời cùng" className="form-item">
                                <Select allowClear
                                    options={attachOp}
                                />
                            </Form.Item>
                            <Form.Item name="relationship" label="Bạn của" className="form-item">
                                <Select 
                                    options={GuestOfOp}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-row">
                            <Form.Item name="group_name" label="Quan hệ" className="form-item">
                                <Select className="form-item-input"
                                    options={guestGroupOp}
                                />
                            </Form.Item>
                            <Form.Item name="sub_group" label="Nhóm khách mời" className="form-item">
                                <Input placeholder="Viettelpay" className="form-item-input" allowClear/>
                            </Form.Item>
                        </div>
                        <div className="form-row">
                                {/* <Space.Compact> */}
                            <Form.Item name="phone" label="Số điện thoại" className="form-item">
                                <Input placeholder="09..." type="number" allowClear/>
                            </Form.Item>
                                    {/* <Tooltip title="Copy SĐT">
                                        <Button type="default" icon={<CopyOutlined />} onClick={copyPhone}></Button>
                                    </Tooltip>
                                </Space.Compact> */}
                            <Form.Item name="messenger_link" label="Facebook/Messenger" className="form-item">
                                {/* <Space.Compact> */}
                                    <Input placeholder="https://..." allowClear/>
                                    {/* <Tooltip title="Mở link">
                                        <Button type="default" icon={<FacebookOutlined />} onClick={openLink}></Button>
                                    </Tooltip>
                                </Space.Compact> */}
                            </Form.Item>
                        </div>
                        <div className="form-row">
                            <Form.Item name="total_invite" label="Số người dự kiến" className="form-item">
                                <Input placeholder="1" type="number" />
                            </Form.Item>
                            <Form.Item name="note" label="Ghi chú" className="form-item">
                                <Input placeholder="Thêm ghi chú" allowClear/>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className="form-row">
                        <Button type="primary" onClick={() => form.submit()} className="form-btn-row">Save</Button>
                    </div>
                </Spin>
            </Drawer>
        </>
    );
}

export default GuestDetailModal;