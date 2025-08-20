import React, { useState, useEffect } from "react";
import { Typography, Select, Divider, Button, Tooltip } from "antd";
import { Plus } from "lucide-react";
import {
  DATA_SOURCE_OPTIONS,
  FIELD_OPTIONS,
  FIELD_ACTION_OPTIONS,
  FIELD_DISPLAY_NAMES,
  CHART_AVAILABLE_FIELDS,
  SIMPLE_CHART_TYPES,
  SINGLE_FIELD_TYPES,
  FIELD_RESTRICTIONS,
  DEFAULT_AVAILABLE_FIELDS,
  loadFieldOptions,
} from "../../constants/index";

// Thêm prop data để nhận dữ liệu từ ngoài vào (1 chiều)
export interface DataTabProps {
  chartType: string;
  rawData: any[];
  data: any[];
}

export const DataTab: React.FC<DataTabProps> = ({
  chartType,
  rawData,
  data,
}) => {
  // Lấy các field khả dụng cho chart hiện tại
  const getAvailableFields = (): string[] => {
    return CHART_AVAILABLE_FIELDS[chartType] || DEFAULT_AVAILABLE_FIELDS;
  };

  // State để quản lý nguồn dữ liệu
  const [dataSource, setDataSource] = useState("API");

  // Hiển thị data gốc nhận từ Redux (demo)
  // console.log('Raw data for this chart:', rawChartData);

  const [categoryFields, setCategoryFields] = useState<{
    [key: string]: any[];
  }>({
    yAxis: [],
    xAxis: [],
    legend: [],
    values: [],
    secondaryYAxis: [],
    detail: [],
    columnY: [],
    lineY: [],
    columnLegend: [],
  });

  // Tự động fill field và cập nhật FIELD_OPTIONS khi rawData hoặc chartType thay đổi
  useEffect(() => {
    if (!rawData || rawData.length === 0) return;
    loadFieldOptions({ temp: rawData }, "temp");
    const keys = Object.keys(rawData[0]);
    const xField =
      keys.find(
        (k) =>
          k.toLowerCase().includes("name") ||
          k.toLowerCase().includes("category") ||
          k.toLowerCase().includes("month")
      ) || keys[0];
    const yField =
      keys.find(
        (k) =>
          k.toLowerCase().includes("value") ||
          k.toLowerCase().includes("population") ||
          k.toLowerCase().includes("series")
      ) ||
      keys[1] ||
      keys[0];
    const legendField =
      keys.find(
        (k) =>
          k.toLowerCase().includes("series") ||
          k.toLowerCase().includes("type") ||
          k.toLowerCase().includes("legend")
      ) ||
      keys[2] ||
      keys[0];

    // Auto-fill for pie chart: values & detail
    if (chartType === "pie") {
      // values: tìm field có value, percentage, hoặc value lớn nhất
      const valueField =
        keys.find(
          (k) =>
            k.toLowerCase().includes("value") ||
            k.toLowerCase().includes("percentage") ||
            k.toLowerCase().includes("count")
        ) ||
        keys[1] ||
        keys[0];
      // detail: tìm field có name, label, hoặc category
      const detailField =
        keys.find(
          (k) =>
            k.toLowerCase().includes("name") ||
            k.toLowerCase().includes("label") ||
            k.toLowerCase().includes("category")
        ) || keys[0];
      setCategoryFields((prev) => ({
        ...prev,
        legend: legendField
          ? [{ id: 3, field: legendField, action: "no-action" }]
          : [],
        values: valueField ? [{ id: 4, field: valueField, action: "sum" }] : [],
        detail: detailField
          ? [{ id: 5, field: detailField, action: "no-action" }]
          : [],
      }));
    } else if (chartType === "lineAndColumn") {
      // For lineAndColumn, auto-fill both columnY and lineY from data keys
      // Try to find two different Y fields (e.g., sales and profit)
      const yKeys = keys.filter(
        (k) =>
          k.toLowerCase().includes("sales") ||
          k.toLowerCase().includes("profit") ||
          k.toLowerCase().includes("value") ||
          k.toLowerCase().includes("amount")
      );
      const columnYField = yKeys[0] || keys[1] || keys[0];
      const lineYField = yKeys[1] || yKeys[0] || keys[2] || keys[1] || keys[0];
      setCategoryFields((prev) => ({
        ...prev,
        xAxis: xField ? [{ id: 1, field: xField, action: "no-action" }] : [],
        columnY: columnYField
          ? [{ id: 2, field: columnYField, action: "sum" }]
          : [],
        lineY: lineYField ? [{ id: 3, field: lineYField, action: "sum" }] : [],
        legend: legendField
          ? [{ id: 4, field: legendField, action: "no-action" }]
          : [],
      }));
    } else {
      setCategoryFields((prev) => ({
        ...prev,
        xAxis: xField ? [{ id: 1, field: xField, action: "no-action" }] : [],
        yAxis: yField ? [{ id: 2, field: yField, action: "sum" }] : [],
        legend: legendField
          ? [{ id: 3, field: legendField, action: "no-action" }]
          : [],
      }));
    }
  }, [rawData, chartType]);

  const allowsAddingFields = () => {
    return !SIMPLE_CHART_TYPES.includes(chartType);
  };

  const allowsAddingFieldsToCategory = (fieldKey: string) => {
    if (!allowsAddingFields()) {
      return false;
    }
    if (SINGLE_FIELD_TYPES.includes(fieldKey)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (fieldKey === "yAxis" && FIELD_RESTRICTIONS.yAxis.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (fieldKey === "xAxis" && FIELD_RESTRICTIONS.xAxis.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (
      fieldKey === "legend" &&
      FIELD_RESTRICTIONS.legend.includes(chartType)
    ) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (
      fieldKey === "columnY" &&
      FIELD_RESTRICTIONS.columnY.includes(chartType)
    ) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (fieldKey === "lineY" && FIELD_RESTRICTIONS.lineY.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (
      fieldKey === "columnLegend" &&
      FIELD_RESTRICTIONS.columnLegend.includes(chartType)
    ) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    if (FIELD_RESTRICTIONS.allFields.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }
    return true;
  };

  const getFieldDisplayName = (fieldKey: string) => {
    return FIELD_DISPLAY_NAMES[fieldKey] || fieldKey;
  };

  const addFieldToCategory = (category: string) => {
    const newField = {
      id: Date.now(),
      field: "",
      action: "",
    };
    setCategoryFields((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newField],
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

  const SimpleFieldSelector = ({ field, category, onUpdate }: any) => (
    <div className="simple-field-selector">
      <div className="selector-row">
        <div className="selector-group">
          <Select
            title="Chọn trường dữ liệu"
            size="small"
            value={field.field || undefined}
            onChange={(value) => onUpdate(category, field.id, "field", value)}
            style={{ width: "100%" }}
            placeholder="Select field"
            options={FIELD_OPTIONS}
            allowClear
          />
        </div>
        <div className="selector-group">
          <Select
            title="Chọn hành động cho trường"
            size="small"
            value={field.action || undefined}
            onChange={(value) => onUpdate(category, field.id, "action", value)}
            style={{ width: "100%" }}
            options={FIELD_ACTION_OPTIONS}
            placeholder="Select action"
            allowClear
          />
        </div>
      </div>
    </div>
  );

  // Determine table name based on chartType
  let tableName = "";
  // Sử dụng monthlyData cho stackedColumn, còn stackedBar vẫn dùng stackedData
  if (chartType === "stackedColumn") {
    tableName = "monthlyData";
  } else if (chartType === "stackedBar") {
    tableName = "stackedData";
  } else if (
    chartType === "clusteredColumn" ||
    chartType === "clusteredBar" ||
    chartType === "lineAndColumn" ||
    chartType === "line"
  ) {
    tableName = "monthlyData";
  } else if (chartType === "pie") tableName = "categories";
  else tableName = "data";

  return (
    <div className="data-config-tab">
      <div className="data-source-section">
        <div className="source-table-row">
          <div className="selector-group">
            <Tooltip title="Chọn nguồn dữ liệu cho biểu đồ">
              <Typography.Text className="selector-label">
                Data source:
              </Typography.Text>
            </Tooltip>
            <Tooltip title="Chọn nguồn dữ liệu (API, file, v.v.)">
              <Select
                title="Chọn trường dữ liệu cho nhóm này"
                size="small"
                value={dataSource}
                onChange={setDataSource}
                style={{ width: "100%" }}
                options={DATA_SOURCE_OPTIONS}
              />
            </Tooltip>
          </div>
          <div className="selector-group">
            <Tooltip title="Tên bảng dữ liệu đang sử dụng cho biểu đồ">
              <Typography.Text className="selector-label">
                Table:
              </Typography.Text>
            </Tooltip>
            <Tooltip title="Bảng dữ liệu tương ứng với loại biểu đồ đang chọn">
              <Select
                title="Chọn hành động cho trường trong nhóm"
                size="small"
                value={tableName}
                style={{ width: "100%" }}
                disabled
                options={[{ label: tableName, value: tableName }]}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="field-categories">
        {getAvailableFields().map((fieldKey) => {
          const fieldsForCategory = categoryFields[fieldKey] || [];
          return (
            <div key={fieldKey} className="field-category">
              <div className="category-header">
                <Tooltip
                  title={
                    fieldKey === "xAxis"
                      ? "Chọn trường dữ liệu cho trục X"
                      : fieldKey === "yAxis" || fieldKey === "columnY"
                      ? "Chọn trường dữ liệu cho trục Y"
                      : fieldKey === "legend" || fieldKey === "columnLegend"
                      ? "Chọn trường dữ liệu để phân biệt màu sắc (legend)"
                      : undefined
                  }
                >
                  <Typography.Text className="category-title">
                    {getFieldDisplayName(fieldKey)}
                    {fieldKey === "legend" &&
                    fieldsForCategory.length > 0 &&
                    fieldsForCategory[0].field ? (
                      <span
                        style={{
                          color: "#1677ff",
                          marginLeft: 8,
                          fontWeight: 500,
                        }}
                      >
                        {/* (Color :{fieldsForCategory[0].field}) */}
                      </span>
                    ) : null}
                  </Typography.Text>
                </Tooltip>
              </div>
              <div className="field-list">
                {fieldsForCategory.map((field) => (
                  <SimpleFieldSelector
                    key={field.id}
                    field={field}
                    category={fieldKey}
                    onUpdate={updateFieldInCategory}
                  />
                ))}
                {allowsAddingFieldsToCategory(fieldKey) && (
                  <div className="add-field-button">
                    <Button
                      title="Thêm trường mới vào nhóm"
                      type="dashed"
                      icon={<Plus size={14} />}
                      onClick={() => addFieldToCategory(fieldKey)}
                      block
                      size="small"
                    >
                      Add field
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
