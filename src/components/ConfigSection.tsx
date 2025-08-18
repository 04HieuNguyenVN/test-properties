import React from "react";
import { Typography, Switch } from "antd";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * CONFIG SECTION COMPONENT
 *
 * Component tái sử dụng để tạo các section có thể thu gọn/mở rộng
 * trong panel properties. Được sử dụng cho tất cả các sections
 * như Legend, Title, XAxis, YAxis, etc.
 */

interface ConfigSectionProps {
  title: string; // Tiêu đề hiển thị trên header
  children: React.ReactNode; // Nội dung bên trong section
  isExpanded: boolean; // Trạng thái mở/đóng
  onToggle: () => void; // Hàm callback khi click toggle
  hasToggle?: boolean; // Có hiển thị switch on/off không
  toggleValue?: boolean; // Giá trị của switch
  onToggleChange?: (checked: boolean) => void; // Callback khi thay đổi switch
}

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
      {/* SECTION HEADER */}
      <div className="config-section-header" onClick={onToggle}>
        <div className="header-left">
          {/* Expand/Collapse Icon */}
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {/* Section Title */}
          <Typography.Text className="section-title">{title}</Typography.Text>
        </div>

        {/* Optional Toggle Switch */}
        {hasToggle && (
          <Switch
            size="small"
            checked={toggleValue}
            onChange={onToggleChange}
            onClick={(e: any) => e.stopPropagation()} // Prevent header click
          />
        )}
      </div>

      {/* SECTION CONTENT */}
      {isExpanded && <div className="config-section-content">{children}</div>}
    </div>
  );
};

export default ConfigSection;
