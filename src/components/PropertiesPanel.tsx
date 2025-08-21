import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import type { RootState } from "../store/store";
import {
  setActiveSubTab,
  setActiveTab,
  type ChartState,
} from "../store/chartSlice";

import { DataTab } from "./Tabs/DataTab";
import FormatConfigTab from "./Tabs/FormatConfigTab";
import GeneralConfigTab from "./Tabs/GeneralConfigTab";
import chartData from "../data/chartData.json";

const { TabPane } = Tabs;

const PropertiesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTab, activeSubTab, chartType } = useSelector(
    (s: RootState) => s.chart
  ) as ChartState;

  const rawData =
    chartType === "pie"
      ? chartData.categories
      : chartType === "stackedBar"
      ? chartData.stackedData
      : chartData.monthlyData;

  const data =
    chartType === "stackedBar"
      ? chartData.stackedData
      : chartType === "pie"
      ? chartData.categories
      : chartData.monthlyData;

  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => dispatch(setActiveTab(key as "data" | "format"))}
      size="large"
      centered
      className="main-tabs"
    >
      <TabPane tab="Data" key="data">
        <div className="properties-content">
          <DataTab chartType={chartType} rawData={rawData} data={data} />
        </div>
      </TabPane>

      <TabPane tab="Format" key="format">
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
              <GeneralConfigTab />
            </div>
          </TabPane>
        </Tabs>
      </TabPane>
    </Tabs>
  );
};

export default PropertiesPanel;
