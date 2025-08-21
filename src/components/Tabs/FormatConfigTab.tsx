import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import {
  ChartState,
  toggleSection,
  updateFormatConfig,
} from "../../store/chartSlice";
import {
  REQUIRED_SECTIONS,
  BAR_CHART_TYPES,
  FONT_FAMILY_OPTIONS,
} from "../../constants";
import {
  Typography,
  Select,
  InputNumber,
  Switch,
  Input,
  Button,
  Slider,
  Space,
  Collapse,
} from "antd";
import { Bold, Italic, Underline, RotateCcw } from "lucide-react";
import { CustomColorPicker } from "../common/CustomColorPicker";

const { Text } = Typography;
const { Panel } = Collapse;

/** Section khung sẵn có + toggle on/off */
const ConfigSection: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}> = ({
  title,
  children,
  isExpanded,
  onToggle,
  level = 0,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
}) => (
  <Collapse
    ghost
    size="small"
    activeKey={isExpanded ? ["1"] : []}
    onChange={onToggle}
    className="config-section"
  >
    <Panel
      header={
        <div className="ant-collapse-header-text">
          <Text strong style={{ fontSize: "13px" }}>
            {title}
          </Text>
          {hasToggle && (
            <Switch
              size="small"
              checked={toggleValue}
              onChange={(checked, e) => {
                e?.stopPropagation();
                onToggleChange?.(checked);
              }}
              className="section-toggle"
            />
          )}
        </div>
      }
      key="1"
    >
      <div
        className={
          level > 0 ? "config-section-indent" : "config-section-no-indent"
        }
      >
        {children}
      </div>
    </Panel>
  </Collapse>
);

/** Cụm điều khiển font mặc định (font, size, bold/italic/underline, color) */
const FontControls: React.FC<{
  config: any;
  section: string;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ config, section, onUpdate }) => (
  <div className="font-controls">
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <div className="font-controls-grid">
        <div>
          <Typography.Text
            style={{ fontSize: 12, display: "block", marginBottom: 4 }}
          >
            Font
          </Typography.Text>
          <Select
            size="small"
            value={config.font || "Segoe UI"}
            onChange={(v) => onUpdate(section, "font", v)}
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
          <Typography.Text
            style={{ fontSize: 12, display: "block", marginBottom: 4 }}
          >
            Size
          </Typography.Text>
          <InputNumber
            size="small"
            value={config.fontSize || 9}
            min={6}
            max={72}
            onChange={(v) => onUpdate(section, "fontSize", v)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div>
        <Typography.Text
          style={{ fontSize: 12, display: "block", marginBottom: 4 }}
        >
          Formatting
        </Typography.Text>
        <Space size="small">
          <Button
            size="small"
            type={config.bold ? "primary" : "default"}
            icon={<Bold size={12} />}
            onClick={() => onUpdate(section, "bold", !config.bold)}
          />
          <Button
            size="small"
            type={config.italic ? "primary" : "default"}
            icon={<Italic size={12} />}
            onClick={() => onUpdate(section, "italic", !config.italic)}
          />
          <Button
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
        onChange={(color) => onUpdate(section, "color", color)}
      />
    </Space>
  </div>
);

const FormatConfigTab: React.FC = () => {
  const dispatch = useDispatch();
  const { chartType, expandedSections, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;

  const currentConfig = chartConfigs[chartType];
  const formatConfig = currentConfig.format;

  const handleToggleSection = (section: string) =>
    dispatch(toggleSection(section));
  const handleUpdateFormatConfig = (section: string, key: string, value: any) =>
    dispatch(updateFormatConfig({ section, key, value }));

  const getAvailableFormatSections = () => {
    const common: string[] = ["legend"];
    switch (chartType) {
      case "stackedColumn":
      case "clusteredColumn":
      case "stackedBar":
      case "clusteredBar":
      case "line":
      case "lineAndColumn":
        return [...common, "xAxis", "yAxis", "dataLabels", "gridlines"];
      case "pie":
        return [...common, "dataLabels", "slices", "rotation"];
      default:
        return [...common, "xAxis", "yAxis", "dataLabels", "gridlines"];
    }
  };

  const renderSectionContent = (sectionKey: string) => {
    const config = (formatConfig as any)[sectionKey] || {};

    switch (sectionKey) {
      case "legend":
        return (
          <div className="properties-container">
            <ConfigSection
              title="Options"
              isExpanded={expandedSections.legendOptions}
              onToggle={() => handleToggleSection("legendOptions")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Position
                  </Typography.Text>
                  <Select
                    size="small"
                    value={config.position || "Top"}
                    onChange={(v) =>
                      handleUpdateFormatConfig(sectionKey, "position", v)
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

            <ConfigSection
              title="Text"
              isExpanded={expandedSections.legendText}
              onToggle={() => handleToggleSection("legendText")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">Font</Typography.Text>
                  <div className="font-controls">
                    <Select
                      size="small"
                      value={config.font || "Segoe UI"}
                      onChange={(v) =>
                        handleUpdateFormatConfig(sectionKey, "font", v)
                      }
                      style={{ width: 120 }}
                      options={FONT_FAMILY_OPTIONS}
                    />
                    <InputNumber
                      size="small"
                      value={config.fontSize || 10}
                      onChange={(v) =>
                        handleUpdateFormatConfig(sectionKey, "fontSize", v)
                      }
                      style={{ width: 60 }}
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
                        handleUpdateFormatConfig(
                          sectionKey,
                          "bold",
                          !config.bold
                        )
                      }
                    />
                    <Button
                      size="small"
                      type={config.italic ? "primary" : "default"}
                      icon={<Italic size={12} />}
                      onClick={() =>
                        handleUpdateFormatConfig(
                          sectionKey,
                          "italic",
                          !config.italic
                        )
                      }
                    />
                    <Button
                      size="small"
                      type={config.underline ? "primary" : "default"}
                      icon={<Underline size={12} />}
                      onClick={() =>
                        handleUpdateFormatConfig(
                          sectionKey,
                          "underline",
                          !config.underline
                        )
                      }
                    />
                  </div>
                </div>

                <CustomColorPicker
                  label="Color"
                  value={config.color}
                  onChange={(c) =>
                    handleUpdateFormatConfig(sectionKey, "color", c)
                  }
                />
              </div>
            </ConfigSection>

            <ConfigSection
              title="Title"
              isExpanded={expandedSections.legendTitle}
              onToggle={() => handleToggleSection("legendTitle")}
              hasToggle
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

            <div className="reset-section">
              <Button
                type="link"
                icon={<RotateCcw size={14} />}
                style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
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
            <CustomColorPicker
              label="Color"
              value={config.color}
              onChange={(c) => handleUpdateFormatConfig(sectionKey, "color", c)}
            />
            <div className="form-group">
              <Typography.Text className="form-label">
                Stroke Width
              </Typography.Text>
              <InputNumber
                size="small"
                value={config.strokeWidth || 1}
                min={1}
                max={10}
                onChange={(v) =>
                  handleUpdateFormatConfig(sectionKey, "strokeWidth", v)
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
                onChange={(v) =>
                  handleUpdateFormatConfig(sectionKey, "enabled", v)
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
                onChange={(v) =>
                  handleUpdateFormatConfig(sectionKey, "angle", v)
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      case "xAxis": {
        // Column/Line charts: x = categories; Bar: x = numeric range
        if (
          [
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
                hasToggle
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.valuesFont || "Segoe UI"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                        <Select.Option value="DIN">DIN</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.valuesFontSize || 9}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <CustomColorPicker
                    label="Color"
                    value={config.valuesColor}
                    onChange={(c) =>
                      handleUpdateFormatConfig("xAxis", "valuesColor", c)
                    }
                  />
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum height
                    </Typography.Text>
                    <div className="transparency-control">
                      <InputNumber
                        size="small"
                        value={config.maxHeight || 25}
                        min={0}
                        max={100}
                        formatter={(v) => `${v}%`}
                        parser={(v) =>
                          Number((v ?? "").toString().replace("%", ""))
                        }
                        style={{ width: 60 }}
                      />
                      <Slider
                        min={0}
                        max={100}
                        value={config.maxHeight || 25}
                        style={{ flex: 1, marginLeft: 8 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Concatenate labels
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.concatenateLabels || false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.xAxisTitle || false}
                onToggle={() => handleToggleSection("xAxisTitle")}
                hasToggle
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
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Style
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.titleStyle || "Show title only"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Show title only">
                        Show title only
                      </Select.Option>
                      <Select.Option value="Show title and units">
                        Show title and units
                      </Select.Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.titleFont || "DIN"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="DIN">DIN</Select.Option>
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.titleFontSize || 12}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <CustomColorPicker
                    label="Color"
                    value={config.titleColor}
                    onChange={(c) =>
                      handleUpdateFormatConfig("xAxis", "titleColor", c)
                    }
                  />
                </div>
              </ConfigSection>

              <ConfigSection
                title="Layout"
                isExpanded={expandedSections.xAxisLayout || false}
                onToggle={() => handleToggleSection("xAxisLayout")}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Minimum category width
                    </Typography.Text>
                    <div className="transparency-control">
                      <InputNumber
                        size="small"
                        value={config.minCategoryWidth || 20}
                        min={0}
                        max={100}
                        formatter={(v) => `${v}px`}
                        parser={(v) =>
                          Number((v ?? "").toString().replace("px", ""))
                        }
                        style={{ width: 60 }}
                      />
                      <Slider
                        min={0}
                        max={100}
                        value={config.minCategoryWidth || 20}
                        style={{ flex: 1, marginLeft: 8 }}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>
            </div>
          );
        }

        if (BAR_CHART_TYPES.includes(chartType)) {
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
                    <div className="range-input-group">
                      <Input
                        size="small"
                        value={config.rangeMin || "Auto"}
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum
                    </Typography.Text>
                    <div className="range-input-group">
                      <Input
                        size="small"
                        value={config.rangeMax || "Auto"}
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Logarithmic scale
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.logarithmicScale || false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Values"
                isExpanded={expandedSections.xAxisValues || false}
                onToggle={() => handleToggleSection("xAxisValues")}
                hasToggle
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.valuesFont || "Segoe UI"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                        <Select.Option value="DIN">DIN</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.valuesFontSize || 9}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Color
                    </Typography.Text>
                    <div className="color-picker-row">
                      <CustomColorPicker
                        label=""
                        value={config.valuesColor || "#1677FF"}
                        onChange={(c) =>
                          handleUpdateFormatConfig("xAxis", "valuesColor", c)
                        }
                        size="small"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Units
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.valuesUnits || "Auto"}
                      style={{ width: "100%" }}
                      options={[
                        { label: "Auto", value: "Auto" },
                        { label: "None", value: "None" },
                        { label: "Hundreds", value: "Hundreds" },
                        { label: "Thousands", value: "Thousands" },
                        { label: "Millions", value: "Millions" },
                        { label: "Billions", value: "Billions" },
                        { label: "Trillions", value: "Trillions" },
                      ]}
                    />
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Precision
                    </Typography.Text>
                    <InputNumber
                      size="small"
                      value={config.precision || 0}
                      min={0}
                      max={4}
                      onChange={(v) =>
                        handleUpdateFormatConfig(sectionKey, "precision", v)
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.xAxisTitle || false}
                onToggle={() => handleToggleSection("xAxisTitle")}
                hasToggle
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
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Style
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.titleStyle || "Show title only"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Show title only">
                        Show title only
                      </Select.Option>
                      <Select.Option value="Show title and units">
                        Show title and units
                      </Select.Option>
                    </Select>
                  </div>
                  <FontControls
                    config={config}
                    section={sectionKey}
                    onUpdate={handleUpdateFormatConfig}
                  />
                </div>
              </ConfigSection>
            </div>
          );
        }

        return (
          <div className="section-content">
            <FontControls
              config={config}
              section={sectionKey}
              onUpdate={handleUpdateFormatConfig}
            />
          </div>
        );
      }

      case "yAxis": {
        if (
          [
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
                    <div className="range-input-group">
                      <Input
                        size="small"
                        value={config.rangeMin || "Auto"}
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum
                    </Typography.Text>
                    <div className="range-input-group">
                      <Input
                        size="small"
                        value={config.rangeMax || "Auto"}
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Logarithmic scale
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.logarithmicScale || false}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Invert range
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.invertRange || false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Values"
                isExpanded={expandedSections.yAxisValues || false}
                onToggle={() => handleToggleSection("yAxisValues")}
                hasToggle
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.valuesFont || "Segoe UI"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                        <Select.Option value="DIN">DIN</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.valuesFontSize || 9}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Color
                    </Typography.Text>
                    <div className="color-picker-row">
                      <CustomColorPicker
                        label=""
                        value={config.valuesColor || "#1677FF"}
                        onChange={(c) =>
                          handleUpdateFormatConfig("yAxis", "valuesColor", c)
                        }
                        size="small"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Display units
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.displayUnits || "Auto"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Auto">Auto</Select.Option>
                      <Select.Option value="None">None</Select.Option>
                      <Select.Option value="Thousands">Thousands</Select.Option>
                      <Select.Option value="Millions">Millions</Select.Option>
                      <Select.Option value="Billions">Billions</Select.Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Value decimal places
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.valueDecimalPlaces || "Auto"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Auto">Auto</Select.Option>
                      <Select.Option value="0">0</Select.Option>
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Switch axis position
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.switchAxisPosition || false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.yAxisTitle || false}
                onToggle={() => handleToggleSection("yAxisTitle")}
                hasToggle
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
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Style
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.titleStyle || "Show title only"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Show title only">
                        Show title only
                      </Select.Option>
                      <Select.Option value="Show title and units">
                        Show title and units
                      </Select.Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.titleFont || "DIN"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="DIN">DIN</Select.Option>
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.titleFontSize || 12}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Color
                    </Typography.Text>
                    <div className="color-picker-row">
                      <CustomColorPicker
                        label=""
                        value={config.titleColor || "#1677FF"}
                        onChange={(c) =>
                          handleUpdateFormatConfig("yAxis", "titleColor", c)
                        }
                        size="small"
                        showLabel={false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>
            </div>
          );
        }

        if (BAR_CHART_TYPES.includes(chartType)) {
          return (
            <div className="properties-container">
              <ConfigSection
                title="Values"
                isExpanded={expandedSections.yAxisValues || false}
                onToggle={() => handleToggleSection("yAxisValues")}
                hasToggle
                toggleValue={config.valuesEnabled !== false}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.valuesFont || "Segoe UI"}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                        <Select.Option value="Arial">Arial</Select.Option>
                        <Select.Option value="DIN">DIN</Select.Option>
                      </Select>
                      <InputNumber
                        size="small"
                        value={config.valuesFontSize || 9}
                        min={8}
                        max={72}
                        style={{ width: 60 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-format-buttons">
                      <Button size="small" icon={<Bold size={12} />} />
                      <Button size="small" icon={<Italic size={12} />} />
                      <Button size="small" icon={<Underline size={12} />} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Color
                    </Typography.Text>
                    <div className="color-picker-row">
                      <CustomColorPicker
                        label=""
                        value={config.valuesColor || "#1677FF"}
                        onChange={(c) =>
                          handleUpdateFormatConfig("yAxis", "valuesColor", c)
                        }
                        size="small"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Maximum height
                    </Typography.Text>
                    <div className="transparency-control">
                      <InputNumber
                        size="small"
                        value={config.maxHeight || 25}
                        min={0}
                        max={100}
                        formatter={(v) => `${v}%`}
                        parser={(v) =>
                          Number((v ?? "").toString().replace("%", ""))
                        }
                        style={{ width: 60 }}
                      />
                      <Slider
                        min={0}
                        max={100}
                        value={config.maxHeight || 25}
                        style={{ flex: 1, marginLeft: 8 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        Concatenate labels
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={config.concatenateLabels || false}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Layout"
                isExpanded={expandedSections.yAxisLayout || false}
                onToggle={() => handleToggleSection("yAxisLayout")}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Minimum category width
                    </Typography.Text>
                    <div className="transparency-control">
                      <InputNumber
                        size="small"
                        value={config.minCategoryWidth || 20}
                        min={0}
                        max={100}
                        formatter={(v) => `${v}px`}
                        parser={(v) =>
                          Number((v ?? "").toString().replace("px", ""))
                        }
                        style={{ width: 60 }}
                      />
                      <Slider
                        min={0}
                        max={100}
                        value={config.minCategoryWidth || 20}
                        style={{ flex: 1, marginLeft: 8 }}
                      />
                    </div>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.yAxisTitle || false}
                onToggle={() => handleToggleSection("yAxisTitle")}
                hasToggle
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
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Style
                    </Typography.Text>
                    <Select
                      size="small"
                      value={config.titleStyle || "Show title only"}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Show title only">
                        Show title only
                      </Select.Option>
                      <Select.Option value="Show title and units">
                        Show title and units
                      </Select.Option>
                    </Select>
                  </div>
                  <FontControls
                    config={config}
                    section={sectionKey}
                    onUpdate={handleUpdateFormatConfig}
                  />
                </div>
              </ConfigSection>
            </div>
          );
        }

        return (
          <div className="section-content">
            <FontControls
              config={config}
              section={sectionKey}
              onUpdate={handleUpdateFormatConfig}
            />
          </div>
        );
      }

      default:
        return (
          <div className="section-content">
            <FontControls
              config={config}
              section={sectionKey}
              onUpdate={handleUpdateFormatConfig}
            />
          </div>
        );
    }
  };

  return (
    <div className="format-config-tab visual-tab">
      <div className="config-sections">
        {getAvailableFormatSections().includes("legend") && (
          <ConfigSection
            title="Legend"
            isExpanded={expandedSections.legend}
            onToggle={() => handleToggleSection("legend")}
            hasToggle
            toggleValue={(formatConfig as any).legend?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("legend", "enabled", v)
            }
          >
            {renderSectionContent("legend")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("title") && (
          <ConfigSection
            title="Title"
            isExpanded={expandedSections.title}
            onToggle={() => handleToggleSection("title")}
            hasToggle
            toggleValue={(formatConfig as any).title?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("title", "enabled", v)
            }
          >
            {renderSectionContent("title")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("dataLabels") && (
          <ConfigSection
            title="Data labels"
            isExpanded={expandedSections.dataLabels}
            onToggle={() => handleToggleSection("dataLabels")}
            hasToggle
            toggleValue={(formatConfig as any).dataLabels?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("dataLabels", "enabled", v)
            }
          >
            {renderSectionContent("dataLabels")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("gridlines") && (
          <ConfigSection
            title="Gridlines"
            isExpanded={expandedSections.gridlines}
            onToggle={() => handleToggleSection("gridlines")}
            hasToggle
            toggleValue={(formatConfig as any).gridlines?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("gridlines", "enabled", v)
            }
          >
            {renderSectionContent("gridlines")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("slices") && (
          <ConfigSection
            title="Slices"
            isExpanded={expandedSections.slices}
            onToggle={() => handleToggleSection("slices")}
            hasToggle
            toggleValue={(formatConfig as any).slices?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("slices", "enabled", v)
            }
          >
            {renderSectionContent("slices")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("rotation") && (
          <ConfigSection
            title="Rotation"
            isExpanded={expandedSections.rotation}
            onToggle={() => handleToggleSection("rotation")}
            hasToggle
            toggleValue={(formatConfig as any).rotation?.enabled !== false}
            onToggleChange={(v) =>
              handleUpdateFormatConfig("rotation", "enabled", v)
            }
          >
            {renderSectionContent("rotation")}
          </ConfigSection>
        )}

        {getAvailableFormatSections().includes("xAxis") && (
          <ConfigSection
            title="X-axis"
            isExpanded={expandedSections.xAxis}
            onToggle={() => handleToggleSection("xAxis")}
          >
            {renderSectionContent("xAxis")}
          </ConfigSection>
        )}

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

      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default FormatConfigTab;
