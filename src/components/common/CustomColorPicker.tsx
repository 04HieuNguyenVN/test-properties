import React from "react";
import { ColorPicker, Space, Typography } from "antd";
import { Color } from "antd/es/color-picker";

interface CustomColorPickerProps {
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
  size?: "small" | "middle" | "large";
  showLabel?: boolean;
  showCode?: boolean;
  defaultValue?: string;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  label,
  value,
  onChange,
  size = "middle",
  showLabel = true,
  showCode = true,
  defaultValue = "#1677FF",
}) => {
  const handleColorChange = (color: Color) => {
    if (onChange) {
      onChange(color.toHexString());
    }
  };

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
