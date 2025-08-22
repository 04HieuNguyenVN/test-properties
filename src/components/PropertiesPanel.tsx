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
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

interface PropertiesPanelProps {
  chartType: string;
  rawData: any;
  data: any;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  chartType,
  rawData,
  data,
}) => {
  const dispatch = useDispatch();
  const { activeTab, activeSubTab } = useSelector(
    (s: RootState) => s.chart
  ) as ChartState;
  const { t } = useTranslation("propertiesPanel");
  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => dispatch(setActiveTab(key as "data" | "format"))}
      size="large"
      centered
      className="main-tabs"
    >
      <TabPane tab={t("tabs.data", "Data")} key="data">
        <div className="properties-content">
          <DataTab chartType={chartType} rawData={rawData} data={data} />
        </div>
      </TabPane>

      <TabPane tab={t("tabs.format", "Format")} key="format">
        <Tabs
          activeKey={activeSubTab}
          onChange={(key) =>
            dispatch(setActiveSubTab(key as "Visual" | "General"))
          }
          size="small"
          className="sub-tabs"
        >
          <TabPane tab={t("tabs.visual", "Visual")} key="Visual">
            <div className="properties-content">
              <FormatConfigTab />
            </div>
          </TabPane>
          <TabPane tab={t("tabs.general", "General")} key="General">
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
