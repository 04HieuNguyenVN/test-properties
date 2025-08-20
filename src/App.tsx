// Simplified main App component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Card, Tabs } from "antd";

// Import styles
import "./styles/dashboard.css";
import "./styles/chart.css";
import "./styles/field-selector.css";
import "./styles/properties-panel.css";
import "./styles/data-config.css";
import "./styles/format-config.css";
import "./styles/general-config.css";
import "./styles/sections.css";
import "./styles/components.css";
import "./styles/overrides.css";
import "./styles/custom-color-picker.css";
import "./styles/data-display.css";

import ChartRenderer from "./components/ChartRenderer";
import { DataTab } from "./components/Tabs/DataTab";
import { FormatConfigTab } from "./components/Tabs/FormatVisualTab";
import { GeneralConfigTab as FormatGeneralTab } from "./components/Tabs/FormatGeneralTab";
import { RootState } from "./store/store";
import { setActiveTab, setActiveSubTab } from "./store/chartSlice";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { chartType, activeTab, activeSubTab, chartConfigs, data } = useSelector(
    (state: RootState) => state.chart
  );
  const currentConfig = chartConfigs[chartType];

  const handleTabChange = (key: string) => {
    dispatch(setActiveTab(key as "data" | "format"));
  };

  const handleSubTabChange = (key: string) => {
    dispatch(setActiveSubTab(key as "Visual" | "General"));
  };

  return (
    <Layout className="dashboard">
      <Content className="dashboard-content">
        <Card className="chart-card">
          <ChartRenderer chartType={chartType} config={currentConfig.format} />
        </Card>
      </Content>

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
    </Layout>
  );
};

export default App;

