import { Button, Drawer, Form, Input, InputNumber, Select, Space, Spin } from "antd";
import { CategoryType, GuestOfOp } from "../../../utils/Constants";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import GuestListService from "../../../services/guestListService";
import "../../../styles/pages/admin-page/guest-detail.css";


function GuestDetailModal(props) {
    const {visible, onClose, mode, guestId, messageApi} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [guestGroupOp, setGuestGroupOp] = useState([]);
    const [attachOp, setAttachOp] = useState([]);

    useEffect(() => {
        if (visible) {
           loadAll();
        }
    }, [visible]);

    async function loadAll() {
        setLoading(true);
        await reloadOptions();
        form.resetFields();

        if (mode === "edit") {
            await loadGuest();
        } else {
            form.setFieldsValue({
                relationship: 0,
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
        const groupRes = await CategoryService.getByType(CategoryType.GROUP);
        setGuestGroupOp(groupRes.map(i => {return {value: i.group_name, label: i.display_text}}));

        const attachRes = await CategoryService.getByType(CategoryType.ATTACH);
        setAttachOp(attachRes.map(i => {return {value: i.group_name, label: i.display_text}}));
    }

    async function handleSave(values) {
        if (mode === "add") {
            await GuestListService.insertGuest(values);
            messageApi.open({
                type: 'success',
                content: 'Thêm khách mời thành công',
            });
            onClose(true);
        } else if (mode === "edit") {
            const res = GuestListService.updateGuest(guestId, values);
            messageApi.open({
                type: 'success',
                content: 'Cập nhật khách mời thành công',
            });
            onClose(true);
        }
    }

    return (
        <>
            <Drawer
                title={mode === "add" ? "Thêm khách mời" : "Sửa khách mời"}
                placement="bottom"
                closable={{ placement: 'end' }}
                open={visible}
                onClose={onClose}
                size={800}
            >
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={handleSave}>
                        <Form.Item name="name" label="Tên khách mời" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                            <Input placeholder="Anh Chị Kiều Linh" allowClear/>
                        </Form.Item>
                        <div className="form-row">
                            <Form.Item name="attachment_invite" label="Mời cùng" className="form-item">
                                <Select 
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
                        <Space size={24}>
                            <Form.Item name="phone" label="Số điện thoại">
                                <Input placeholder="09..." type="number" allowClear/>
                            </Form.Item>
                            <Form.Item name="messenger_link" label="Facebook/Messenger">
                                <Input placeholder="https://..." allowClear/>
                            </Form.Item>
                        </Space>
                        <Space size={24}>
                            <Form.Item name="total_invite" label="Số người dự kiến">
                                <Input placeholder="1" type="number" />
                            </Form.Item>
                            <Form.Item name="note" label="Ghi chú">
                                <Input placeholder="Thêm ghi chú" allowClear/>
                            </Form.Item>
                        </Space>
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