import React from "react";
import { Layout, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DataTab } from "./Tabs/DataTab";
import { FormatConfigTab } from "./Tabs/FormatVisualTab";
import { GeneralConfigTab as FormatGeneralTab } from "./Tabs/FormatGeneralTab";
import { RootState } from "../store/store";
import { setActiveTab, setActiveSubTab } from "../store/chartSlice";

const { Sider } = Layout;
const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { chartType, activeTab, activeSubTab, data } = useSelector(
    (state: RootState) => state.chart
  );

  const handleTabChange = (key: string) =>
    dispatch(setActiveTab(key as "data" | "format"));

  const handleSubTabChange = (key: string) =>
    dispatch(setActiveSubTab(key as "Visual" | "General"));

  return (
    <Sider width={360} className="dashboard-sider">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Data" key="data">
          <DataTab chartType={chartType} rawData={data} data={data} />
        </TabPane>
        <TabPane tab="Format" key="format">
          <Tabs activeKey={activeSubTab} onChange={handleSubTabChange}>
            <TabPane tab="Visual" key="Visual">
              <FormatConfigTab />
            </TabPane>
            <TabPane tab="General" key="General">
              <FormatGeneralTab />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </Sider>
  );
};

export default Sidebar;
