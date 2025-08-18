import React from "react";
import { Typography, Switch } from "antd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ConfigSectionProps } from "../../types/interfaces";

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  children,
  isExpanded,
  onToggle,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
}) => {
  return (
    <div className="config-section">
      <div
        className="section-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          cursor: "pointer",
          borderBottom: "1px solid #e8e8e8",
          backgroundColor: "#fafafa",
        }}
        onClick={onToggle}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Typography.Text strong style={{ fontSize: "12px" }}>
            {title}
          </Typography.Text>
        </div>
        {hasToggle && (
          <Switch
            size="small"
            checked={toggleValue}
            onChange={(checked) => {
              onToggleChange?.(checked);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        )}
      </div>
      {isExpanded && (
        <div className="section-body" style={{ padding: "12px" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default ConfigSection;
