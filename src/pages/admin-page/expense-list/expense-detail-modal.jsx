import { Button, DatePicker, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { CategoryType, GuestOfOp } from "../../../utils/Constants";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import "../../../styles/pages/admin-page/guest-detail.css";
import ExpenseListService from "../../../services/expenseListService";
import "../../../styles/pages/admin-page/guest-detail.css";
import dayjs from "dayjs";


function ExpenseDetailModal(props) {
    const {visible, onClose, mode, expenseId, messageApi} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categoryOp, setCategoryOp] = useState([]);
    const [statusOp, setStatusOp] = useState([]);

    useEffect(() => {
        reloadOptions();
    }, []);

    useEffect(() => {
        if (visible) {
           loadAll();
        }
    }, [visible, mode]);

    async function loadAll() {
        setLoading(true);
        form.resetFields();

        if (mode === "edit") {
            await loadExpense();
        } else {
            form.setFieldsValue({
                status: 'PLANNED',
                category: 'WEDDING',
                expense_by: 1,
            });
        }
        setLoading(false);
    }

    async function loadExpense() {
        const expenseInfo = await ExpenseListService.getById(expenseId);
        console.log("expense",expenseInfo);
        form.setFieldsValue(expenseInfo);
    }

    async function reloadOptions() {
        const categoryRes = await CategoryService.getByType(CategoryType.EXPENSE);
        setCategoryOp(categoryRes.map(i => {return {value: i.group_name, label: i.display_text}}));

        const statusRes = await CategoryService.getByType(CategoryType.EXPENSE_STATE);
        setStatusOp(statusRes.map(i => {return {value: i.group_name, label: i.display_text}}));
    }

    async function handleSave(values) {
        setLoading(true);
        if (mode === "add") {
            await ExpenseListService.insertExpense(values);
            onClose(true);
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Thêm chi tiêu thành công',
            });
        } else if (mode === "edit") {
            await ExpenseListService.updateExpense(expenseId, values);
            onClose(true);
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Cập nhật chi tiêu thành công',
            });
        }
    }

    return (
        <>
            <Drawer
                title={mode === "add" ? "Thêm chi tiêu" : "Sửa chi tiêu"}
                placement="bottom"
                closable={{ placement: 'end' }}
                open={visible}
                onClose={onClose}
                size={700}
            >
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={handleSave}>
                        <Form.Item name="name" label="Tên chi tiêu" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                            <Input placeholder="Rạp cưới" allowClear/>
                        </Form.Item>
                        <div className="form-row">
                            <Form.Item name="category" label="Loại chi tiêu" className="form-item">
                                <Select 
                                    options={categoryOp}
                                />
                            </Form.Item>
                            <Form.Item name="amount" label="Số tiền" className="form-item">
                                <Input placeholder="0" type="number" allowClear/>
                            </Form.Item>
                        </div>
                        <div className="form-row">
                            <Form.Item name="status" label="Trạng thái" className="form-item">
                                <Select className="form-item-input"
                                    options={statusOp}
                                />
                            </Form.Item>
                            <Form.Item name="expense_date" label="Ngày thanh toán" className="form-item"
                                getValueFromEvent={(date) => (date ? date.format('YYYY-MM-DD') : null)}
                                getValueProps={(value) => ({
                                    value: value ? dayjs(value) : undefined,
                                })}
                            >
                                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }}/>
                            </Form.Item>
                        </div>
                        <div className="form-row">
                            <Form.Item name="expense_by" label="Chi tiêu bởi" className="form-item">
                                <Select className="form-item-input"
                                    options={GuestOfOp}
                                />
                            </Form.Item>
                            <Form.Item name="note" label="Ghi chú" className="form-item">
                                <Input placeholder="Thêm ghi chú" className="form-item-input" allowClear/>
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

export default ExpenseDetailModal;