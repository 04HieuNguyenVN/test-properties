import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Select,
  Button,
  Typography,
  Space,
  InputNumber,
  Switch,
  ColorPicker,
  Slider,
} from "antd";
import { Search, Bold, Italic, Underline, RotateCcw } from "lucide-react";
import { RootState } from "../../store/store";
import { toggleSection, updateFormatConfig } from "../../store/chartSlice";
import { CustomColorPicker } from "../common/CustomColorPicker";
import {
  FONT_FAMILY_OPTIONS,
  REQUIRED_SECTIONS,
  BAR_CHART_TYPES,
} from "../../constants/index";

interface FormatConfigTabProps {}

// ConfigSection component for collapsible sections
interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (checked: boolean) => void;
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
      <div className="section-header" onClick={onToggle}>
        <div className="section-title-row">
          <Typography.Text className="section-title">{title}</Typography.Text>
          {hasToggle && (
            <Switch
              size="small"
              checked={toggleValue}
              onChange={(checked) => {
                onToggleChange?.(checked);
                // Prevent header click when toggling switch
              }}
              onClick={(e: any) => e.stopPropagation()}
            />
          )}
        </div>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
          {isExpanded ? "−" : "+"}
        </span>
      </div>
      {isExpanded && <div className="section-body">{children}</div>}
    </div>
  );
};

// FontControls component for reusable font styling
interface FontControlsProps {
  config: any;
  section: string;
}

const FontControls: React.FC<FontControlsProps> = ({ config, section }) => {
  const dispatch = useDispatch();

  const handleUpdateFormatConfig = (
    sectionKey: string,
    key: string,
    value: any
  ) => {
    dispatch(updateFormatConfig({ section: sectionKey, key, value }));
  };

  return (
    <>
      <div className="form-group">
        <Typography.Text className="form-label">Font</Typography.Text>
        <div className="font-controls">
          <Select
            size="small"
            value={config.font || "Segoe UI"}
            onChange={(value) =>
              handleUpdateFormatConfig(section, "font", value)
            }
            style={{ width: "120px" }}
          >
            {FONT_FAMILY_OPTIONS.map((font) => (
              <Select.Option key={font.value} value={font.value}>
                {font.label}
              </Select.Option>
            ))}
          </Select>
          <InputNumber
            size="small"
            value={config.fontSize || 10}
            onChange={(value) =>
              handleUpdateFormatConfig(section, "fontSize", value)
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
            onClick={() =>
              handleUpdateFormatConfig(section, "bold", !config.bold)
            }
          />
          <Button
            size="small"
            type={config.italic ? "primary" : "default"}
            icon={<Italic size={12} />}
            onClick={() =>
              handleUpdateFormatConfig(section, "italic", !config.italic)
            }
          />
          <Button
            size="small"
            type={config.underline ? "primary" : "default"}
            icon={<Underline size={12} />}
            onClick={() =>
              handleUpdateFormatConfig(section, "underline", !config.underline)
            }
          />
        </div>
      </div>

      <CustomColorPicker
        label="Color"
        value={config.color}
        onChange={(color) => handleUpdateFormatConfig(section, "color", color)}
      />
    </>
  );
};

export const FormatConfigTab: React.FC<FormatConfigTabProps> = () => {
  const dispatch = useDispatch();
  const chartType = useSelector((state: RootState) => state.chart.chartType);
  const expandedSections = useSelector(
    (state: RootState) => state.chart.expandedSections
  );
  const currentConfig = useSelector(
    (state: RootState) => state.chart.chartConfigs[state.chart.chartType]
  );
  const formatConfig = currentConfig.format;

  const handleToggleSection = (section: string) => {
    dispatch(toggleSection(section));
  };

  const handleUpdateFormatConfig = (
    sectionKey: string,
    key: string,
    value: any
  ) => {
    dispatch(updateFormatConfig({ section: sectionKey, key, value }));
  };

  // Define format sections available for each chart type
  const getAvailableFormatSections = () => {
    const commonSections = ["legend"];

    switch (chartType) {
      case "column": // Column Chart
      case "stackedColumn": // Stacked Column Chart
      case "clusteredColumn": // Clustered Column Chart
        return [...commonSections, "xAxis", "yAxis", "dataLabels", "gridlines"];
      case "bar": // Bar Chart
      case "stackedBar": // Stacked Bar Chart
      case "clusteredBar": // Clustered Bar Chart
        return [...commonSections, "xAxis", "yAxis", "dataLabels", "gridlines"];
      case "pie": // Pie Chart
        return [...commonSections, "dataLabels", "slices", "rotation"];
      case "line": // Line Chart
        return [...commonSections, "xAxis", "yAxis", "gridlines", "dataLabels"];
      case "lineAndColumn": // Line and Column Chart
        return [...commonSections, "xAxis", "yAxis", "gridlines", "dataLabels"];
      default:
        return [...commonSections, "xAxis", "yAxis", "dataLabels", "gridlines"];
    }
  };

  const renderSectionContent = (sectionKey: string) => {
    const config = (formatConfig as any)[sectionKey] || {};

    switch (sectionKey) {
      case "legend":
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
                  <Typography.Text className="form-label">
                    Position
                  </Typography.Text>
                  <Select
                    size="small"
                    value={config.position || "Top"}
                    onChange={(value) =>
                      handleUpdateFormatConfig(sectionKey, "position", value)
                    }
                    style={{ width: "100%" }}
                    options={[
                      { label: "Top", value: "Top" },
                      { label: "Bottom", value: "Bottom" },
                      { label: "Left", value: "Left" },
                      { label: "Right", value: "Right" },
                      { label: "Center right", value: "Center right" },
                    ]}
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
                <FontControls config={config} section={sectionKey} />
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
                handleUpdateFormatConfig(sectionKey, "title", {
                  ...config.title,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Title text
                  </Typography.Text>
                  <Input
                    size="small"
                    value={config.title?.text || "Legend"}
                    onChange={(e) =>
                      handleUpdateFormatConfig(sectionKey, "title", {
                        ...config.title,
                        text: e.target.value,
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </ConfigSection>

            {/* Reset to Default */}
            <div className="reset-section">
              <Button
                type="link"
                icon={<RotateCcw size={14} />}
                style={{
                  padding: "16px",
                  fontSize: "12px",
                  color: "#0078d4",
                }}
                onClick={() => {
                  handleUpdateFormatConfig(sectionKey, "position", "Top");
                  handleUpdateFormatConfig(sectionKey, "font", "Segoe UI");
                  handleUpdateFormatConfig(sectionKey, "fontSize", 8);
                  handleUpdateFormatConfig(sectionKey, "bold", false);
                  handleUpdateFormatConfig(sectionKey, "italic", false);
                  handleUpdateFormatConfig(sectionKey, "underline", false);
                  handleUpdateFormatConfig(sectionKey, "color", "#666666");
                  handleUpdateFormatConfig(sectionKey, "title", {
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

      case "gridlines":
        return (
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">Color</Typography.Text>
              <Space align="center">
                <ColorPicker
                  size="small"
                  value={config.color || "#E1E1E1"}
                  onChange={(color) =>
                    handleUpdateFormatConfig(
                      sectionKey,
                      "color",
                      color.toHexString()
                    )
                  }
                />
                <Typography.Text code style={{ fontSize: "12px" }}>
                  {config.color || "#E1E1E1"}
                </Typography.Text>
              </Space>
            </div>
            <div className="form-group">
              <Typography.Text className="form-label">
                Stroke Width
              </Typography.Text>
              <InputNumber
                size="small"
                value={config.strokeWidth || 1}
                min={1}
                max={10}
                onChange={(value) =>
                  handleUpdateFormatConfig(sectionKey, "strokeWidth", value)
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      case "slices":
        return (
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">
                Show slices
              </Typography.Text>
              <Switch
                size="small"
                checked={config.enabled !== false}
                onChange={(value) =>
                  handleUpdateFormatConfig(sectionKey, "enabled", value)
                }
              />
            </div>
          </div>
        );

      case "rotation":
        return (
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">Angle</Typography.Text>
              <InputNumber
                size="small"
                value={config.angle || 0}
                min={0}
                max={360}
                onChange={(value) =>
                  handleUpdateFormatConfig(sectionKey, "angle", value)
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      case "xAxis":
        // Enhanced X-axis based on chart type
        if (
          [
            "column",
            "stackedColumn",
            "clusteredColumn",
            "line",
            "lineAndColumn",
          ].includes(chartType)
        ) {
          return (
            <div className="properties-container">
              <ConfigSection
                title="Values"
                isExpanded={expandedSections.xAxisValues || false}
                onToggle={() => handleToggleSection("xAxisValues")}
                hasToggle={true}
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <FontControls config={config} section={sectionKey} />
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.xAxisTitle || false}
                onToggle={() => handleToggleSection("xAxisTitle")}
                hasToggle={true}
                toggleValue={config.titleEnabled !== false}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Title text
                    </Typography.Text>
                    <Input
                      size="small"
                      value={config.titleText || "Auto"}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </ConfigSection>
            </div>
          );
        } else if (BAR_CHART_TYPES.includes(chartType)) {
          return (
            <div className="properties-container">
              <ConfigSection
                title="Range"
                isExpanded={expandedSections.xAxisRange || false}
                onToggle={() => handleToggleSection("xAxisRange")}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Minimum
                    </Typography.Text>
                    <Input
                      size="small"
                      value={config.rangeMin || "Auto"}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum
                    </Typography.Text>
                    <Input
                      size="small"
                      value={config.rangeMax || "Auto"}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </ConfigSection>
            </div>
          );
        }
        return (
          <div className="section-content">
            <FontControls config={config} section={sectionKey} />
          </div>
        );

      case "yAxis":
        // Enhanced Y-axis based on chart type
        if (
          [
            "column",
            "stackedColumn",
            "clusteredColumn",
            "line",
            "lineAndColumn",
          ].includes(chartType)
        ) {
          return (
            <div className="properties-container">
              <ConfigSection
                title="Range"
                isExpanded={expandedSections.yAxisRange || false}
                onToggle={() => handleToggleSection("yAxisRange")}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Minimum
                    </Typography.Text>
                    <Input
                      size="small"
                      value={config.rangeMin || "Auto"}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum
                    </Typography.Text>
                    <Input
                      size="small"
                      value={config.rangeMax || "Auto"}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Values"
                isExpanded={expandedSections.yAxisValues || false}
                onToggle={() => handleToggleSection("yAxisValues")}
                hasToggle={true}
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <FontControls config={config} section={sectionKey} />
                </div>
              </ConfigSection>
            </div>
          );
        } else if (BAR_CHART_TYPES.includes(chartType)) {
          return (
            <div className="properties-container">
              <ConfigSection
                title="Values"
                isExpanded={expandedSections.yAxisValues || false}
                onToggle={() => handleToggleSection("yAxisValues")}
                hasToggle={true}
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <FontControls config={config} section={sectionKey} />
                </div>
              </ConfigSection>
            </div>
          );
        }
        return (
          <div className="section-content">
            <FontControls config={config} section={sectionKey} />
          </div>
        );

      default:
        return (
          <div className="section-content">
            <FontControls config={config} section={sectionKey} />
          </div>
        );
    }
  };

  return (
    <div className="format-config-tab visual-tab">
      {/* Properties Section - Main Container */}
      <ConfigSection
        title="Properties"
        isExpanded={expandedSections.properties || true}
        onToggle={() => handleToggleSection("properties")}
      >
        <div className="properties-container">
          {/* Legend Section */}
          {getAvailableFormatSections().includes("legend") && (
            <ConfigSection
              title="Legend"
              isExpanded={expandedSections.legend}
              onToggle={() => handleToggleSection("legend")}
              hasToggle={true}
              toggleValue={(formatConfig as any).legend?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("legend", "enabled", value)
              }
            >
              {renderSectionContent("legend")}
            </ConfigSection>
          )}

          {/* Data Labels Section */}
          {getAvailableFormatSections().includes("dataLabels") && (
            <ConfigSection
              title="Data labels"
              isExpanded={expandedSections.dataLabels}
              onToggle={() => handleToggleSection("dataLabels")}
              hasToggle={true}
              toggleValue={(formatConfig as any).dataLabels?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("dataLabels", "enabled", value)
              }
            >
              {renderSectionContent("dataLabels")}
            </ConfigSection>
          )}

          {/* Gridlines Section */}
          {getAvailableFormatSections().includes("gridlines") && (
            <ConfigSection
              title="Gridlines"
              isExpanded={expandedSections.gridlines}
              onToggle={() => handleToggleSection("gridlines")}
              hasToggle={true}
              toggleValue={(formatConfig as any).gridlines?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("gridlines", "enabled", value)
              }
            >
              {renderSectionContent("gridlines")}
            </ConfigSection>
          )}

          {/* Slices Section (for Pie charts) */}
          {getAvailableFormatSections().includes("slices") && (
            <ConfigSection
              title="Slices"
              isExpanded={expandedSections.slices}
              onToggle={() => handleToggleSection("slices")}
              hasToggle={true}
              toggleValue={(formatConfig as any).slices?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("slices", "enabled", value)
              }
            >
              {renderSectionContent("slices")}
            </ConfigSection>
          )}

          {/* Rotation Section (for Pie charts) */}
          {getAvailableFormatSections().includes("rotation") && (
            <ConfigSection
              title="Rotation"
              isExpanded={expandedSections.rotation}
              onToggle={() => handleToggleSection("rotation")}
              hasToggle={true}
              toggleValue={(formatConfig as any).rotation?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("rotation", "enabled", value)
              }
            >
              {renderSectionContent("rotation")}
            </ConfigSection>
          )}

          {/* X-axis Section */}
          {getAvailableFormatSections().includes("xAxis") && (
            <ConfigSection
              title="X-axis"
              isExpanded={expandedSections.xAxis}
              onToggle={() => handleToggleSection("xAxis")}
            >
              {renderSectionContent("xAxis")}
            </ConfigSection>
          )}

          {/* Y-axis Section */}
          {getAvailableFormatSections().includes("yAxis") && (
            <ConfigSection
              title="Y-axis"
              isExpanded={expandedSections.yAxis}
              onToggle={() => handleToggleSection("yAxis")}
            >
              {renderSectionContent("yAxis")}
            </ConfigSection>
          )}
        </div>
      </ConfigSection>

      {/* Reset to default */}
      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: "16px", fontSize: "12px", color: "#0078d4" }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default FormatConfigTab;
