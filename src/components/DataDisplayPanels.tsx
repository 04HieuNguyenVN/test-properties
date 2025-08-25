import React from "react";
import ChartRenderer from "./ChartRenderer";
import JsonDataPanel from "./JsonDataPanel";
import ProcessedDataPanel from "./ProcessedDataPanel";
import "../styles/data/data-display.css";

import { useHorizontalSplit } from "../hooks/useHorizontalSplit";
import ResizeHitbox from "./common/ResizeHitbox";

interface DataDisplayPanelsProps {
  chartType: string;
  config: any;
  rawData: any[];
  data: any[]; // dữ liệu mặc định từ Provider
  processSummary?: { key: string; value: number }[];
}

const DataDisplayPanels: React.FC<DataDisplayPanelsProps> = ({
  chartType,
  config,
  rawData,
  data,
  processSummary = [],
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Tỉ lệ panel trái (Chart). Lưu theo key "dataLeftRatio".
  const { leftBasisPct, hitboxLeft, onMouseDown } = useHorizontalSplit({
    containerRef,
    storageKey: "dataLeftRatio",
    defaultLeftRatio: 0.58, // ~58% cho Chart
    minLeftPx: 320,
    minRightPx: 320,
  });

  // 👉 State dữ liệu thực tế dùng cho Chart (mặc định = data từ Provider)
  const [chartData, setChartData] = React.useState<any[]>(data);

  // Khi Provider đổi chartType/data thì reset chartData
  React.useEffect(() => {
    setChartData(data);
  }, [data, chartType]);

  // Callback nhận dữ liệu đã xử lý từ ProcessedDataPanel
  const handleUseInChart = React.useCallback((nextData: any[]) => {
    setChartData(nextData || []);
  }, []);

  return (
    <div
      className="data-display-container"
      ref={containerRef}
      style={{
        display: "flex",
        width: "100%",
        minHeight: 360,
        position: "relative",
      }}
    >
      {/* Chart bên trái */}
      <div
        className="chart-section"
        style={{ flex: `0 0 ${leftBasisPct}`, minWidth: 320 }}
      >
        <ChartRenderer
          chartType={chartType as any}
          config={config}
          data={chartData}
        />
      </div>

      {/* Hitbox vô hình bám mép Chart/Data */}
      <ResizeHitbox
        left={hitboxLeft}
        onMouseDown={onMouseDown}
        ariaLabel="Resize data panels"
      />

      <div
        className="data-panels-container"
        style={{
          flex: 1,
          minWidth: 320,
          display: "flex",
          gap: 12,
          overflow: "hidden",
        }}
      >
        <JsonDataPanel
          chartType={chartType}
          rawData={rawData}
          onReset={() => setChartData(data)}
        />
        <ProcessedDataPanel
          chartType={chartType}
          data={data}
          onUseInChart={handleUseInChart}
          processSummary={processSummary}
        />
      </div>
    </div>
  );
};

export default DataDisplayPanels;
