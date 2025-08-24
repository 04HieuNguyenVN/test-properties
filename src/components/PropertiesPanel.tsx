// components/PropertiesPanel.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import type { RootState } from "../store/store";
import { setActiveSubTab, setActiveTab, type ChartState } from "../store/chart";

import { DataTab } from "./Tabs/DataTab";
import FormatConfigTab from "./Tabs/FormatConfigTab";
import GeneralConfigTab from "./Tabs/GeneralConfigTab";
import { useTranslation } from "react-i18next";
import type { DataConfigState } from "./Tabs/DataTab/types";

const { TabPane } = Tabs;

interface PropertiesPanelProps {
  chartType: string;
  rawData: any;
  data: any;
  /** Giá trị cấu hình dữ liệu hiện tại (đến từ Provider) */
  dataConfig?: DataConfigState;
  /** Emit khi DataTab thay đổi cấu hình */
  onDataConfigChange?: (next: DataConfigState) => void;
  availableTables?: string[]; // thêm prop
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  chartType,
  rawData,
  data,
  dataConfig,
  onDataConfigChange,
  availableTables = [], // fallback
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
          <DataTab
            chartType={chartType}
            rawData={rawData}
            data={data}
            value={dataConfig}
            onChange={onDataConfigChange}
            tableNames={availableTables} // truyền vào đây
          />
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
