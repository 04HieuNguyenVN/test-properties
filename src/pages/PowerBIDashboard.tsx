import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chartSlice";
import { Layout, Card } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { setChartType } from "../store/chartSlice";

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
import DashboardDataProvider from "./DashboardDataProvider";

const { Content, Sider } = Layout;

const ChartRouterSync: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();
  const { chartType } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;

  // Khi URL đổi, set chartType nếu khác
  React.useEffect(() => {
    if (type && type !== chartType) {
      dispatch(setChartType(type as any));
    }
  }, [type]);

  // Khi chartType đổi, đổi URL nếu khác
  React.useEffect(() => {
    if (type !== chartType) {
      navigate(`/chart/${chartType}`, { replace: true });
    }
  }, [chartType]);

  return (
    <DashboardDataProvider>
      {({ chartType, config, rawData, data }) => (
        <Layout className="powerbi-dashboard">
          <Content>
            <Layout>
              <Content>
                <Card className="chart-container" bodyStyle={{ padding: 0 }}>
                  <div
                    className="chart-toolbar"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      justifyContent: "space-between",
                    }}
                  >
                    <ChartToolbar />
                    <LanguageSwitch />
                  </div>

                  <DataDisplayPanels
                    chartComponent={
                      <ChartRenderer
                        chartType={chartType as any}
                        config={config}
                        data={data}
                      />
                    }
                  />
                </Card>
              </Content>

              <Sider width={320} className="properties-panel">
                <PropertiesPanel
                  chartType={chartType}
                  rawData={rawData}
                  data={data}
                />
              </Sider>
            </Layout>
          </Content>
        </Layout>
      )}
    </DashboardDataProvider>
  );
};

const PowerBIDashboard: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/chart/:type" element={<ChartRouterSync />} />
      <Route
        path="*"
        element={<Navigate to="/chart/stackedColumn" replace />}
      />
    </Routes>
  </BrowserRouter>
);

export default PowerBIDashboard;
