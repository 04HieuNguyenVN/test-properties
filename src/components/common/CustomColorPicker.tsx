import React from "react";
import { ColorPicker, Space, Typography } from "antd";
import { Color } from "antd/es/color-picker";

// ===== Props cho CustomColorPicker =====
interface CustomColorPickerProps {
  label?: string; // Nhãn hiển thị
  value?: string; // Giá trị màu hiện tại
  onChange?: (color: string) => void; // Hàm callback khi đổi màu
  size?: "small" | "middle" | "large"; // Kích thước
  showLabel?: boolean; // Có hiển thị nhãn không
  showCode?: boolean; // Có hiển thị mã màu không
  defaultValue?: string; // Giá trị mặc định
}

// ===== Component chọn màu tuỳ chỉnh =====
export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  label,
  value,
  onChange,
  size = "middle",
  showLabel = true,
  showCode = true,
  defaultValue = "#1677FF",
}) => {
  // Xử lý khi đổi màu
  const handleColorChange = (color: Color) => {
    if (onChange) {
      onChange(color.toHexString());
    }
  };

  // Lấy giá trị màu hiện tại
  const currentValue = value || defaultValue;

  return (
    <div className="custom-color-picker">
      {showLabel && label && (
        <Typography.Text
          className="form-label"
          style={{
            fontSize: "12px",
            display: "block",
            marginBottom: "4px",
          }}
        >
          {label}
        </Typography.Text>
      )}
      <div className="color-picker-wrapper">
        <Space align="center" size={8}>
          <ColorPicker
            size={size}
            value={currentValue}
            onChange={handleColorChange}
          />
          {showCode && (
            <Typography.Text code style={{ fontSize: "11px" }}>
              {currentValue}
            </Typography.Text>
          )}
        </Space>
      </div>
    </div>
  );
};

export default CustomColorPicker;
