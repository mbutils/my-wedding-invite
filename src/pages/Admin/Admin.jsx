import { useEffect, useState } from "react"
import GuestSheetService from "../../services/GuestSheetService";
import { Form, Table, Tag, Button, Tooltip, Typography } from 'antd';
import { ReloadOutlined, SendOutlined, CheckOutlined, CloseOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import "../../styles/pages/Admin.css";
import { isMobile } from 'react-device-detect';
import EditableCell from "./EditableCell";

export default function Admin() {
    const [originData, setOriginData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        getDataTest();
    }, [])

    async function getDataTest() {
        setLoading(true);
        const res = await GuestSheetService.getData();
        setLoading(false);
        var newData = res?.data ? res.data.filter(d => d['Tên'] || d["Ghi chú"] || d["Ghi chú 2"]) : [];
        setOriginData(newData);
        setData(newData);
    }

    const mapColorTag = {
        "Chú rể": "cyan",
        "Cô dâu": "magenta",
        "Chưa gửi": "default",
        "Đã gửi": "success",
        "Có": "green",
    }

    const opGuestOf = ["Chú rể", "Cô dâu"];
    const opComeWith = ["Gia đình","Người thương","Các cháu"];
    const opStatus = ["Chưa gửi","Đã gửi"];

    const columns = [
        {
            title: "ID",
            dataIndex: "rowIndex",
            key: "rowIndex",
            width: isMobile ? "30px" : "40px",
            align: "center",
        },
        {
            dataIndex: "Action",
            width: isMobile ? '20px' : '50px',
            fixed: 'start',
            render: (_, row) => {
                const editable = isEditing(row);
                    return editable ? (
                    <span>
                        <Tooltip title="Lưu" placement="topLeft">
                            <CheckOutlined className="me-1" style={{color: '#87d068'}} onClick={() => save(row.rowIndex)}/>
                        </Tooltip>
                        <Tooltip title="Hủy" placement="topLeft">
                            <CloseOutlined style={{color: '#f50'}} onClick={() => cancel(row.rowIndex)}/>
                        </Tooltip>
                    </span>
                    ) : (
                        <Tooltip title="Sửa" placement="topLeft">
                            <EditOutlined style={{color: '#108ee9'}} onClick={() => edit(row)}/>
                        </Tooltip>
                    );
            }
        },
        {
            title: "Tên",
            dataIndex: "Tên",
            key: "Tên",
            width: isMobile ? '80px' : '150px',
            fixed: 'start',
            editable: true,
            render: (_,row) => (
                <div className="d-flex aligh-item-center">
                    <Tooltip title="Gửi">
                        <Button className="me-1" color="red" variant="outlined" size="small" icon={<SendOutlined />}></Button>
                    </Tooltip>
                    <p className="m-0">{row["Tên"]}</p>
                </div>
            )
        },
        {
            title: "Ghi chú",
            dataIndex: "Ghi chú",
            key: "Ghi chú",
            width: '100px',
            ellipsis: true,
            editable: true,
        },
        {
            title: "Ghi chú 2",
            dataIndex: "Ghi chú 2",
            key: "Ghi chú 2",
            width: '100px',
            ellipsis: true,
            editable: true,
        },
        {
            title: "Mời cùng với",
            dataIndex: "Mời cùng với",
            key: "Mời cùng với",
            width: '100px',
            ellipsis: true,
            editable: true,
            inputType: "select",
            inputOptions: opComeWith,
        },
        {
            title: "Khách của CD/CR",
            dataIndex: "Khách của CD/CR",
            key: "Khách của CD/CR",
            width: "100px",
            editable: true,
            inputType: "select",
            inputOptions: opGuestOf,
            render: (_, row) => {
                let c = 'Khách của CD/CR';
                return row[c] ? 
                    <Tag color={mapColorTag[row[c]]} key={row[c]}
                        variant="outlined"
                    >{row[c]}</Tag>
                : null
            }
        },
        {
            title: "Trạng thái gửi thiệp",
            dataIndex: "Trạng thái gửi thiệp",
            key: "Trạng thái gửi thiệp",
            width: "100px",
            editable: true,
            inputType: "select",
            inputOptions: opStatus,
            render: (_, row) => {
                let c = 'Trạng thái gửi thiệp';
                return row[c] ? 
                    <Tag color={mapColorTag[row[c]]} key={row[c]}
                        variant="outlined"
                    >{row[c]}</Tag>
                : null
            }
        },
        {
            title: "Link fb",
            dataIndex: "Link fb",
            key: "Link fb",
            width: "80px",
            ellipsis: true,
            editable: true,
            render: (_,row) => <a href={row["Link fb"]} target="_blank">{row["Link fb"]}</a>
        },
        {
            title: "Link zalo",
            dataIndex: "Link zalo",
            key: "Link zalo",
            width: "80px",
            ellipsis: true,
            editable: true,
            render: (_,row) => <a href={row["Link zalo"]} target="_blank">{row["Link zalo"]}</a>
        },
        {
            title: "Số điện thoại",
            dataIndex: "Số điện thoại",
            key: "Số điện thoại",
            width: "80px",
            ellipsis: true,
            editable: true,
        },
        {
            title: "Có tham dự",
            dataIndex: "Có tham dự",
            key: "Có tham dự",
            width: "80px",
            render: (_, row) => {
                let c = "Có tham dự";
                return row[c] ? 
                    <Tag color={mapColorTag[row[c]] || 'default'} key={row[c]}
                        variant="outlined"
                    >{row[c]}</Tag>
                : null
            }
        },
        {
            title: "Số lượng người",
            dataIndex: "Số lượng người",
            key: "Số lượng người",
            width: "80px",
        },
        {
            title: "Lời chúc",
            dataIndex: "Lời chúc",
            key: "Lời chúc",
            width: "100px",
            ellipsis: true,
        },
    ];

    const isEditing = record => record.rowIndex === editingKey;

    const edit = record => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.rowIndex);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async key => {
        try {
            const row = await form.validateFields();
            // lưu vào sheet
            GuestSheetService.updateRow(key, row);
            
            const newData = [...data];
            const index = newData.findIndex(item => key === item.rowIndex);
            if (index > -1) {
                const item = newData[index];
                    newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.inputType || 'text',
                inputOptions: col.inputType === "select" ? col.inputOptions?.map(o => ({label: o, value: o})) : [],
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className="admin-page-wrapper">
            <div className="admin-page">
                <div>Danh sách khách mời</div>
                <div className="table-header">
                    <div className="left">
                        <a href={import.meta.env.VITE_GUEST_SHEET_LINK} target="_blank">
                            <Button color="primary" variant="outlined" icon={<TableOutlined />}>Mở trong sheet</Button>
                        </a>
                    </div>
                    <div className="right">
                        <Button color="primary" variant="solid" icon={<ReloadOutlined />} onClick={getDataTest}>Tải lại</Button>
                    </div>
                </div>
                <Form form={form} component={false}>
                    <Table className="admin-table"
                        components={{
                            body: { cell: EditableCell },
                        }}
                        columns={mergedColumns}
                        sticky={{ offsetHeader: 0 }}
                        dataSource={data}
                        loading={loading}
                        size="middle"
                        scroll={{ x: isMobile ? '2000px' : '' }}
                        pagination={{
                            size: "default",
                            pageSize: 15,
                        }}
                    />
                </Form>
            </div>
        </div>
    )
}