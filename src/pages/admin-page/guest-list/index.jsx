import { Button, Input, message, Progress, Segmented, Spin } from "antd";
import "../../../styles/pages/admin-page/guest-list.css";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import GuestListService from "../../../services/guestListService";
import GuestInfo from "./guest-info";
import GuestDetailModal from "./guest-detail-modal";

function GuestList() {
    const [loading, setLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [searchName, setSearchName] = useState(null);
    const [overviewData, setOverviewData] = useState({});
    const [guestData, setGuestData] = useState({});
    
    const [mode, setMode] = useState("add");
    const [guestEdit, setGuestEdit] = useState(null);
    const [searchInfo, setSearchInfo] = useState({
        name: null,
        relationship: 0,
        isInvite: -1,
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
        { value: 0, label: 'Chưa gửi' },
        { value: 1, label: 'Đã gửi' },
    ];

    useEffect(() => {
        reload();
    }, [searchInfo]);

    async function reload() {
        setLoading(true);
        const res = await GuestListService.searchGuests(searchInfo);
        console.log("search guest",res);
        setLoading(false);
        setGuestData({
            ...res,
            totalPage: Math.ceil(res.total_record/searchInfo.pageSize),
        });

        const resOvv = await GuestListService.guestOverview();
        setOverviewData(resOvv);
    }

    function changeFilterMenu(activeKey) {
        setSearchInfo({
            ...searchInfo,
            pageIndex: 1,
            relationship: activeKey,
        });
    }
    function changeFilterStatus(activeKey) {
        setSearchInfo({
            ...searchInfo,
            pageIndex: 1,
            isInvite: activeKey,
        });
    }

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
            <div className="guest-list-container">
                <div className="guest-overview">
                    <div className="title mb-2">
                        Danh sách khách mời
                    </div>
                    <div className="total-attend mb-2">
                        Tổng danh sách: <span className="attend-people">{overviewData.ppl_card}</span> người / <span className="invites">{overviewData.total_card}</span> thiệp
                    </div>
                    <div className="two-sides">
                        <div className="bride">
                            <div className="invites">{overviewData.of_bride}</div>
                            <div className="name">NHÀ GÁI</div>
                        </div>
                        <div className="groom">
                            <div className="invites">{overviewData.of_groom}</div>
                            <div className="name">NHÀ TRAI</div>
                        </div>
                    </div>
                    <div className="progress-bar-ovv mb-2">
                        <div className="progress-item">
                            <div className="name">
                                <div>Phát thiệp</div>
                                <div>{overviewData.card_invited} / {overviewData.total_card}</div>
                            </div>
                            <Progress percent={(overviewData.card_invited / overviewData.total_card) * 100} strokeColor="#abdbff" showInfo={false}/>
                        </div>
                        <div className="progress-item">
                            <div className="name">
                                <div>Tỉ lệ tham dự</div>
                                <div>{Math.round((overviewData.ppl_attend / overviewData.ppl_card) * 100)}% ({overviewData.ppl_attend} người)</div>
                            </div>
                            <Progress percent={(overviewData.ppl_attend / overviewData.ppl_card) * 100} strokeColor="#2f3438" showInfo={false}/>
                        </div>
                        <div className="progress-item">
                            <div className="name">
                                <div>Xác nhận tham dự (thiệp điện tử)</div>
                                <div>{overviewData.card_attend} / {overviewData.total_card}</div>
                            </div>
                            <Progress percent={(overviewData.card_attend / overviewData.total_card) * 100} strokeColor="#7ecf8b" showInfo={false}/>
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
                        placeholder="Tên khách mời"
                        allowClear
                        size="middle"
                        className="me-2"
                        onChange={onSearch}
                    />
                    <Button type="primary" icon={<PlusOutlined />} size="middle"
                        onClick={() => {setOpenDetail(true)}}
                    >
                        Thêm khách
                    </Button>
                </div>
                <div className="menu-filter mt-2 mb-2">
                    <Segmented
                        options={statusFilterOp}
                        onChange={changeFilterStatus}
                    />
                </div>
                <div className="guest-list mt-3">
                    {guestData?.data?.map((g, ind) => (
                        <GuestInfo guestInfo={g} reload={reload}
                            key={ind}
                            messageApi={messageApi}
                            editModal={() => {
                                setMode("edit");
                                setGuestEdit(g);
                                setOpenDetail(true);
                            }}
                        />
                    ))} 
                </div>
                <div className="pagination">
                    <Button icon={<LeftOutlined />} disabled={searchInfo.pageIndex === 1} onClick={pagePrev}/>
                    <div className="mx-2 pagi-center">
                        <div className="page-ind">{searchInfo.pageIndex}/{guestData?.totalPage}</div>
                        <div className="total-rec">{guestData?.total_record} bản ghi</div>
                    </div>
                    <Button icon={<RightOutlined />} disabled={guestData && searchInfo.pageIndex >= guestData.totalPage} onClick={pageNext}/>
                </div>
            </div>
        </Spin>

        <GuestDetailModal
            visible={openDetail}
            mode={mode}
            messageApi={messageApi}
            guestId={guestEdit?.id}
            onClose={(isReload) => {
                setOpenDetail(false);
                if (isReload) reload();
            }}
        />
        </>
    )
}

export default GuestList;