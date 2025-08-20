// Simplified main App component
import React from "react";
import { Layout, Card } from "antd";
import { BrowserRouter } from "react-router-dom";

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

import Sidebar from "./components/Sidebar";
import ChartRoutes from "./components/ChartRoutes";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout className="dashboard">
        <Content className="dashboard-content">
          <Layout>
            <Content>
              <Card className="chart-card">
                <ChartRoutes />
              </Card>
            </Content>
            <Sidebar />
          </Layout>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
