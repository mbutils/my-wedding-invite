import { Button, Input, message, Progress, Segmented, Spin } from "antd";
import { useEffect, useState } from "react";
import ExpenseListService from "../../../services/expenseListService";
import "../../../styles/pages/admin-page/expense-list.css";
import { formatVND } from "../../../utils/NumberUtils";
import ExpenseInfo from "./expense-info";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import ExpenseDetailModal from "./expense-detail-modal";

function ExpenseList() {
    const [loading, setLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [searchName, setSearchName] = useState(null);
    const [overviewData, setOverviewData] = useState({});
    const [expenseData, setExpenseData] = useState({});
    const [mode, setMode] = useState("add");
    const [expenseEdit, setExpenseEdit] = useState(null);
    const [searchInfo, setSearchInfo] = useState({
        name: null,
        isPaid: -1,
        pageSize: 10,
        pageIndex: 1,
    });
    const [messageApi, contextHolder] = message.useMessage();

    const menuFilterOp = [
        { value: 0, label: 'Tất cả' },
        { value: 2, label: 'Nhà gái' },
        { value: 1, label: 'Nhà trai' },
    ];
    const statusFilterOp = [
        { value: -1, label: 'Tất cả' },
        { value: 0, label: 'Chưa trả' },
        { value: 1, label: 'Đã trả' },
        { value: 2, label: 'Đã đặt' },
        { value: 3, label: 'Kế hoạch' },
    ];

    useEffect(() => {
        reload();
    }, [searchInfo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchInfo({
                ...searchInfo,
                pageIndex: 1,
                name: searchName
            });
        }, 300); // delay
        return () => clearTimeout(timer);
    }, [searchName]);

    async function reload() {
        setLoading(true);
        console.log("search exp",searchInfo);
        const dataRes = await ExpenseListService.searchExpenses(searchInfo);
        setLoading(false);
        setExpenseData({
            ...dataRes,
            totalPage: Math.ceil(dataRes.total_record/searchInfo.pageSize),
        });

        const ovvRes = await ExpenseListService.expenseOverview();
        setOverviewData(ovvRes);
    }

    function changeFilterMenu(activeKey) {
        setSearchInfo({
            ...searchInfo,
            pageIndex: 1,
            expenseBy: activeKey,
        });
    }
    function changeFilterStatus(activeKey) {
        setSearchInfo({
            ...searchInfo,
            pageIndex: 1,
            isPaid: activeKey,
        });
    }

    function onSearch(e) {
        setSearchName(e.target.value);
    }

    function pageNext() {
        setSearchInfo({
            ...searchInfo,
            pageIndex: searchInfo.pageIndex + 1,
        });
    }
    function pagePrev() {
        setSearchInfo({
            ...searchInfo,
            pageIndex: searchInfo.pageIndex - 1,
        });
    }

    return (
        <>
        {contextHolder}
        <Spin spinning={loading}>
            <div className="expense-list-container">
                <div className="expense-overview">
                    <div className="title">
                        Tổng chi tiêu
                    </div>
                    <div className="total-amount mb-2">
                        Tổng số tiền: <span className="amount">{formatVND(overviewData.total_amount)}</span>
                    </div>
                    <div className="two-sides">
                        <div className="bride">
                            <div className="amounts">{formatVND(overviewData.bride_amount || 0)}</div>
                            <div className="name">NHÀ GÁI</div>
                        </div>
                        <div className="groom">
                            <div className="amounts">{formatVND(overviewData.groom_amount || 0)}</div>
                            <div className="name">NHÀ TRAI</div>
                        </div>
                    </div>
                    <div className="progress-bar-ovv mb-2">
                        <div className="progress-item">
                            <div className="name">
                                <div>Đã thanh toán (Nhà gái)</div>
                                <div>{formatVND(overviewData.bride_paid)}</div>
                            </div>
                            <Progress percent={(overviewData.bride_paid / overviewData.bride_amount) * 100} strokeColor="#ffabea" showInfo={false}/>
                        </div>
                        <div className="progress-item">
                            <div className="name">
                                <div>Đã thanh toán (Nhà trai)</div>
                                <div>{formatVND(overviewData.groom_paid)}</div>
                            </div>
                            <Progress percent={(overviewData.groom_paid / overviewData.groom_amount) * 100} strokeColor="#7ecf8b" showInfo={false}/>
                        </div>
                        <div className="progress-item">
                            <div className="name">
                                <div>Còn lại</div>
                                <div>{formatVND(overviewData.total_amount - overviewData.paid_amount)}</div>
                            </div>
                            <Progress percent={((overviewData.total_amount - overviewData.paid_amount) / overviewData.total_amount) * 100} strokeColor="#2f3438" showInfo={false}/>
                        </div>
                    </div>
                </div>
                <div className="menu-filter mt-3 mb-2">
                    <Segmented
                        options={menuFilterOp}
                        onChange={changeFilterMenu}
                    />
                </div>
                <div className="search-bar">
                    <Input
                        placeholder="Tên chi tiêu"
                        allowClear
                        size="middle"
                        className="me-2"
                        onChange={onSearch}
                    />
                    <Button type="primary" icon={<PlusOutlined />} size="middle"
                        onClick={() => {
                            setMode("add");
                            setOpenDetail(true);
                        }}
                    >
                        Thêm chi tiêu
                    </Button>
                </div>
                <div className="menu-filter mt-2">
                    <Segmented
                        options={statusFilterOp}
                        onChange={changeFilterStatus}
                    />
                </div>
                <div className="expense-list mt-3">
                    {expenseData?.data?.map((g, ind) => (
                        <ExpenseInfo expenseInfo={g} reload={reload}
                            key={ind}
                            editModal={() => {
                                setMode("edit");
                                setExpenseEdit(g);
                                setOpenDetail(true);
                            }}
                        />
                    ))} 
                </div>
                <div className="pagination">
                    <Button icon={<LeftOutlined />} disabled={searchInfo.pageIndex === 1} onClick={pagePrev}/>
                    <div className="mx-2 pagi-center">
                        <div className="page-ind">{searchInfo.pageIndex}/{expenseData?.totalPage}</div>
                        <div className="total-rec">{expenseData?.total_record} bản ghi</div>
                    </div>
                    <Button icon={<RightOutlined />} disabled={expenseData && searchInfo.pageIndex >= expenseData.totalPage} onClick={pageNext}/>
                </div>
            </div>
        </Spin>

        <ExpenseDetailModal
            visible={openDetail}
            mode={mode}
            messageApi={messageApi}
            expenseId={expenseEdit?.id}
            onClose={(isReload) => {
                setOpenDetail(false);
                if (isReload) reload();
            }}
        />
        </>
    )
}

export default ExpenseList;