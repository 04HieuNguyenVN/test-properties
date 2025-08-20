// Nhập các thư viện React, Redux và các hook cần thiết
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Nhập các file CSS style cho giao diện
import "./styles/dashboard.css";
import "./styles/chart.css";
import "./styles/field-selector.css";
import "./styles/properties-panel.css";
import "./styles/data-config.css";
import "./styles/format-config.css";
import "./styles/general-config.css";
import "./styles/sections.css";
import "./styles/components.css";
import "./styles/overrides.css";
import "./styles/custom-color-picker.css";
import "./styles/data-display.css";

// Nhập các hằng số cấu hình, danh sách field, loại chart, ...
import {
  DATA_SOURCE_OPTIONS,
  TABLE_OPTIONS,
  FIELD_OPTIONS,
  FIELD_ACTION_OPTIONS,
  FIELD_DISPLAY_NAMES,
  CHART_AVAILABLE_FIELDS,
  SIMPLE_CHART_TYPES,
  SINGLE_FIELD_TYPES,
  FIELD_RESTRICTIONS,
  FONT_FAMILY_OPTIONS,
  BAR_CHART_TYPES,
  REQUIRED_SECTIONS,
  DEFAULT_AVAILABLE_FIELDS,
  TITLE_DISPLAY_OPTIONS,
} from "./constants/index";

// Nhập các component biểu đồ
import {
  StackedColumnChart,
  ClusteredColumnChart,
  PieChart as CustomPieChart,
  LineChart as CustomLineChart,
  LineAndColumnChart,
  StackedBarChart,
  ClusteredBarChart,
} from "./components/charts";
import chartData from "./data/chartData.json";

// Nhập component hiển thị panel dữ liệu
import DataDisplayPanels from "./components/DataDisplayPanels";
import { DataTab } from "./components/Tabs/DataTab";

// Nhập các component UI từ thư viện Ant Design
import {
  Layout,
  Card,
  Tabs,
  Button,
  Select,
  Switch,
  InputNumber,
  ColorPicker,
  Typography,
  Space,
  Collapse,
  Dropdown,
  Menu,
  Divider,
  Input,
  Slider,
} from "antd";
const { TextArea } = Input;

// Nhập các component tuỳ chỉnh (custom)
import { CustomColorPicker } from "./components/common/CustomColorPicker";
// import { FunctionButton } from "./components/common/FunctionButton";

// Nhập các icon từ thư viện Lucide React
import {
  ChevronDown,
  ChevronRight,
  X,
  Check,
  Search,
  Copy,
  Eye,
  Bold,
  Italic,
  Underline,
  Plus,
  RotateCcw,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  BarChart4,
  BarChart2,
  LineChart as LineChartIcon,
  FunctionSquare,
} from "lucide-react";
import { RootState } from "./store/store";
// Nhập các action và kiểu dữ liệu Redux từ store
import {
  setChartType,
  setActiveTab,
  setActiveSubTab,
  toggleSection,
  removeDataItem,
  updateFieldType,
  updateFormatConfig,
  ChartState,
} from "./store/chartSlice";

// Tách các component cần dùng từ Ant Design
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

// Định nghĩa các route cho từng loại biểu đồ
const chartRoutes = [
  {
    name: "clustered-bar",
    label: "Clustered Bar Chart",
    ChartComponent: ClusteredBarChart,
  },
  {
    name: "clustered-column",
    label: "Clustered Column Chart",
    ChartComponent: ClusteredColumnChart,
  },
  {
    name: "line-and-column",
    label: "Line and Column Chart",
    ChartComponent: LineAndColumnChart,
  },
  {
    name: "line",
    label: "Line Chart",
    ChartComponent: CustomLineChart,
  },
  {
    name: "pie",
    label: "Pie Chart",
    ChartComponent: CustomPieChart,
  },
  {
    name: "stacked-bar",
    label: "Stacked Bar Chart",
    ChartComponent: StackedBarChart,
  },
  {
    name: "stacked-column",
    label: "Stacked Column Chart",
    ChartComponent: StackedColumnChart,
  },
];

// Component chính của ứng dụng Dashboard
const PowerBIDashboard: React.FC = () => {
  const { i18n } = useTranslation();
  // Tạo dispatch để gửi action tới Redux
  const dispatch = useDispatch();

  // Lấy state từ Redux store
  const {
    data, // Dữ liệu chính cho biểu đồ
    categoryData, // Dữ liệu phân loại
    monthlyData, // Dữ liệu theo tháng
    populationData, // Dữ liệu dân số
    testStackedData, // Dữ liệu test cho stacked chart
    chartType, // Loại biểu đồ hiện tại
    activeTab, // Tab đang chọn (Data/Format/General)
    activeSubTab, // Sub-tab đang chọn
    expandedSections, // Các mục đang mở rộng
    chartConfigs, // Cấu hình cho các loại biểu đồ
  } = useSelector((state: RootState) => state.chart) as ChartState;

  // Lấy cấu hình của loại biểu đồ đang chọn
  const currentConfig = chartConfigs[chartType];

  // Hàm xử lý mở/đóng section
  const handleToggleSection = (section: string) => {
    dispatch(toggleSection(section));
  };

  // Hàm xử lý xóa field khỏi category
  const handleRemoveDataItem = (category: string, fieldName: string) => {
    dispatch(removeDataItem({ category, fieldName }));
  };

  // Hàm xử lý thay đổi loại field (sum/count/average)
  const handleFieldTypeChange = (
    fieldName: string,
    newType: "sum" | "count" | "average",
    category: string
  ) => {
    dispatch(updateFieldType({ fieldName, newType, category }));
  };

  // Handler để cập nhật cấu hình format
  const handleUpdateFormatConfig = (
    section: string,
    key: string,
    value: any
  ) => {
    dispatch(updateFormatConfig({ section, key, value }));
  };

  // Component dropdown để hiển thị và chỉnh sửa field options
  const FieldDropdown: React.FC<{
    field: { name: string; type: string };
    onRemove: () => void;
    onFieldTypeChange: (
      name: string,
      type: "sum" | "count" | "average",
      category: string
    ) => void;
    category: string;
  }> = ({ field, onRemove, onFieldTypeChange, category }) => {
    const menu = (
      <Menu
        items={[
          {
            key: "sum",
            label: (
              <Space>
                <span>Đổi sang tổng</span>
                {field.type === "sum" && <Check size={12} />}
              </Space>
            ),
            onClick: () => onFieldTypeChange(field.name, "sum", category),
          },
          {
            key: "count",
            label: (
              <Space>
                <span>Đổi sang đếm</span>
                {field.type === "count" && <Check size={12} />}
              </Space>
            ),
            onClick: () => onFieldTypeChange(field.name, "count", category),
          },
          {
            key: "average",
            label: (
              <Space>
                <span>Đổi sang trung bình</span>
                {field.type === "average" && <Check size={12} />}
              </Space>
            ),
            onClick: () => onFieldTypeChange(field.name, "average", category),
          },
          { type: "divider" },
          {
            key: "show-empty",
            label: "Hiển thị các mục không có dữ liệu",
          },
          {
            key: "filter",
            label: "Lọc",
          },
          {
            key: "rename",
            label: "Đổi tên cho cột này...",
          },
        ]}
      />
    );

    return (
      <div className="field-dropdown-container">
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
          <div className="field-selector">
            <span className="field-name">{field.name}</span>
            <Space size={4} className="field-controls">
              <ChevronDown size={12} className="dropdown-icon" />
              <div
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <X size={10} />
              </div>
            </Space>
          </div>
        </Dropdown>
      </div>
    );
  };

  const renderChart = () => {
    const config = currentConfig.format;
    // Lấy đúng data cho từng loại chart
    let chartRawData: any[] = [];
    if (chartType === "stackedColumn") {
      chartRawData = chartData.monthlyData;
    } else if (chartType === "stackedBar") {
      chartRawData = chartData.stackedData;
    } else if (
      chartType === "clusteredColumn" ||
      chartType === "clusteredBar" ||
      chartType === "lineAndColumn" ||
      chartType === "line"
    ) {
      chartRawData = chartData.monthlyData;
    } else if (chartType === "pie") {
      chartRawData = chartData.categories;
    } else {
      chartRawData = [];
    }

    switch (chartType) {
      case "stackedColumn":
        // Truyền data từ chartData.monthlyData vào StackedColumnChart
        return (
          <StackedColumnChart config={config} data={chartData.monthlyData} />
        );
      case "clusteredColumn":
        return (
          <ClusteredColumnChart config={config} data={chartData.monthlyData} />
        );
      case "lineAndColumn":
        return (
          <LineAndColumnChart config={config} data={chartData.monthlyData} />
        );
      case "pie":
        return <CustomPieChart config={config} data={chartData.categories} />;
      case "line":
        return <CustomLineChart config={config} data={chartData.monthlyData} />;
      case "stackedBar":
        return <StackedBarChart config={config} data={chartData.stackedData} />;
      case "clusteredBar":
        return (
          <ClusteredBarChart config={config} data={chartData.monthlyData} />
        );
      default:
        return null;
    }
  };

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

  const FontControls: React.FC<{ config: any; section: string }> = ({
    config,
    section,
  }) => (
    <div className="font-controls">
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div className="font-controls-grid">
          <div>
            <Typography.Text
              style={{
                fontSize: "12px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Font
            </Typography.Text>
            <Select
              title="Chọn font chữ cho nhãn"
              size="small"
              value={config.font || "Segoe UI"}
              onChange={(value) =>
                handleUpdateFormatConfig(section, "font", value)
              }
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
              style={{
                fontSize: "12px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Size
            </Typography.Text>
            <InputNumber
              title="Chọn cỡ chữ cho nhãn"
              size="small"
              value={config.fontSize || 9}
              min={6}
              max={72}
              onChange={(value) =>
                handleUpdateFormatConfig(section, "fontSize", value)
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <Typography.Text
            style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}
          >
            Formatting
          </Typography.Text>
          <Space size="small">
            <Button
              title="In đậm"
              size="small"
              type={config.bold ? "primary" : "default"}
              icon={<Bold size={12} />}
              onClick={() =>
                handleUpdateFormatConfig(section, "bold", !config.bold)
              }
            />
            <Button
              title="In nghiêng"
              size="small"
              type={config.italic ? "primary" : "default"}
              icon={<Italic size={12} />}
              onClick={() =>
                handleUpdateFormatConfig(section, "italic", !config.italic)
              }
            />
            <Button
              title="Gạch chân"
              size="small"
              type={config.underline ? "primary" : "default"}
              icon={<Underline size={12} />}
              onClick={() =>
                handleUpdateFormatConfig(
                  section,
                  "underline",
                  !config.underline
                )
              }
            />
          </Space>
        </div>

        <CustomColorPicker
          label="Color"
          value={config.color}
          onChange={(color) =>
            handleUpdateFormatConfig(section, "color", color)
          }
        />
      </Space>
    </div>
  );

  // Component tab cấu hình dữ liệu (Data tab)

  const FormatConfigTab = () => {
    const formatConfig = currentConfig.format;

    // Define format sections available for each chart type
    const getAvailableFormatSections = () => {
      const commonSections = ["legend"];

      switch (chartType) {
        case "stackedColumn": // Stacked Column Chart
        case "clusteredColumn": // Clustered Column Chart
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "dataLabels",
            "gridlines",
          ];
        case "stackedBar": // Stacked Bar Chart
        case "clusteredBar": // Clustered Bar Chart
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "dataLabels",
            "gridlines",
          ];
        case "pie": // Pie Chart
          return [...commonSections, "dataLabels", "slices", "rotation"];
        case "line": // Line Chart
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "gridlines",
            "dataLabels",
          ];
        case "lineAndColumn": // Line and Column Chart
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "gridlines",
            "dataLabels",
          ];
        default:
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "dataLabels",
            "gridlines",
          ];
      }
    };

    const getSectionToggleStatus = (sectionKey: string) => {
      // Define which sections should have toggles
      const sectionsWithToggle = [
        "legend",
        "dataLabels",
        "gridlines",
        "slices",
        "rotation",
      ];
      const sectionsWithoutToggle = REQUIRED_SECTIONS; // Required sections

      return {
        hasToggle: sectionsWithToggle.includes(sectionKey),
        isRequired: sectionsWithoutToggle.includes(sectionKey),
      };
    };

    const renderSectionContent = (sectionKey: string) => {
      const config = (formatConfig as any)[sectionKey] || {};

      switch (sectionKey) {
        case "legend":
          return (
            <div className="properties-container">
              <ConfigSection
                title="Options" // Tiêu đề của sub-section
                isExpanded={expandedSections.legendOptions} // Trạng thái mở/đóng từ Redux store
                onToggle={() => dispatch(toggleSection("legendOptions"))} // Hàm toggle trạng thái
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Position
                    </Typography.Text>
                    <Select
                      size="small" // Kích thước nhỏ gọn cho giao diện
                      value={config.position || "Top"} // Giá trị hiện tại, mặc định "Top"
                      onChange={(value) =>
                        handleUpdateFormatConfig(sectionKey, "position", value)
                      } // Cập nhật vào Redux store khi thay đổi
                      style={{ width: "100%" }} // Chiếm toàn bộ chiều rộng
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
                onToggle={() => dispatch(toggleSection("legendText"))}
              >
                <div className="section-content">
                  <div className="form-group">
                    <Typography.Text className="form-label">
                      Font
                    </Typography.Text>
                    <div className="font-controls">
                      <Select
                        size="small"
                        value={config.font || "Segoe UI"} // Mặc định Segoe UI
                        onChange={(value) =>
                          handleUpdateFormatConfig(sectionKey, "font", value)
                        }
                        style={{ width: "120px" }} // Chiều rộng cố định 120px
                      >
                        {FONT_FAMILY_OPTIONS.map((font: any) => (
                          <Select.Option key={font.value} value={font.value}>
                            {font.label}
                          </Select.Option>
                        ))}
                      </Select>

                      <InputNumber
                        size="small"
                        value={config.fontSize || 10} // Mặc định 10px
                        onChange={(value) =>
                          handleUpdateFormatConfig(
                            sectionKey,
                            "fontSize",
                            value
                          )
                        }
                        style={{ width: "60px" }} // Chiều rộng cố định 60px
                        min={8} // Kích thước tối thiểu
                        max={72} // Kích thước tối đa
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="text-format-buttons">
                      {/* BOLD BUTTON */}
                      <Button
                        size="small"
                        type={config.bold ? "primary" : "default"} // Active state styling
                        icon={<Bold size={12} />} // Icon từ lucide-react
                        onClick={() =>
                          handleUpdateFormatConfig(
                            sectionKey,
                            "bold",
                            !config.bold // Toggle giá trị boolean
                          )
                        }
                      />

                      {/* ITALIC BUTTON */}
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

                      {/* UNDERLINE BUTTON */}
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
                    onChange={(color) =>
                      handleUpdateFormatConfig(sectionKey, "color", color)
                    }
                  />
                </div>
              </ConfigSection>

              <ConfigSection
                title="Title"
                isExpanded={expandedSections.legendTitle}
                onToggle={() => dispatch(toggleSection("legendTitle"))}
                hasToggle={true} // Bật tính năng toggle on/off
                toggleValue={config.title?.enabled !== false} // Trạng thái toggle
                onToggleChange={(checked) =>
                  handleUpdateFormatConfig(sectionKey, "title", {
                    ...config.title, // Giữ nguyên các thuộc tính khác
                    enabled: checked, // Cập nhật trạng thái enabled
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
                      value={config.title?.text || "Legend"} // Mặc định "Legend"
                      onChange={(e) =>
                        handleUpdateFormatConfig(sectionKey, "title", {
                          ...config.title, // Spread existing properties
                          text: e.target.value, // Cập nhật text mới
                        })
                      }
                      style={{ width: "100%" }} // Chiếm toàn bộ chiều rộng
                    />
                  </div>
                </div>
              </ConfigSection>

              <div className="reset-section">
                <Button
                  type="link" // Style như link, không có border
                  icon={<RotateCcw size={14} />} // Icon xoay ngược (reset)
                  style={{
                    padding: "16px",
                    fontSize: "12px",
                    color: "#0078d4", // Màu xanh Microsoft
                  }}
                  onClick={() => {
                    // Reset legend config to default values
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
                onChange={(color) =>
                  handleUpdateFormatConfig(sectionKey, "color", color)
                }
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
          // Enhanced X-axis - different content for bar vs column charts
          if (
            [
              "stackedColumn",
              "clusteredColumn",
              "line",
              "lineAndColumn",
            ].includes(chartType)
          ) {
            // For column charts: X-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.xAxisValues || false}
                  onToggle={() => handleToggleSection("xAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("xAxis", "valuesColor", color)
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Title subsection */}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("xAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>

                {/* Layout subsection */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: X-axis shows Range (numeric values)
            return (
              <div className="properties-container">
                {/* Range subsection */}
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
                          style={{ width: "100px" }}
                        />
                        {/* <FunctionButton /> */}
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
                          style={{ width: "100px" }}
                        />
                        {/* <FunctionButton /> */}
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

                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.xAxisValues || false}
                  onToggle={() => handleToggleSection("xAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "xAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                        onChange={(value) =>
                          handleUpdateFormatConfig(
                            sectionKey,
                            "precision",
                            value
                          )
                        }
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </ConfigSection>

                {/* Title subsection */}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("xAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>
              </div>
            );
          }
          // For other chart types, use default FontControls
          return (
            <div className="section-content">
              <FontControls config={config} section={sectionKey} />
            </div>
          );

        case "yAxis":
          // Enhanced Y-axis - different content for bar vs column charts
          if (
            [
              "stackedColumn",
              "clusteredColumn",
              "line",
              "lineAndColumn",
            ].includes(chartType)
          ) {
            // For column charts: Y-axis shows Range (numeric values)
            return (
              <div className="properties-container">
                {/* Range subsection */}
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
                          style={{ width: "100px" }}
                        />
                        {/* <FunctionButton /> */}
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
                          style={{ width: "100px" }}
                        />
                        {/* <FunctionButton /> */}
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

                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                        <Select.Option value="Thousands">
                          Thousands
                        </Select.Option>
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

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>

                {/* Layout subsection */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: Y-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Layout subsection for bar charts */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: Y-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>

                {/* Layout subsection */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: Y-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Layout subsection for bar charts */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: Y-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>
              </div>
            );
          } else if (BAR_CHART_TYPES.includes(chartType)) {
            // For bar charts: Y-axis shows Values (categories)
            return (
              <div className="properties-container">
                {/* Values subsection */}
                <ConfigSection
                  title="Values"
                  isExpanded={expandedSections.yAxisValues || false}
                  onToggle={() => handleToggleSection("yAxisValues")}
                  hasToggle={true}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                          <Select.Option value="DIN">DIN</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.valuesFontSize || 9}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                          onChange={(color) =>
                            handleUpdateFormatConfig(
                              "yAxis",
                              "valuesColor",
                              color
                            )
                          }
                          size="small"
                          showLabel={false}
                        />
                        {/* <FunctionButton /> */}
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
                          formatter={(value) => `${value}%`}
                          parser={(value) => Number(value!.replace("%", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.maxHeight || 25}
                          style={{ flex: 1, marginLeft: "8px" }}
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

                {/* Layout subsection for bar charts */}
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
                          formatter={(value) => `${value}px`}
                          parser={(value) => Number(value!.replace("px", ""))}
                          style={{ width: "60px" }}
                        />
                        <Slider
                          min={0}
                          max={100}
                          value={config.minCategoryWidth || 20}
                          style={{ flex: 1, marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ConfigSection>

                {/* Title subsection */}
                <ConfigSection
                  title="Title"
                  isExpanded={expandedSections.yAxisTitle || false}
                  onToggle={() => handleToggleSection("yAxisTitle")}
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
                          style={{ width: "120px" }}
                        >
                          <Select.Option value="DIN">DIN</Select.Option>
                          <Select.Option value="Segoe UI">
                            Segoe UI
                          </Select.Option>
                          <Select.Option value="Arial">Arial</Select.Option>
                        </Select>
                        <InputNumber
                          size="small"
                          value={config.titleFontSize || 12}
                          min={8}
                          max={72}
                          style={{ width: "60px" }}
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
                      onChange={(color) =>
                        handleUpdateFormatConfig("yAxis", "titleColor", color)
                      }
                    />
                  </div>
                </ConfigSection>
              </div>
            );
          }
          // For other chart types, use default FontControls
          return (
            <div className="section-content">
              <FontControls config={config} section={sectionKey} />
            </div>
          );

        default:
          // For sections like xAxis, yAxis, dataLabels - use FontControls
          return (
            <div className="section-content">
              <FontControls config={config} section={sectionKey} />
            </div>
          );
      }
    };

    const getSectionTitle = (sectionKey: string) => {
      const titles: { [key: string]: string } = {
        legend: "Legend",
        title: "Title",
        xAxis: "X-axis",
        yAxis: "Y-axis",
        dataLabels: "Data labels",
        gridlines: "Gridlines",
        slices: "Slices",
        rotation: "Rotation",
      };
      return titles[sectionKey] || sectionKey;
    };

    return (
      <div className="format-config-tab visual-tab">
        {/* Format Configuration Sections - Flat structure */}
        <div className="config-sections">
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

          {/* Title Section */}
          {getAvailableFormatSections().includes("title") && (
            <ConfigSection
              title="Title"
              isExpanded={expandedSections.title}
              onToggle={() => handleToggleSection("title")}
              hasToggle={true}
              toggleValue={(formatConfig as any).title?.enabled !== false}
              onToggleChange={(value) =>
                handleUpdateFormatConfig("title", "enabled", value)
              }
            >
              {renderSectionContent("title")}
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

  const GeneralConfigTab = () => {
    const [generalSettings, setGeneralSettings] = useState({
      size: {
        height: 542,
        width: 595,
        lockAspectRatio: false,
      },
      position: {
        horizontal: 293,
        vertical: 82,
      },
      padding: {
        top: 0,
        right: 5,
        bottom: 5,
        left: 5,
      },
      advanced: {
        responsive: false,
        maintainLayerOrder: false,
      },
      title: {
        title: {
          enabled: true,
          text: "Sum of GDPGRDP 2",
          heading: "Heading 3",
          font: "DIN",
          fontSize: 14,
          bold: false,
          italic: false,
          underline: false,
          textColor: "#000000",
          backgroundColor: "#ffffff",
          horizontalAlignment: "left",
          textWrap: true,
        },
        subtitle: {
          enabled: false,
          text: "",
          heading: "Heading 4",
          font: "Segoe UI",
          fontSize: 10,
          bold: false,
          italic: false,
          underline: false,
          textColor: "#000000",
          horizontalAlignment: "left",
          textWrap: false,
        },
        divider: {
          enabled: false,
          color: "#000000",
          lineStyle: "Solid",
          width: 1,
          ignorePadding: false,
        },
        spacing: {
          customizeSpacing: false,
          spaceBetweenLabelAndValue: 5,
        },
      },
      effects: {
        background: {
          enabled: true,
          color: "#ffffff",
          transparency: 0,
        },
        visualBorder: {
          enabled: false,
          color: "#000000",
          roundedCorners: 0,
          width: 1,
        },
        shadow: {
          enabled: false,
          color: "#000000",
          offset: "Outside",
          position: "Bottom right",
        },
      },
      dataFormat: {
        applySettingsTo: "Khu vực",
        format: "",
      },
      headerIcons: {
        colors: {
          background: "#ffffff",
          border: "#000000",
          icon: "#000000",
          transparency: 0,
        },
        icons: {
          visualInformation: true,
          visualWarning: true,
          visualError: true,
          drillOnDropdown: true,
          drillUp: true,
          drillDown: true,
          showNextLevel: true,
          expandToNextLevel: true,
          pin: true,
          focusMode: true,
          seeDataLayout: true,
          moreOptions: true,
          filter: true,
          helpTooltip: false,
          commentButton: true,
          copyIcon: true,
          smartNarrative: false,
          seeAlertButton: true,
        },
      },
      tooltips: {
        options: {
          text: "Report page settings and configurations...",
        },
        text: {
          font: "Segoe UI",
          fontSize: 10,
          bold: false,
          italic: false,
          underline: false,
          labelColor: "#000000",
          valueColor: "#000000",
          drillTextAndIconColor: "#000000",
        },
        background: {
          color: "#ffffff",
          transparency: 0,
        },
      },
    });

    const [generalExpandedSections, setGeneralExpandedSections] = useState({
      // Main sections
      properties: false,
      title: false,
      effects: false,
      dataFormat: false,
      headerIcons: false,
      tooltips: false,

      // Properties sub-sections
      size: false,
      position: false,
      padding: false,
      advanced: false,

      // Title sub-sections
      titleSection: false,
      subtitle: false,
      divider: false,
      spacing: false,

      // Effects sub-sections
      background: false,
      visualBorder: false,
      shadow: false,

      // Data format sub-sections
      applySettingsTo: false,
      formatOptions: false,

      // Header icons sub-sections
      headerIconsColors: false,
      headerIconsIcons: false,

      // Tooltips sub-sections
      tooltipsOptions: false,
      tooltipsText: false,
      tooltipsBackground: false,
    });

    const updateGeneralSetting = (
      category: string,
      key: string,
      value: any
    ) => {
      setGeneralSettings((prev) => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [key]: value,
        },
      }));
    };

    const handleToggleGeneralSection = (section: string) => {
      setGeneralExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev],
      }));
    };

    return (
      <div className="general-config-tab general-tab">
        {/* Properties Section - Main Container */}
        <ConfigSection
          title="Properties"
          isExpanded={generalExpandedSections.properties}
          onToggle={() => handleToggleGeneralSection("properties")}
        >
          <div className="properties-container">
            {/* Size Sub-Section */}
            <ConfigSection
              title="Size"
              isExpanded={generalExpandedSections.size}
              onToggle={() => handleToggleGeneralSection("size")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text
                    className="form-label"
                    title="Chiều cao của biểu đồ"
                  >
                    Height
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.size.height}
                    onChange={(value) =>
                      updateGeneralSetting("size", "height", value)
                    }
                    style={{ width: "100%" }}
                    title="Nhập chiều cao (px)"
                  />
                </div>
                <div className="form-group">
                  <Typography.Text
                    className="form-label"
                    title="Chiều rộng của biểu đồ"
                  >
                    Width
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.size.width}
                    onChange={(value) =>
                      updateGeneralSetting("size", "width", value)
                    }
                    style={{ width: "100%" }}
                    title="Nhập chiều rộng (px)"
                  />
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Lock aspect ratio
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.size.lockAspectRatio}
                      onChange={(checked) =>
                        updateGeneralSetting("size", "lockAspectRatio", checked)
                      }
                      title="Khóa tỉ lệ khung hình"
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Position Sub-Section */}
            <ConfigSection
              title="Position"
              isExpanded={generalExpandedSections.position}
              onToggle={() => handleToggleGeneralSection("position")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text
                    className="form-label"
                    title="Vị trí ngang của biểu đồ"
                  >
                    Horizontal
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.position.horizontal}
                    onChange={(value) =>
                      updateGeneralSetting("position", "horizontal", value)
                    }
                    style={{ width: "100%" }}
                    title="Nhập vị trí ngang (px)"
                  />
                </div>
                <div className="form-group">
                  <Typography.Text
                    className="form-label"
                    title="Vị trí dọc của biểu đồ"
                  >
                    Vertical
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.position.vertical}
                    onChange={(value) =>
                      updateGeneralSetting("position", "vertical", value)
                    }
                    style={{ width: "100%" }}
                    title="Nhập vị trí dọc (px)"
                  />
                </div>
              </div>
            </ConfigSection>

            {/* Padding Sub-Section */}
            <ConfigSection
              title="Padding"
              isExpanded={generalExpandedSections.padding}
              onToggle={() => handleToggleGeneralSection("padding")}
            >
              <div className="section-content">
                <div className="padding-grid">
                  <div className="padding-row">
                    <div className="padding-input-wrapper">
                      <InputNumber
                        size="small"
                        value={generalSettings.padding.top}
                        onChange={(value) =>
                          updateGeneralSetting("padding", "top", value)
                        }
                        addonAfter="px"
                        style={{ width: "70px" }}
                      />
                    </div>
                  </div>
                  <div className="padding-row">
                    <div className="padding-input-wrapper">
                      <InputNumber
                        size="small"
                        value={generalSettings.padding.left}
                        onChange={(value) =>
                          updateGeneralSetting("padding", "left", value)
                        }
                        addonAfter="px"
                        style={{ width: "70px" }}
                      />
                    </div>
                    <div className="padding-center">
                      <div className="padding-visual">
                        <div className="padding-box"></div>
                      </div>
                    </div>
                    <div className="padding-input-wrapper">
                      <InputNumber
                        size="small"
                        value={generalSettings.padding.right}
                        onChange={(value) =>
                          updateGeneralSetting("padding", "right", value)
                        }
                        addonAfter="px"
                        style={{ width: "70px" }}
                        title="Padding phải (px)"
                      />
                    </div>
                  </div>
                  <div className="padding-row">
                    <div className="padding-input-wrapper">
                      <InputNumber
                        size="small"
                        value={generalSettings.padding.bottom}
                        onChange={(value) =>
                          updateGeneralSetting("padding", "bottom", value)
                        }
                        addonAfter="px"
                        style={{ width: "70px" }}
                        title="Padding dưới (px)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Advanced Options Sub-Section */}
            <ConfigSection
              title="Advanced options"
              isExpanded={generalExpandedSections.advanced}
              onToggle={() => handleToggleGeneralSection("advanced")}
            >
              <div className="section-content">
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Responsive
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.advanced.responsive}
                      onChange={(checked) =>
                        updateGeneralSetting("advanced", "responsive", checked)
                      }
                      title="Bật/tắt chế độ responsive"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Maintain layer order
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.advanced.maintainLayerOrder}
                      onChange={(checked) =>
                        updateGeneralSetting(
                          "advanced",
                          "maintainLayerOrder",
                          checked
                        )
                      }
                      title="Giữ thứ tự lớp hiển thị"
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>
          </div>
        </ConfigSection>

        {/* Title Section - Main Container */}
        <ConfigSection
          title="Title"
          isExpanded={generalExpandedSections.title}
          onToggle={() => handleToggleGeneralSection("title")}
        >
          <div className="properties-container">
            {/* Title Subsection */}
            <ConfigSection
              title="Title"
              isExpanded={generalExpandedSections.titleSection}
              onToggle={() => handleToggleGeneralSection("titleSection")}
              hasToggle={true}
              toggleValue={generalSettings.title.title.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("title", "title", {
                  ...generalSettings.title.title,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">Text</Typography.Text>
                  <div className="title-input-group">
                    <Input
                      size="small"
                      value={generalSettings.title.title.text}
                      onChange={(e) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          text: e.target.value,
                        })
                      }
                      style={{ flex: 1 }}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Heading
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.title.title.heading}
                    onChange={(value) =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        heading: value,
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Heading 1">Heading 1</Select.Option>
                    <Select.Option value="Heading 2">Heading 2</Select.Option>
                    <Select.Option value="Heading 3">Heading 3</Select.Option>
                    <Select.Option value="Heading 4">Heading 4</Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">Font</Typography.Text>
                  <div className="title-font-group">
                    <Select
                      size="small"
                      value={generalSettings.title.title.font}
                      onChange={(value) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          font: value,
                        })
                      }
                      style={{ flex: 1 }}
                    >
                      <Select.Option value="DIN">DIN</Select.Option>
                      <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                      <Select.Option value="Arial">Arial</Select.Option>
                    </Select>
                    <InputNumber
                      size="small"
                      value={generalSettings.title.title.fontSize}
                      onChange={(value) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          fontSize: value,
                        })
                      }
                      style={{ width: "60px" }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="title-format-buttons">
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.bold ? "primary" : "default"
                      }
                      icon={<Bold size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          bold: !generalSettings.title.title.bold,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.italic
                          ? "primary"
                          : "default"
                      }
                      icon={<Italic size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          italic: !generalSettings.title.title.italic,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.underline
                          ? "primary"
                          : "default"
                      }
                      icon={<Underline size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          underline: !generalSettings.title.title.underline,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Text color
                  </Typography.Text>
                  <div className="title-color-group">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.title.title.textColor}
                      onChange={(color) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          textColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Background color
                  </Typography.Text>
                  <div className="title-color-group">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.title.title.backgroundColor}
                      onChange={(color) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          backgroundColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Horizontal alignment
                  </Typography.Text>
                  <div className="title-alignment-group">
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.horizontalAlignment ===
                        "left"
                          ? "primary"
                          : "default"
                      }
                      className="title-alignment-button"
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          horizontalAlignment: "left",
                        })
                      }
                    >
                      ≡
                    </Button>
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.horizontalAlignment ===
                        "center"
                          ? "primary"
                          : "default"
                      }
                      className="title-alignment-button"
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          horizontalAlignment: "center",
                        })
                      }
                    >
                      ≣
                    </Button>
                    <Button
                      size="small"
                      type={
                        generalSettings.title.title.horizontalAlignment ===
                        "right"
                          ? "primary"
                          : "default"
                      }
                      className="title-alignment-button"
                      onClick={() =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          horizontalAlignment: "right",
                        })
                      }
                    >
                      ≡
                    </Button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Text wrap
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.title.title.textWrap}
                      onChange={(checked) =>
                        updateGeneralSetting("title", "title", {
                          ...generalSettings.title.title,
                          textWrap: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Subtitle Subsection */}
            <ConfigSection
              title="Subtitle"
              isExpanded={generalExpandedSections.subtitle}
              onToggle={() => handleToggleGeneralSection("subtitle")}
              hasToggle={true}
              toggleValue={generalSettings.title.subtitle.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("title", "subtitle", {
                  ...generalSettings.title.subtitle,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">Text</Typography.Text>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Input
                      size="small"
                      value={generalSettings.title.subtitle.text}
                      onChange={(e) =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          text: e.target.value,
                        })
                      }
                      style={{ flex: 1 }}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Heading
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.title.subtitle.heading}
                    onChange={(value) =>
                      updateGeneralSetting("title", "subtitle", {
                        ...generalSettings.title.subtitle,
                        heading: value,
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Heading 1">Heading 1</Select.Option>
                    <Select.Option value="Heading 2">Heading 2</Select.Option>
                    <Select.Option value="Heading 3">Heading 3</Select.Option>
                    <Select.Option value="Heading 4">Heading 4</Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">Font</Typography.Text>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <Select
                      size="small"
                      value={generalSettings.title.subtitle.font}
                      onChange={(value) =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          font: value,
                        })
                      }
                      style={{ flex: 1 }}
                    >
                      <Select.Option value="DIN">DIN</Select.Option>
                      <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                      <Select.Option value="Arial">Arial</Select.Option>
                    </Select>
                    <InputNumber
                      size="small"
                      value={generalSettings.title.subtitle.fontSize}
                      onChange={(value) =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          fontSize: value,
                        })
                      }
                      style={{ width: "60px" }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.bold
                          ? "primary"
                          : "default"
                      }
                      icon={<Bold size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          bold: !generalSettings.title.subtitle.bold,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.italic
                          ? "primary"
                          : "default"
                      }
                      icon={<Italic size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          italic: !generalSettings.title.subtitle.italic,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.underline
                          ? "primary"
                          : "default"
                      }
                      icon={<Underline size={12} />}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          underline: !generalSettings.title.subtitle.underline,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Text color
                  </Typography.Text>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <CustomColorPicker
                      label=""
                      value={generalSettings.title.subtitle.textColor}
                      onChange={(color) =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          textColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Horizontal alignment
                  </Typography.Text>
                  <div style={{ display: "flex", gap: "2px" }}>
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.horizontalAlignment ===
                        "left"
                          ? "primary"
                          : "default"
                      }
                      style={{ width: "32px", textAlign: "center" }}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          horizontalAlignment: "left",
                        })
                      }
                    >
                      ≡
                    </Button>
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.horizontalAlignment ===
                        "center"
                          ? "primary"
                          : "default"
                      }
                      style={{ width: "32px", textAlign: "center" }}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          horizontalAlignment: "center",
                        })
                      }
                    >
                      ≣
                    </Button>
                    <Button
                      size="small"
                      type={
                        generalSettings.title.subtitle.horizontalAlignment ===
                        "right"
                          ? "primary"
                          : "default"
                      }
                      style={{ width: "32px", textAlign: "center" }}
                      onClick={() =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          horizontalAlignment: "right",
                        })
                      }
                    >
                      ≡
                    </Button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Text wrap
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.title.subtitle.textWrap}
                      onChange={(checked) =>
                        updateGeneralSetting("title", "subtitle", {
                          ...generalSettings.title.subtitle,
                          textWrap: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Divider Subsection */}
            <ConfigSection
              title="Divider"
              isExpanded={generalExpandedSections.divider}
              onToggle={() => handleToggleGeneralSection("divider")}
              hasToggle={true}
              toggleValue={generalSettings.title.divider.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("title", "divider", {
                  ...generalSettings.title.divider,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Color
                  </Typography.Text>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <CustomColorPicker
                      label=""
                      value={generalSettings.title.divider.color}
                      onChange={(color) =>
                        updateGeneralSetting("title", "divider", {
                          ...generalSettings.title.divider,
                          color: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Line style
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.title.divider.lineStyle}
                    onChange={(value) =>
                      updateGeneralSetting("title", "divider", {
                        ...generalSettings.title.divider,
                        lineStyle: value,
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Solid">Solid</Select.Option>
                    <Select.Option value="Dashed">Dashed</Select.Option>
                    <Select.Option value="Dotted">Dotted</Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Width
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.title.divider.width}
                    onChange={(value) =>
                      updateGeneralSetting("title", "divider", {
                        ...generalSettings.title.divider,
                        width: value,
                      })
                    }
                    addonAfter="px"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Ignore padding
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.title.divider.ignorePadding}
                      onChange={(checked) =>
                        updateGeneralSetting("title", "divider", {
                          ...generalSettings.title.divider,
                          ignorePadding: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Spacing Subsection */}
            <ConfigSection
              title="Spacing"
              isExpanded={generalExpandedSections.spacing}
              onToggle={() => handleToggleGeneralSection("spacing")}
            >
              <div className="section-content">
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="form-label">
                      Customize spacing
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.title.spacing.customizeSpacing}
                      onChange={(checked) =>
                        updateGeneralSetting("title", "spacing", {
                          ...generalSettings.title.spacing,
                          customizeSpacing: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Space between label and ...
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={
                      generalSettings.title.spacing.spaceBetweenLabelAndValue
                    }
                    onChange={(value) =>
                      updateGeneralSetting("title", "spacing", {
                        ...generalSettings.title.spacing,
                        spaceBetweenLabelAndValue: value,
                      })
                    }
                    addonAfter="px"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </ConfigSection>
          </div>
        </ConfigSection>

        {/* Effects Section - Main Container */}
        <ConfigSection
          title="Effects"
          isExpanded={generalExpandedSections.effects}
          onToggle={() => handleToggleGeneralSection("effects")}
        >
          <div className="properties-container">
            {/* Background Sub-Section */}
            <ConfigSection
              title="Background"
              isExpanded={generalExpandedSections.background}
              onToggle={() => handleToggleGeneralSection("background")}
              hasToggle={true}
              toggleValue={generalSettings.effects.background.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("effects", "background", {
                  ...generalSettings.effects.background,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.effects.background.color}
                      onChange={(color) =>
                        updateGeneralSetting("effects", "background", {
                          ...generalSettings.effects.background,
                          color: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Transparency
                  </Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      min={0}
                      max={100}
                      value={generalSettings.effects.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("effects", "background", {
                          ...generalSettings.effects.background,
                          transparency: value || 0,
                        })
                      }
                      style={{ width: "60px" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value!.replace("%", ""))}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={generalSettings.effects.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("effects", "background", {
                          ...generalSettings.effects.background,
                          transparency: value,
                        })
                      }
                      style={{ flex: 1, marginLeft: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Visual Border Sub-Section */}
            <ConfigSection
              title="Visual border"
              isExpanded={generalExpandedSections.visualBorder}
              onToggle={() => handleToggleGeneralSection("visualBorder")}
              hasToggle={true}
              toggleValue={generalSettings.effects.visualBorder.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("effects", "visualBorder", {
                  ...generalSettings.effects.visualBorder,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.effects.visualBorder.color}
                      onChange={(color) =>
                        updateGeneralSetting("effects", "visualBorder", {
                          ...generalSettings.effects.visualBorder,
                          color: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Rounded corners
                  </Typography.Text>
                  <div className="rounded-corners-row">
                    <InputNumber
                      size="small"
                      value={
                        generalSettings.effects.visualBorder.roundedCorners
                      }
                      onChange={(value) =>
                        updateGeneralSetting("effects", "visualBorder", {
                          ...generalSettings.effects.visualBorder,
                          roundedCorners: value,
                        })
                      }
                      addonAfter="px"
                      style={{ width: "80px" }}
                      min={0}
                    />
                    <div className="effects-indicator" />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Width
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={generalSettings.effects.visualBorder.width}
                    onChange={(value) =>
                      updateGeneralSetting("effects", "visualBorder", {
                        ...generalSettings.effects.visualBorder,
                        width: value,
                      })
                    }
                    addonAfter="px"
                    style={{ width: "100%" }}
                    min={0}
                  />
                </div>
              </div>
            </ConfigSection>

            {/* Shadow Sub-Section */}
            <ConfigSection
              title="Shadow"
              isExpanded={generalExpandedSections.shadow}
              onToggle={() => handleToggleGeneralSection("shadow")}
              hasToggle={true}
              toggleValue={generalSettings.effects.shadow.enabled}
              onToggleChange={(checked) =>
                updateGeneralSetting("effects", "shadow", {
                  ...generalSettings.effects.shadow,
                  enabled: checked,
                })
              }
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.effects.shadow.color}
                      onChange={(color) =>
                        updateGeneralSetting("effects", "shadow", {
                          ...generalSettings.effects.shadow,
                          color: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Offset
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.effects.shadow.offset}
                    onChange={(value) =>
                      updateGeneralSetting("effects", "shadow", {
                        ...generalSettings.effects.shadow,
                        offset: value,
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Outside">Outside</Select.Option>
                    <Select.Option value="Inside">Inside</Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Position
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.effects.shadow.position}
                    onChange={(value) =>
                      updateGeneralSetting("effects", "shadow", {
                        ...generalSettings.effects.shadow,
                        position: value,
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Bottom right">
                      Bottom right
                    </Select.Option>
                    <Select.Option value="Bottom left">
                      Bottom left
                    </Select.Option>
                    <Select.Option value="Top right">Top right</Select.Option>
                    <Select.Option value="Top left">Top left</Select.Option>
                  </Select>
                </div>
              </div>
            </ConfigSection>
          </div>
        </ConfigSection>

        {/* Data format Section - Main Container */}
        <ConfigSection
          title="Data format"
          isExpanded={generalExpandedSections.dataFormat}
          onToggle={() => handleToggleGeneralSection("dataFormat")}
        >
          <div className="properties-container">
            {/* Apply settings to Sub-Section */}
            <div className="form-group">
              <Typography.Text className="form-label">
                Apply settings to
              </Typography.Text>
              <Select
                size="small"
                value={generalSettings.dataFormat.applySettingsTo}
                onChange={(value) =>
                  updateGeneralSetting("dataFormat", "applySettingsTo", value)
                }
                style={{ width: "100%" }}
              >
                <Select.Option value="Khu vực">Khu vực</Select.Option>
                <Select.Option value="Tất cả">Tất cả</Select.Option>
                <Select.Option value="Tùy chọn">Tùy chọn</Select.Option>
              </Select>
            </div>

            {/* Format options Sub-Section */}
            <ConfigSection
              title="Format options"
              isExpanded={generalExpandedSections.formatOptions}
              onToggle={() => handleToggleGeneralSection("formatOptions")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Format
                  </Typography.Text>
                  <Select
                    size="small"
                    value={generalSettings.dataFormat.format}
                    onChange={(value) =>
                      updateGeneralSetting("dataFormat", "format", value)
                    }
                    style={{ width: "100%" }}
                    placeholder="Select format"
                  >
                    <Select.Option value="General">General</Select.Option>
                    <Select.Option value="Number">Number</Select.Option>
                    <Select.Option value="Currency">Currency</Select.Option>
                    <Select.Option value="Percentage">Percentage</Select.Option>
                    <Select.Option value="Date">Date</Select.Option>
                    <Select.Option value="Custom">Custom</Select.Option>
                  </Select>
                </div>
              </div>
            </ConfigSection>
          </div>
        </ConfigSection>

        {/* Header icons Section - Main Container */}
        <ConfigSection
          title="Header icons"
          isExpanded={generalExpandedSections.headerIcons}
          onToggle={() => handleToggleGeneralSection("headerIcons")}
        >
          <div className="properties-container">
            {/* Colors Sub-Section */}
            <ConfigSection
              title="Colors"
              isExpanded={generalExpandedSections.headerIconsColors}
              onToggle={() => handleToggleGeneralSection("headerIconsColors")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Background
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.headerIcons.colors.background}
                      onChange={(color) =>
                        updateGeneralSetting("headerIcons", "colors", {
                          ...generalSettings.headerIcons.colors,
                          background: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Border
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.headerIcons.colors.border}
                      onChange={(color) =>
                        updateGeneralSetting("headerIcons", "colors", {
                          ...generalSettings.headerIcons.colors,
                          border: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">Icon</Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.headerIcons.colors.icon}
                      onChange={(color) =>
                        updateGeneralSetting("headerIcons", "colors", {
                          ...generalSettings.headerIcons.colors,
                          icon: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Transparency
                  </Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      min={0}
                      max={100}
                      value={generalSettings.headerIcons.colors.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("headerIcons", "colors", {
                          ...generalSettings.headerIcons.colors,
                          transparency: value || 0,
                        })
                      }
                      style={{ width: "60px" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value!.replace("%", ""))}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={generalSettings.headerIcons.colors.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("headerIcons", "colors", {
                          ...generalSettings.headerIcons.colors,
                          transparency: value,
                        })
                      }
                      style={{ flex: 1, marginLeft: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Icons Sub-Section */}
            <ConfigSection
              title="Icons"
              isExpanded={generalExpandedSections.headerIconsIcons}
              onToggle={() => handleToggleGeneralSection("headerIconsIcons")}
            >
              <div className="section-content">
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Visual information
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={
                        generalSettings.headerIcons.icons.visualInformation
                      }
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          visualInformation: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Visual warning
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.visualWarning}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          visualWarning: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Visual error
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.visualError}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          visualError: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Drill on dropdown
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={
                        generalSettings.headerIcons.icons.drillOnDropdown
                      }
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          drillOnDropdown: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Drill up
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.drillUp}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          drillUp: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Drill down
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.drillDown}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          drillDown: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Show next level
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.showNextLevel}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          showNextLevel: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Expand to next level
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={
                        generalSettings.headerIcons.icons.expandToNextLevel
                      }
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          expandToNextLevel: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Pin
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.pin}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          pin: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Focus mode
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.focusMode}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          focusMode: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      See data layout
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.seeDataLayout}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          seeDataLayout: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      More options
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.moreOptions}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          moreOptions: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Filter
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.filter}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          filter: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Help tooltip
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.helpTooltip}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          helpTooltip: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Comment button
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.commentButton}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          commentButton: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Copy icon
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.copyIcon}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          copyIcon: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      Smart narrative
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.smartNarrative}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          smartNarrative: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      See alert button
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={generalSettings.headerIcons.icons.seeAlertButton}
                      onChange={(checked) =>
                        updateGeneralSetting("headerIcons", "icons", {
                          ...generalSettings.headerIcons.icons,
                          seeAlertButton: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>
          </div>
        </ConfigSection>

        {/* Tooltips Section - Main Container */}
        <ConfigSection
          title="Tooltips"
          isExpanded={generalExpandedSections.tooltips}
          onToggle={() => handleToggleGeneralSection("tooltips")}
          hasToggle={true}
          toggleValue={true} // Tooltips are enabled by default
          onToggleChange={(checked) => {
            // Handle tooltip enable/disable logic here
          }}
        >
          <div className="properties-container">
            {/* Content Sub-Section */}
            <ConfigSection
              title="Content"
              isExpanded={generalExpandedSections.tooltipsOptions}
              onToggle={() => handleToggleGeneralSection("tooltipsOptions")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Text Content
                  </Typography.Text>
                  <TextArea
                    rows={4}
                    value={generalSettings.tooltips.options.text}
                    onChange={(e) =>
                      updateGeneralSetting("tooltips", "options", {
                        text: e.target.value,
                      })
                    }
                    placeholder="Enter tooltip options text content..."
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </ConfigSection>

            {/* Text Sub-Section */}
            <ConfigSection
              title="Text"
              isExpanded={generalExpandedSections.tooltipsText}
              onToggle={() => handleToggleGeneralSection("tooltipsText")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">Font</Typography.Text>
                  <div className="font-controls">
                    <Select
                      size="small"
                      value={generalSettings.tooltips.text.font}
                      onChange={(value) =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          font: value,
                        })
                      }
                      style={{ width: "120px" }}
                    >
                      <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                      <Select.Option value="Arial">Arial</Select.Option>
                      <Select.Option value="Times New Roman">
                        Times New Roman
                      </Select.Option>
                      <Select.Option value="Calibri">Calibri</Select.Option>
                    </Select>
                    <InputNumber
                      size="small"
                      value={generalSettings.tooltips.text.fontSize}
                      onChange={(value) =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          fontSize: value,
                        })
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
                      type={
                        generalSettings.tooltips.text.bold
                          ? "primary"
                          : "default"
                      }
                      icon={<Bold size={12} />}
                      onClick={() =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          bold: !generalSettings.tooltips.text.bold,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.tooltips.text.italic
                          ? "primary"
                          : "default"
                      }
                      icon={<Italic size={12} />}
                      onClick={() =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          italic: !generalSettings.tooltips.text.italic,
                        })
                      }
                    />
                    <Button
                      size="small"
                      type={
                        generalSettings.tooltips.text.underline
                          ? "primary"
                          : "default"
                      }
                      icon={<Underline size={12} />}
                      onClick={() =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          underline: !generalSettings.tooltips.text.underline,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Label color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.tooltips.text.labelColor}
                      onChange={(color) =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          labelColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Value color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.tooltips.text.valueColor}
                      onChange={(color) =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          valueColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Drill text and icon color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={
                        generalSettings.tooltips.text.drillTextAndIconColor
                      }
                      onChange={(color) =>
                        updateGeneralSetting("tooltips", "text", {
                          ...generalSettings.tooltips.text,
                          drillTextAndIconColor: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>
              </div>
            </ConfigSection>

            {/* Background Sub-Section */}
            <ConfigSection
              title="Background"
              isExpanded={generalExpandedSections.tooltipsBackground}
              onToggle={() => handleToggleGeneralSection("tooltipsBackground")}
            >
              <div className="section-content">
                <div className="form-group">
                  <Typography.Text className="form-label">
                    Color
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={generalSettings.tooltips.background.color}
                      onChange={(color) =>
                        updateGeneralSetting("tooltips", "background", {
                          ...generalSettings.tooltips.background,
                          color: color,
                        })
                      }
                      size="small"
                      showLabel={false}
                    />
                    {/* <FunctionButton /> */}
                  </div>
                </div>

                <div className="form-group">
                  <Typography.Text className="form-label">
                    Transparency
                  </Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      min={0}
                      max={100}
                      value={generalSettings.tooltips.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("tooltips", "background", {
                          ...generalSettings.tooltips.background,
                          transparency: value || 0,
                        })
                      }
                      style={{ width: "60px" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value!.replace("%", ""))}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={generalSettings.tooltips.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("tooltips", "background", {
                          ...generalSettings.tooltips.background,
                          transparency: value,
                        })
                      }
                      style={{ flex: 1, marginLeft: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </ConfigSection>
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

  // @ts-ignore
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar and other layout code here, unchanged */}
        <Layout>
          <Routes>
            {/* Redirect root to the first chart */}
            <Route
              path="/"
              element={<Navigate to={`/${chartRoutes[0].name}`} replace />}
            />
            {chartRoutes.map(({ name, ChartComponent }) => [
              <Route
                key={name}
                path={`/${name}`}
                element={
                  <ChartComponent
                    config={currentConfig.format}
                    data={
                      chartType === "stackedColumn"
                        ? chartData.monthlyData
                        : chartType === "stackedBar"
                        ? chartData.stackedData
                        : chartType === "pie"
                        ? chartData.categories
                        : chartData.monthlyData
                    }
                  />
                }
              />,
              <Route
                key={`${name}-config`}
                path={`/${name}/config`}
                element={
                  // Only pass configMode if ChartComponent supports it
                  React.createElement(ChartComponent, {
                    config: currentConfig.format,
                    data:
                      chartType === "stackedColumn"
                        ? chartData.monthlyData
                        : chartType === "stackedBar"
                        ? chartData.stackedData
                        : chartType === "pie"
                        ? chartData.categories
                        : chartData.monthlyData,
                  })
                }
              />,
            ])}
          </Routes>
        </Layout>
      </Layout>
    </Router>
  );
};

export default PowerBIDashboard;
