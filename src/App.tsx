import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import type { ChartState } from "./store/chart";
import { Layout, Card } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { setChartType } from "./store/chart";

import "./styles/dashboard/dashboard.css";
import "./styles/chart/chart.css";
import "./styles/data/field-selector.css";
import "./styles/properties/properties-panel.css";
import "./styles/data/data-config.css";
import "./styles/format/format-config.css";
import "./styles/general/general-config.css";
import "./styles/component/sections.css";
import "./styles/component/components.css";
import "./styles/overrides/overrides.css";
import "./styles/component/custom-color-picker.css";
import "./styles/data/data-display.css";
import "./styles/chart/stacked-column-chart.css";

import DataDisplayPanels from "./components/DataDisplayPanels";
// ❌ Bỏ import ChartRenderer vì không dùng trực tiếp ở đây
// import ChartRenderer from "./components/ChartRenderer";
import ChartToolbar from "./components/ChartToolbar";
import PropertiesPanel from "./components/PropertiesPanel";
import LanguageSwitch from "./components/common/LanguageSwitch";
import DashboardDataProvider from "./components/DashboardDataProvider";
// ... các import giữ nguyên ...
import { useHorizontalSplit } from "./hooks/useHorizontalSplit";
import ResizeHitbox from "./components/common/ResizeHitbox";

const { Content, Sider } = Layout;

const ChartRouterSync: React.FC = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const { chartType } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;

  React.useEffect(() => {
    if (type && type !== chartType) {
      dispatch(setChartType(type as any));
    }
  }, [type]);

  const layoutRef = React.useRef<HTMLDivElement | null>(null);

  const { leftBasisPct, hitboxLeft, onMouseDown } = useHorizontalSplit({
    containerRef: layoutRef,
    storageKey: "layoutLeftRatio",
    defaultLeftRatio: 0.8,
    minLeftPx: 360,
    minRightPx: 240,
  });

  const siderWidthPct = `calc(100% - ${leftBasisPct})`;

  return (
    <DashboardDataProvider>
      {({
        chartType,
        config,
        rawData,
        data,
        // ✅ LẤY THÊM các giá trị này từ Provider
        dataConfig,
        onDataConfigChange,
        availableTables,
        processSummary,
      }) => (
        <Layout ref={layoutRef} style={{ position: "relative" }}>
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
                chartType={chartType}
                config={config}
                rawData={rawData}
                data={data}
                processSummary={processSummary}
              />
            </Card>
          </Content>

          {/* Hitbox vô hình ở mép Content/Sider */}
          <ResizeHitbox
            left={hitboxLeft}
            onMouseDown={onMouseDown}
            ariaLabel="Resize properties panel"
          />

          {/* 👉 dùng % cho width và flex-basis để khớp với hitbox */}
          <Sider
            width={siderWidthPct}
            className="properties-panel"
            style={{ flex: `0 0 ${siderWidthPct}`, minWidth: 240 }}
          >
            <PropertiesPanel
              chartType={chartType}
              rawData={rawData}
              data={data}
              // ✅ TRUYỀN XUỐNG CHO DataTab QUA PropertiesPanel
              dataConfig={dataConfig}
              onDataConfigChange={onDataConfigChange}
              availableTables={availableTables}
            />
          </Sider>
        </Layout>
      )}
    </DashboardDataProvider>
  );
};

const PowerBIDashboard: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path=":type" element={<ChartRouterSync />} />
    </Routes>
  </BrowserRouter>
);

export default PowerBIDashboard;
