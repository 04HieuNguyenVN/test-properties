import React from "react";
import JsonDataPanel from "./JsonDataPanel";
import ProcessedDataPanel from "./ProcessedDataPanel";
import "../styles/data-display.css";

// ===== Props cho panel hiển thị dữ liệu =====
interface DataDisplayPanelsProps {
  chartComponent: React.ReactNode; // Component biểu đồ truyền vào
  data: any; // Dữ liệu truyền từ component tổng
}

// ===== Panel hiển thị biểu đồ và dữ liệu gốc/đã xử lý =====
const DataDisplayPanels: React.FC<DataDisplayPanelsProps> = ({
  chartComponent,
  data,
}) => {
  React.useEffect(() => {
    // Lắng nghe thay đổi của data từ component tổng
    // Thực hiện các hành động cần thiết ở đây
    console.log("Data changed in DataDisplayPanels:", data);
  }, [data]);

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
