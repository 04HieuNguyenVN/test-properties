import React from "react";
import { Button } from "antd";
import { FunctionOutlined } from "@ant-design/icons";

interface FunctionButtonProps {
  size?: "small" | "middle" | "large";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
}

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
