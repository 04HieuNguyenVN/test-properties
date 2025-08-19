import React from "react";
import JsonDataPanel from "./JsonDataPanel";
import ProcessedDataPanel from "./ProcessedDataPanel";
import "../styles/data-display.css";

// ===== Props cho panel hiển thị dữ liệu =====
interface DataDisplayPanelsProps {
  chartComponent: React.ReactNode; // Component biểu đồ truyền vào
}

// ===== Panel hiển thị biểu đồ và dữ liệu gốc/đã xử lý =====
const DataDisplayPanels: React.FC<DataDisplayPanelsProps> = ({
  chartComponent,
}) => {
  return (
    <div className="data-display-container">
      {/* Khu vực hiển thị biểu đồ */}
      <div className="chart-section">{chartComponent}</div>

      {/* Khu vực hiển thị dữ liệu gốc và dữ liệu đã xử lý */}
      <div className="data-panels-container">
        <JsonDataPanel />
        <ProcessedDataPanel />
      </div>
    </div>
  );
};

export default DataDisplayPanels;
