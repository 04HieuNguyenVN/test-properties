import React from "react";
import { Select, InputNumber, Button, Typography, ColorPicker } from "antd";
import { Bold, Italic, Underline, Search } from "lucide-react";
import { FontControlsProps } from "../../types/interfaces";
import { FONT_OPTIONS } from "../../constants/data";

const FontControls: React.FC<FontControlsProps> = ({
  config,
  section,
  onUpdate,
}) => {
  const handleUpdate = (key: string, value: any) => {
    if (onUpdate) {
      onUpdate(key, value);
    }
  };

  return (
    <>
      <div className="form-group">
        <Typography.Text className="form-label">Font</Typography.Text>
        <div className="font-controls">
          <Select
            size="small"
            value={config.font || "Segoe UI"}
            onChange={(value) => handleUpdate("font", value)}
            style={{ width: "120px" }}
            options={FONT_OPTIONS}
          />
          <InputNumber
            size="small"
            value={config.fontSize || 10}
            onChange={(value) => handleUpdate("fontSize", value)}
            style={{ width: "60px" }}
            min={8}
            max={72}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="text-format-buttons">
          <Button
            size="small"
            type={config.bold ? "primary" : "default"}
            icon={<Bold size={12} />}
            onClick={() => handleUpdate("bold", !config.bold)}
          />
          <Button
            size="small"
            type={config.italic ? "primary" : "default"}
            icon={<Italic size={12} />}
            onClick={() => handleUpdate("italic", !config.italic)}
          />
          <Button
            size="small"
            type={config.underline ? "primary" : "default"}
            icon={<Underline size={12} />}
            onClick={() => handleUpdate("underline", !config.underline)}
          />
        </div>
      </div>

      <div className="form-group">
        <Typography.Text className="form-label">Color</Typography.Text>
        <div className="color-picker-row">
          <ColorPicker
            size="small"
            value={config.color || "#000000"}
            onChange={(color) => handleUpdate("color", color.toHexString())}
            showText={() => (
              <div
                className="effects-color-display"
                style={{
                  backgroundColor: config.color || "#000000",
                }}
              />
            )}
          />
          <Button size="small" icon={<Search size={12} />} />
        </div>
      </div>
    </>
  );
};

export default FontControls;
