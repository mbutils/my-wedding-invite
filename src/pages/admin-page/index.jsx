import { useState } from "react";
import GuestList from "./guest-list";
import ExpenseList from "./expense-list";
import { Segmented } from "antd";
import "../../styles/pages/admin-page/index.css";
import { DollarOutlined, TeamOutlined } from "@ant-design/icons";

function AdminPage() {
    const tabs = [
        { value: 'guest', label: 'Khách mời', icon: <TeamOutlined />, component: <GuestList/> },
        { value: 'expense', label: 'Chi tiêu', icon: <DollarOutlined />, component: <ExpenseList/> },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    function tabRender() {
        const result = tabs.map((t) => {
            return {
                label: (
                    <div className="tab-item">
                        <div className="tab-icon">{t.icon}</div>
                        <div className="tab-name">{t.label}</div>
                    </div>
                ),
                value: t.value,
            }
        });
        return result;
    }

    function renderContent() {
        const tab = tabs.find(t => t.value === activeTab);
        return tab.component;
    }

    return (
        <div className="admin-page">
            <div className="title">
                <Segmented
                    options={tabRender()}
                    value={activeTab}
                    onChange={setActiveTab}
                    block
                />
            </div>

            <div className="page-content">
                {renderContent()}
            </div>
        </div>
    )
}

export default AdminPage;