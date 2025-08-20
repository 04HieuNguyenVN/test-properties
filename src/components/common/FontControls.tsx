import React from "react";
import { Space, Select, InputNumber, Button } from "antd";
import { Bold, Italic, Underline } from "lucide-react";
import { CustomColorPicker } from "./CustomColorPicker";

interface FontControlsProps {
  config: any;
  section: string;
  onUpdate: (section: string, key: string, value: any) => void;
}

const FontControls: React.FC<FontControlsProps> = ({ config, section, onUpdate }) => (
  <div className="font-controls">
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <div className="font-controls-grid">
        <div>
          <span style={{ fontSize: 12, display: "block", marginBottom: 4 }}>Font</span>
          <Select
            title="Chọn font chữ cho nhãn"
            size="small"
            value={config.font || "Segoe UI"}
            onChange={value => onUpdate(section, "font", value)}
            style={{ width: "100%" }}
            options={[
              { label: "Segoe UI", value: "Segoe UI" },
              { label: "Arial", value: "Arial" },
              { label: "DIN", value: "DIN" },
              { label: "Calibri", value: "Calibri" },
            ]}
          />
        </div>
        <div>
          <span style={{ fontSize: 12, display: "block", marginBottom: 4 }}>Size</span>
          <InputNumber
            title="Chọn cỡ chữ cho nhãn"
            size="small"
            value={config.fontSize || 9}
            min={6}
            max={72}
            onChange={value => onUpdate(section, "fontSize", value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div>
        <span style={{ fontSize: 12, display: "block", marginBottom: 4 }}>Formatting</span>
        <Space size="small">
          <Button
            title="In đậm"
            size="small"
            type={config.bold ? "primary" : "default"}
            icon={<Bold size={12} />}
            onClick={() => onUpdate(section, "bold", !config.bold)}
          />
          <Button
            title="In nghiêng"
            size="small"
            type={config.italic ? "primary" : "default"}
            icon={<Italic size={12} />}
            onClick={() => onUpdate(section, "italic", !config.italic)}
          />
          <Button
            title="Gạch chân"
            size="small"
            type={config.underline ? "primary" : "default"}
            icon={<Underline size={12} />}
            onClick={() => onUpdate(section, "underline", !config.underline)}
          />
        </Space>
      </div>
      <CustomColorPicker
        label="Color"
        value={config.color}
        onChange={color => onUpdate(section, "color", color)}
      />
    </Space>
  </div>
);

export default FontControls;

