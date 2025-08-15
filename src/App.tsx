import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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
} from "antd";
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
} from "lucide-react";
import { RootState } from "./store/store";
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
import "./App.css";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const PowerBIDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data,
    chartType,
    activeTab,
    activeSubTab,
    expandedSections,
    chartConfigs,
  } = useSelector((state: RootState) => state.chart) as ChartState;

  const currentConfig = chartConfigs[chartType];

  const handleToggleSection = (section: string) => {
    dispatch(toggleSection(section));
  };

  const handleRemoveDataItem = (category: string, fieldName: string) => {
    dispatch(removeDataItem({ category, fieldName }));
  };

  const handleFieldTypeChange = (
    fieldName: string,
    newType: "sum" | "count" | "average",
    category: string
  ) => {
    dispatch(updateFieldType({ fieldName, newType, category }));
  };

  const handleUpdateFormatConfig = (
    section: string,
    key: string,
    value: any
  ) => {
    dispatch(updateFormatConfig({ section, key, value }));
  };

  // Field options dropdown component
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

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="population" fill="#0078D4" name="Dân số" />
              <Bar dataKey="gdp" fill="#00BCF2" name="GDP" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "stacked":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar
                dataKey="population"
                stackId="a"
                fill="#0078D4"
                name="Dân số"
              />
              <Bar dataKey="gdp" stackId="a" fill="#00BCF2" name="GDP" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "clustered":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="population" fill="#0078D4" name="Dân số" />
              <Bar dataKey="gdp" fill="#00BCF2" name="GDP" />
              <Bar dataKey="area" fill="#FF8042" name="Diện tích" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "lineBar":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                yAxisId="left"
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar
                yAxisId="left"
                dataKey="population"
                fill="#0078D4"
                name="Dân số"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gdp"
                stroke="#00BCF2"
                strokeWidth={3}
                name="GDP"
                dot={{ fill: "#00BCF2", strokeWidth: 2, r: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "lineColumn":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                yAxisId="left"
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar
                yAxisId="left"
                dataKey="area"
                fill="#FF8042"
                name="Diện tích"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="population"
                stroke="#0078D4"
                strokeWidth={3}
                name="Dân số"
                dot={{ fill: "#0078D4", strokeWidth: 2, r: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="population"
              >
                {data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {config.legend?.enabled && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {config.gridlines?.enabled && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={config.gridlines.color}
                  strokeWidth={config.gridlines.strokeWidth}
                />
              )}
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: config.xAxis.fontSize,
                  fill: config.xAxis.color,
                  fontWeight: config.xAxis.bold ? "bold" : "normal",
                }}
              />
              <YAxis
                tick={{
                  fontSize: config.yAxis.fontSize,
                  fill: config.yAxis.color,
                  fontWeight: config.yAxis.bold ? "bold" : "normal",
                }}
              />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Line
                type="monotone"
                dataKey="population"
                stroke="#0078D4"
                strokeWidth={2}
                name="Dân số"
              />
              <Line
                type="monotone"
                dataKey="gdp"
                stroke="#00BCF2"
                strokeWidth={2}
                name="GDP"
              />
            </LineChart>
          </ResponsiveContainer>
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
                handleUpdateFormatConfig(
                  section,
                  "underline",
                  !config.underline
                )
              }
            />
          </Space>
        </div>

        <div>
          <Typography.Text
            style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}
          >
            Color
          </Typography.Text>
          <Space align="center">
            <ColorPicker
              size="small"
              value={config.color || "#000000"}
              onChange={(color) =>
                handleUpdateFormatConfig(section, "color", color.toHexString())
              }
            />
            <Typography.Text code style={{ fontSize: "12px" }}>
              {config.color || "#000000"}
            </Typography.Text>
          </Space>
        </div>
      </Space>
    </div>
  );

  const DataConfigTab = () => {
    const dataConfig = currentConfig.data;

    // State for data source and table selection
    const [dataSource, setDataSource] = useState("API");
    const [selectedTable, setSelectedTable] = useState("cities");

    // State for each category's fields
    const [categoryFields, setCategoryFields] = useState<{
      [key: string]: any[];
    }>({
      yAxis: [{ id: 1, field: "population", action: "sum" }],
      xAxis: [{ id: 2, field: "name", action: "no-action" }],
      legend: [{ id: 3, field: "name", action: "no-action" }],
      values: [{ id: 4, field: "gdp", action: "sum" }],
      secondaryYAxis: [],
    });

    // Define fields available for each chart type (remove tooltips)
    const getAvailableFields = () => {
      switch (chartType) {
        case "bar":
        case "stacked":
        case "clustered":
          return ["yAxis", "xAxis", "drillThrough"];
        case "pie":
          return ["legend", "values", "drillThrough"];
        case "line":
          return ["xAxis", "yAxis", "secondaryYAxis", "drillThrough"];
        case "lineBar":
        case "lineColumn":
          return ["xAxis", "yAxis", "secondaryYAxis", "drillThrough"];
        default:
          return ["yAxis", "xAxis", "drillThrough"];
      }
    };

    const getFieldDisplayName = (fieldKey: string) => {
      const displayNames: { [key: string]: string } = {
        yAxis: "Y-axis",
        xAxis: "X-axis",
        legend: "Legend",
        values: "Values",
        secondaryYAxis: "Secondary Y-axis",
        drillThrough: "Drill through",
      };
      return displayNames[fieldKey] || fieldKey;
    };

    const addFieldToCategory = (category: string) => {
      const newField = {
        id: Date.now(),
        field: "population",
        action: "sum",
      };
      setCategoryFields((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), newField],
      }));
    };

    const removeFieldFromCategory = (category: string, fieldId: number) => {
      setCategoryFields((prev) => ({
        ...prev,
        [category]:
          prev[category]?.filter((field) => field.id !== fieldId) || [],
      }));
    };

    const updateFieldInCategory = (
      category: string,
      fieldId: number,
      key: string,
      value: string
    ) => {
      setCategoryFields((prev) => ({
        ...prev,
        [category]:
          prev[category]?.map((field) =>
            field.id === fieldId ? { ...field, [key]: value } : field
          ) || [],
      }));
    };

    // Simple Field Selector - only Field + Action row
    const SimpleFieldSelector = ({
      field,
      category,
      onUpdate,
      onRemove,
    }: any) => (
      <div className="simple-field-selector">
        <div className="selector-row">
          <div className="selector-group">
            <Select
              size="small"
              value={field.field}
              onChange={(value) => onUpdate(category, field.id, "field", value)}
              style={{ width: "100%" }}
              placeholder="Select field"
              options={[
                { label: "Population", value: "population" },
                { label: "Area", value: "area" },
                { label: "GDP", value: "gdp" },
                { label: "Name", value: "name" },
              ]}
            />
          </div>
          <div className="selector-group">
            <Space.Compact style={{ width: "100%" }}>
              <Select
                size="small"
                value={field.action}
                onChange={(value) =>
                  onUpdate(category, field.id, "action", value)
                }
                style={{ flex: 1 }}
                options={[
                  { label: "No action", value: "no-action" },
                  { label: "Sum", value: "sum" },
                  { label: "Count", value: "count" },
                  { label: "Average", value: "average" },
                  { label: "Min", value: "min" },
                  { label: "Max", value: "max" },
                ]}
              />
              <Button
                size="small"
                icon={<X size={14} />}
                onClick={() => onRemove(category, field.id)}
                danger
                type="text"
              />
            </Space.Compact>
          </div>
        </div>
      </div>
    );

    return (
      <div className="data-config-tab">
        {/* Data Source and Table Selection */}
        <div className="data-source-section">
          <div className="source-table-row">
            <div className="selector-group">
              <Typography.Text className="selector-label">
                Data source:
              </Typography.Text>
              <Select
                size="small"
                value={dataSource}
                onChange={setDataSource}
                style={{ width: "100%" }}
                options={[
                  { label: "API", value: "API" },
                  { label: "Database", value: "DB" },
                  { label: "Formula", value: "Formula" },
                  { label: "File", value: "File" },
                ]}
              />
            </div>
            <div className="selector-group">
              <Typography.Text className="selector-label">
                Table:
              </Typography.Text>
              <Select
                size="small"
                value={selectedTable}
                onChange={setSelectedTable}
                style={{ width: "100%" }}
                options={[
                  { label: "Cities", value: "cities" },
                  { label: "Countries", value: "countries" },
                  { label: "Sales", value: "sales" },
                  { label: "Products", value: "products" },
                ]}
              />
            </div>
          </div>
        </div>

        <Divider style={{ margin: "12px 0" }} />

        {/* Field Categories - Different for each chart type */}
        <div className="field-categories">
          {getAvailableFields().map((fieldKey) => {
            if (fieldKey === "drillThrough") {
              return (
                <div key={fieldKey} className="field-category">
                  <div className="category-header">
                    <Typography.Text className="category-title">
                      {getFieldDisplayName(fieldKey)}
                    </Typography.Text>
                  </div>
                  <div className="drill-through-content">
                    <div className="drill-options">
                      <div className="option-item">
                        <Switch
                          size="small"
                          checked={dataConfig.drillThrough.crossReport}
                        />
                        <Typography.Text className="option-text">
                          Cross-report
                        </Typography.Text>
                      </div>
                      <div className="option-item">
                        <Switch
                          size="small"
                          checked={dataConfig.drillThrough.keepAllFilters}
                        />
                        <Typography.Text className="option-text">
                          Keep all filters
                        </Typography.Text>
                      </div>
                    </div>
                    <Button type="link" className="add-fields-button">
                      Add drill-through fields here
                    </Button>
                  </div>
                </div>
              );
            }

            const fieldsForCategory = categoryFields[fieldKey] || [];

            return (
              <div key={fieldKey} className="field-category">
                <div className="category-header">
                  <Typography.Text className="category-title">
                    {getFieldDisplayName(fieldKey)}
                  </Typography.Text>
                </div>
                <div className="field-list">
                  {fieldsForCategory.map((field) => (
                    <SimpleFieldSelector
                      key={field.id}
                      field={field}
                      category={fieldKey}
                      onUpdate={updateFieldInCategory}
                      onRemove={removeFieldFromCategory}
                    />
                  ))}

                  {/* Add button inside each category */}
                  <div className="add-field-button">
                    <Button
                      type="dashed"
                      icon={<Plus size={14} />}
                      onClick={() => addFieldToCategory(fieldKey)}
                      block
                      size="small"
                    >
                      Add field
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const FormatConfigTab = () => {
    const formatConfig = currentConfig.format;

    // Define format sections available for each chart type
    const getAvailableFormatSections = () => {
      const commonSections = ["legend", "title"];

      switch (chartType) {
        case "bar":
        case "stacked":
        case "clustered":
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "dataLabels",
            "gridlines",
          ];
        case "pie":
          return [...commonSections, "dataLabels", "slices", "rotation"];
        case "line":
          return [
            ...commonSections,
            "xAxis",
            "yAxis",
            "gridlines",
            "dataLabels",
          ];
        case "lineBar":
        case "lineColumn":
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
        "title",
        "dataLabels",
        "gridlines",
        "slices",
        "rotation",
      ];
      const sectionsWithoutToggle = ["xAxis", "yAxis"]; // Required sections

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
              <FontControls config={config} section={sectionKey} />
            </div>
          );

        case "title":
          return (
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Text</Typography.Text>
                <Input
                  size="small"
                  value={config.text || "Chart Title"}
                  onChange={(e) =>
                    handleUpdateFormatConfig(sectionKey, "text", e.target.value)
                  }
                />
              </div>
              <FontControls config={config} section={sectionKey} />
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
      <div className="format-config-tab">
        {/* Search box */}
        <div className="search-container">
          <Input
            prefix={<Search size={14} />}
            placeholder="Search"
            size="small"
            style={{ margin: "12px 16px" }}
          />
        </div>

        {/* Format Configuration Sections - Different for each chart type */}
        <div className="config-sections">
          {getAvailableFormatSections().map((sectionKey) => {
            const { hasToggle } = getSectionToggleStatus(sectionKey);
            const config = (formatConfig as any)[sectionKey] || {};

            return (
              <ConfigSection
                key={sectionKey}
                title={getSectionTitle(sectionKey)}
                isExpanded={expandedSections[sectionKey]}
                onToggle={() => handleToggleSection(sectionKey)}
                hasToggle={hasToggle}
                toggleValue={hasToggle ? config.enabled !== false : undefined}
                onToggleChange={
                  hasToggle
                    ? (value) =>
                        handleUpdateFormatConfig(sectionKey, "enabled", value)
                    : undefined
                }
              >
                {renderSectionContent(sectionKey)}
              </ConfigSection>
            );
          })}
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

  return (
    <Layout className="powerbi-dashboard">
      <Content>
        <Layout>
          <Content>
            <Card className="chart-container" bodyStyle={{ padding: 0 }}>
              {/* Chart Type Selection */}
              <div className="chart-toolbar">
                <Space>
                  <Button
                    onClick={() => dispatch(setChartType("bar"))}
                    className={`chart-type-button ${
                      chartType === "bar" ? "active" : ""
                    }`}
                    title="Bar Chart"
                  >
                    <BarChart3 size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("stacked"))}
                    className={`chart-type-button ${
                      chartType === "stacked" ? "active" : ""
                    }`}
                    title="Stacked Bar Chart"
                  >
                    <BarChart4 size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("clustered"))}
                    className={`chart-type-button ${
                      chartType === "clustered" ? "active" : ""
                    }`}
                    title="Clustered Bar Chart"
                  >
                    <BarChart2 size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("lineBar"))}
                    className={`chart-type-button ${
                      chartType === "lineBar" ? "active" : ""
                    }`}
                    title="Line and Bar Chart"
                  >
                    <TrendingUp size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("lineColumn"))}
                    className={`chart-type-button ${
                      chartType === "lineColumn" ? "active" : ""
                    }`}
                    title="Line and Column Chart"
                  >
                    <LineChartIcon size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("pie"))}
                    className={`chart-type-button ${
                      chartType === "pie" ? "active" : ""
                    }`}
                    title="Pie Chart"
                  >
                    <PieChartIcon size={20} />
                  </Button>
                  <Button
                    onClick={() => dispatch(setChartType("line"))}
                    className={`chart-type-button ${
                      chartType === "line" ? "active" : ""
                    }`}
                    title="Line Chart"
                  >
                    <TrendingUp size={20} />
                  </Button>
                </Space>
              </div>

              {/* Chart Render Area */}
              <div className="chart-render-area">{renderChart()}</div>
            </Card>
          </Content>

          <Sider width={320} className="properties-panel">
            {/* Properties header với icon và tabs */}
            <div className="properties-header">
              <Space>
                <div className="visual-icon">📊</div>
                <Copy size={16} />
                <Eye size={16} />
              </Space>
            </div>

            {/* Main Data/Format tabs */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) =>
                dispatch(setActiveTab(key as "data" | "format"))
              }
              size="large"
              centered
              className="main-tabs"
            >
              <TabPane tab="Data" key="data">
                {/* Data tab - no sub-tabs, direct content */}
                <div className="properties-content">
                  <DataConfigTab />
                </div>
              </TabPane>

              <TabPane tab="Format" key="format">
                {/* Visual/General sub-tabs for Format */}
                <Tabs
                  activeKey={activeSubTab}
                  onChange={(key) =>
                    dispatch(setActiveSubTab(key as "Visual" | "General"))
                  }
                  size="small"
                  className="sub-tabs"
                >
                  <TabPane tab="Visual" key="Visual">
                    <div className="properties-content">
                      <FormatConfigTab />
                    </div>
                  </TabPane>
                  <TabPane tab="General" key="General">
                    <div className="properties-content">
                      <div className="empty-state">
                        <Text>
                          General format options will be implemented here
                        </Text>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
};

export default PowerBIDashboard;
