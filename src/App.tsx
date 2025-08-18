import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Card, Tabs } from "antd";
import { RootState } from "./store/store";
import {
  setChartType,
  setActiveTab,
  setActiveSubTab,
  ChartState,
} from "./store/chartSlice";

// Components
import ChartRenderer from "./components/Charts/ChartRenderer";
import ChartToolbar from "./components/Charts/ChartToolbar";
import DataConfigTab from "./components/Tabs/DataConfigTab";
import LegendSection from "./components/ConfigSections/LegendSection";

// Types
import { ChartType } from "./types/interfaces";

import "./App.css";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const PowerBIDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { chartType, activeTab, activeSubTab, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;

  const currentConfig = chartConfigs[chartType];

  const handleChartTypeChange = (type: ChartType) => {
    dispatch(setChartType(type));
  };

  const FormatConfigTab = () => {
    return (
      <div className="format-config-container">
        {/* Legend Section */}
        <LegendSection />

        {/* Other format sections can be added here */}
      </div>
    );
  };

  return (
    <Layout className="powerbi-dashboard">
      <Content>
        <Layout>
          <Content>
            <Card className="chart-container" bodyStyle={{ padding: 0 }}>
              {/* Chart Type Selection */}
              <ChartToolbar
                chartType={chartType}
                onChartTypeChange={handleChartTypeChange}
              />

              {/* Chart Render Area */}
              <ChartRenderer chartType={chartType} config={currentConfig} />
            </Card>
          </Content>

          <Sider width={320} className="properties-panel">
            {/* Main Data/Format tabs */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) =>
                dispatch(setActiveTab(key as "data" | "format"))
              }
              size="large"
              centered
              className="main-tabs"
            >
              <TabPane tab="Data" key="data">
                {/* Data tab - no sub-tabs, direct content */}
                <div className="properties-content">
                  <DataConfigTab />
                </div>
              </TabPane>

              <TabPane tab="Format" key="format">
                {/* Visual/General sub-tabs for Format */}
                <Tabs
                  activeKey={activeSubTab}
                  onChange={(key) =>
                    dispatch(setActiveSubTab(key as "Visual" | "General"))
                  }
                  size="small"
                  className="sub-tabs"
                >
                  <TabPane tab="Visual" key="Visual">
                    <div className="properties-content">
                      <FormatConfigTab />
                    </div>
                  </TabPane>
                  <TabPane tab="General" key="General">
                    <div className="properties-content">
                      {/* General tab content will be added later */}
                      <div>General configuration options coming soon...</div>
                    </div>
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
};

export default PowerBIDashboard;
