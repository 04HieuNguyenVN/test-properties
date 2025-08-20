// Simplified main App component
import React from "react";
import { useSelector } from "react-redux";
import { Layout, Card } from "antd";

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
import Sidebar from "./components/Sidebar";
import { RootState } from "./store/store";

const { Content } = Layout;

const App: React.FC = () => {
  const { chartType, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  );
  const currentConfig = chartConfigs[chartType];

  return (
    <Layout className="dashboard">
      <Content className="dashboard-content">
        <Layout>
          <Card className="chart-card">
            <ChartRenderer
              chartType={chartType}
              config={currentConfig.format}
            />
          </Card>
          <Sidebar />
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;
