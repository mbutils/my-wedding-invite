import { CheckOutlined, DeleteOutlined, DollarOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import ExpenseListService from "../../../services/expenseListService";
import "../../../styles/pages/admin-page/expense-info.css";
import { formatVND } from "../../../utils/NumberUtils";
import dayjs from "dayjs";

function ExpenseInfo(props) {
    const { expenseInfo, reload, editModal } = props;

    const statusColor = {
        PAIDFULL: 'green',
        PAIDAPART: 'orange',
        BOOKED: 'blue',
        PLANNED: 'volcano',
    }

    async function updatePaid() {
        if (expenseInfo.is_paid) return;
        await ExpenseListService.updatePaid(expenseInfo.id, {
            status: 'PAIDFULL',
            expense_date: dayjs().format('YYYY-MM-DD'),
        });
        reload();
    }

    return (
        <div className="expense-info">
            <div className="content-left">
                <Button icon={!expenseInfo.is_paid ? <DollarOutlined />: <CheckOutlined />} size="small" onClick={updatePaid}
                    color={expenseInfo.is_paid ? "green" : "default"} variant="outlined"
                >
                    {expenseInfo.is_paid ? "Đã trả" : "Trả"}
                </Button>
            </div>
            <div className="content-center" onClick={editModal}>
                <div className="name">
                    {expenseInfo.name}
                </div>
                <div className="more-info mt-1">
                    <div className="amount me-2">{formatVND(expenseInfo.amount)}</div>
                    <Tag variant="filled" color="purple" className="me-1">{expenseInfo.category_txt}</Tag>
                    <Tag variant="filled" color={expenseInfo.expense_by === 2 ? 'magenta' : "geekblue"} >
                        {expenseInfo.expense_by === 2 ? "CD" : "CR"}
                    </Tag>
                </div>
                <div className="status mt-1">
                    <Tag variant="outlined" color={statusColor[expenseInfo.status] || 'blue'}>{expenseInfo.status_txt}</Tag>
                    {expenseInfo.is_paid
                    ? (<Tag variant="outlined" className="ms-1">{expenseInfo.expense_date}</Tag>)
                    : null}
                </div>
            </div>
            <div className="content-right">
                <EditOutlined className="mb-3" onClick={editModal}/>
                <DeleteOutlined/>
            </div>
        </div>
    )
}

export default ExpenseInfo;