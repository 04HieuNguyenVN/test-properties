import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chartSlice";
import { Layout, Card } from "antd";

// Styles (giữ nguyên các import từ App.tsx cũ)
import "../styles/dashboard.css";
import "../styles/chart.css";
import "../styles/field-selector.css";
import "../styles/properties-panel.css";
import "../styles/data-config.css";
import "../styles/format-config.css";
import "../styles/general-config.css";
import "../styles/sections.css";
import "../styles/components.css";
import "../styles/overrides.css";
import "../styles/custom-color-picker.css";
import "../styles/data-display.css";

import DataDisplayPanels from "../components/DataDisplayPanels";
import ChartRenderer from "../components/ChartRenderer";
import ChartToolbar from "../components/ChartToolbar";
import PropertiesPanel from "../components/PropertiesPanel";
import LanguageSwitch from "../components/common/LanguageSwitch";

const { Content, Sider } = Layout;

const PowerBIDashboard: React.FC = () => {
  const { chartType, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;

  const config = chartConfigs[chartType]?.format;

  return (
    <Layout className="powerbi-dashboard">
      <LanguageSwitch />
      <Content>
        <Layout>
          <Content>
            <Card className="chart-container" bodyStyle={{ padding: 0 }}>
              <div className="chart-toolbar">
                <ChartToolbar />
              </div>

              <DataDisplayPanels
                chartComponent={
                  <ChartRenderer chartType={chartType} config={config} />
                }
              />
            </Card>
          </Content>

          <Sider width={320} className="properties-panel">
            <PropertiesPanel />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
};

export default PowerBIDashboard;
