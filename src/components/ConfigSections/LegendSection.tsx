import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  Button,
  Typography,
  Input,
  ColorPicker,
  InputNumber,
} from "antd";
import { Bold, Italic, Underline, Search, RotateCcw } from "lucide-react";
import { RootState } from "../../store/store";
import { toggleSection, updateFormatConfig } from "../../store/chartSlice";
import ConfigSection from "../Common/ConfigSection";
import { FONT_OPTIONS, POSITION_OPTIONS } from "../../constants/data";

const LegendSection: React.FC = () => {
  const dispatch = useDispatch();
  const { expandedSections, chartConfigs, chartType } = useSelector(
    (state: RootState) => state.chart
  );

  const config = chartConfigs[chartType].format.legend;

  const handleUpdateFormatConfig = (key: string, value: any) => {
    dispatch(updateFormatConfig({ section: "legend", key, value }));
  };

  return (
    <div className="properties-container">
      {/* Options Sub-Section */}
      <ConfigSection
        title="Options"
        isExpanded={expandedSections.legendOptions}
        onToggle={() => dispatch(toggleSection("legendOptions"))}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">Position</Typography.Text>
            <Select
              size="small"
              value={config.position || "Top"}
              onChange={(value) => handleUpdateFormatConfig("position", value)}
              style={{ width: "100%" }}
              options={POSITION_OPTIONS}
            />
          </div>
        </div>
      </ConfigSection>

      {/* Text Sub-Section */}
      <ConfigSection
        title="Text"
        isExpanded={expandedSections.legendText}
        onToggle={() => dispatch(toggleSection("legendText"))}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">Font</Typography.Text>
            <div className="font-controls">
              <Select
                size="small"
                value={config.font || "Segoe UI"}
                onChange={(value) => handleUpdateFormatConfig("font", value)}
                style={{ width: "120px" }}
                options={FONT_OPTIONS}
              />
              <InputNumber
                size="small"
                value={config.fontSize || 10}
                onChange={(value) =>
                  handleUpdateFormatConfig("fontSize", value)
                }
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
                onClick={() => handleUpdateFormatConfig("bold", !config.bold)}
              />
              <Button
                size="small"
                type={config.italic ? "primary" : "default"}
                icon={<Italic size={12} />}
                onClick={() =>
                  handleUpdateFormatConfig("italic", !config.italic)
                }
              />
              <Button
                size="small"
                type={config.underline ? "primary" : "default"}
                icon={<Underline size={12} />}
                onClick={() =>
                  handleUpdateFormatConfig("underline", !config.underline)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <Typography.Text className="form-label">Color</Typography.Text>
            <div className="color-picker-row">
              <ColorPicker
                size="small"
                value={config.color || "#666666"}
                onChange={(color) =>
                  handleUpdateFormatConfig("color", color.toHexString())
                }
                showText={() => (
                  <div
                    className="effects-color-display"
                    style={{
                      backgroundColor: config.color || "#666666",
                    }}
                  />
                )}
              />
              <Button size="small" icon={<Search size={12} />} />
            </div>
          </div>
        </div>
      </ConfigSection>

      {/* Title Sub-Section */}
      <ConfigSection
        title="Title"
        isExpanded={expandedSections.legendTitle}
        onToggle={() => dispatch(toggleSection("legendTitle"))}
        hasToggle={true}
        toggleValue={config.title?.enabled !== false}
        onToggleChange={(checked) =>
          handleUpdateFormatConfig("title", {
            ...config.title,
            enabled: checked,
          })
        }
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">Title text</Typography.Text>
            <Input
              size="small"
              value={config.title?.text || "Legend"}
              onChange={(e) =>
                handleUpdateFormatConfig("title", {
                  ...config.title,
                  text: e.target.value,
                })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </ConfigSection>

      {/* Reset to default */}
      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: "16px", fontSize: "12px", color: "#0078d4" }}
          onClick={() => {
            handleUpdateFormatConfig("position", "Top");
            handleUpdateFormatConfig("font", "Segoe UI");
            handleUpdateFormatConfig("fontSize", 8);
            handleUpdateFormatConfig("bold", false);
            handleUpdateFormatConfig("italic", false);
            handleUpdateFormatConfig("underline", false);
            handleUpdateFormatConfig("color", "#666666");
            handleUpdateFormatConfig("title", {
              enabled: true,
              text: "Legend",
            });
          }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default LegendSection;
