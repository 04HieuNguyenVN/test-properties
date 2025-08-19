import React from "react";
import JsonDataPanel from "./JsonDataPanel";
import ProcessedDataPanel from "./ProcessedDataPanel";
import "../styles/data-display.css";

interface DataDisplayPanelsProps {
  chartComponent: React.ReactNode;
}

const DataDisplayPanels: React.FC<DataDisplayPanelsProps> = ({
  chartComponent,
}) => {
  return (
    <div className="data-display-container">
      {/* Chart Section */}
      <div className="chart-section">{chartComponent}</div>

      {/* Data Panels Section */}
      <div className="data-panels-container">
        <JsonDataPanel />
        <ProcessedDataPanel />
      </div>
    </div>
  );
};

export default DataDisplayPanels;
