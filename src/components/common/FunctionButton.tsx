import React from "react";
import { Button } from "antd";
import { FunctionOutlined } from "@ant-design/icons";

// ===== Props cho FunctionButton =====
interface FunctionButtonProps {
  size?: "small" | "middle" | "large"; // Kích thước nút
  onClick?: () => void; // Hàm xử lý khi click
  disabled?: boolean; // Trạng thái disabled
  className?: string; // Thêm class tuỳ chỉnh
  tooltip?: string; // Tooltip hiển thị khi hover
}

// ===== Nút chức năng có icon function =====
export const FunctionButton: React.FC<FunctionButtonProps> = ({
  size = "small",
  onClick,
  disabled = false,
  className = "",
  tooltip,
}) => {
  return (
    <Button
      size={size}
      icon={<FunctionOutlined />}
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={tooltip}
    />
  );
};
