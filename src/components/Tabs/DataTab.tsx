import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Select, Divider, Button, Space } from "antd";
import { Plus, X } from "lucide-react";
import { RootState } from "../../store/store";
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
  DEFAULT_AVAILABLE_FIELDS,
} from "../../constants/index";

export const DataConfigTab: React.FC = () => {
  const chartType = useSelector((state: RootState) => state.chart.chartType);
  const currentConfig = useSelector(
    (state: RootState) => state.chart.chartConfigs[state.chart.chartType]
  );
  const dataConfig = currentConfig.data;

  // State để quản lý nguồn dữ liệu và bảng được chọn
  const [dataSource, setDataSource] = useState("API");
  const [selectedTable, setSelectedTable] = useState("cities");

  // State để quản lý các field của từng category (Y-axis, X-axis, Legend, v.v.)
  const [categoryFields, setCategoryFields] = useState<{
    [key: string]: any[];
  }>({
    yAxis: [{ id: 1, field: "population", action: "sum" }], // Trục Y
    xAxis: [{ id: 2, field: "name", action: "no-action" }], // Trục X
    legend: [{ id: 3, field: "name", action: "no-action" }], // Chú thích
    values: [{ id: 4, field: "gdp", action: "sum" }], // Giá trị (cho pie chart)
    secondaryYAxis: [], // Trục Y phụ
    detail: [], // Chi tiết (cho pie chart)
    columnY: [], // Column Y (cho line+column chart)
    lineY: [], // Line Y (cho line+column chart)
    columnLegend: [], // Column Legend (cho line+column chart)
  });

  // Hàm xác định các field có sẵn cho từng loại chart
  const getAvailableFields = () => {
    return CHART_AVAILABLE_FIELDS[chartType] || DEFAULT_AVAILABLE_FIELDS;
  };

  // Kiểm tra xem loại chart có cho phép thêm nhiều field không
  const allowsAddingFields = () => {
    return !SIMPLE_CHART_TYPES.includes(chartType);
  };

  // Kiểm tra xem một category field cụ thể có cho phép thêm field không
  const allowsAddingFieldsToCategory = (fieldKey: string) => {
    // Các chart đơn giản không cho phép thêm field vào các category cơ bản
    if (!allowsAddingFields()) {
      return false;
    }

    // Các field chỉ cho phép 1 field
    if (SINGLE_FIELD_TYPES.includes(fieldKey)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }

    // Y-axis cho stacked/clustered column charts chỉ cho phép 1 field
    if (fieldKey === "yAxis" && FIELD_RESTRICTIONS.yAxis.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }

    // X-axis cho stacked/clustered bar charts chỉ cho phép 1 field
    if (fieldKey === "xAxis" && FIELD_RESTRICTIONS.xAxis.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }

    // Line chart - tất cả fields chỉ cho phép 1 field
    if (FIELD_RESTRICTIONS.allFields.includes(chartType)) {
      const fieldsForCategory = categoryFields[fieldKey] || [];
      return fieldsForCategory.length === 0;
    }

    return true;
  };

  // Hàm lấy tên hiển thị cho từng loại field
  const getFieldDisplayName = (fieldKey: string) => {
    return FIELD_DISPLAY_NAMES[fieldKey] || fieldKey;
  };

  // Hàm thêm field mới vào category
  const addFieldToCategory = (category: string) => {
    const newField = {
      id: Date.now(), // ID duy nhất dựa trên timestamp
      field: "population", // Field mặc định
      action: "sum", // Action mặc định là tổng
    };
    setCategoryFields((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newField],
    }));
  };

  const removeFieldFromCategory = (category: string, fieldId: number) => {
    setCategoryFields((prev) => ({
      ...prev,
      [category]: prev[category]?.filter((field) => field.id !== fieldId) || [],
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
  // Component để chọn field đơn giản với dropdown
  const SimpleFieldSelector = ({
    field, // Object field hiện tại
    category, // Category của field (yAxis, xAxis, v.v.)
    onUpdate, // Hàm callback khi update field
    onRemove, // Hàm callback khi xóa field
  }: any) => (
    <div className="simple-field-selector">
      <div className="selector-row">
        <div className="selector-group">
          {/* Dropdown để chọn field */}
          <Select
            size="small"
            value={field.field}
            onChange={(value) => onUpdate(category, field.id, "field", value)}
            style={{ width: "100%" }}
            placeholder="Select field"
            options={FIELD_OPTIONS}
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
              options={FIELD_ACTION_OPTIONS}
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

  // Render chính của Data Config Tab
  return (
    <div className="data-config-tab">
      {/* Phần chọn Data Source và Table */}
      <div className="data-source-section">
        <div className="source-table-row">
          {/* Selector cho Data Source */}
          <div className="selector-group">
            <Typography.Text className="selector-label">
              Data source:
            </Typography.Text>
            <Select
              size="small"
              value={dataSource}
              onChange={setDataSource}
              style={{ width: "100%" }}
              options={DATA_SOURCE_OPTIONS}
            />
          </div>
          {/* Selector cho Table */}
          <div className="selector-group">
            <Typography.Text className="selector-label">Table:</Typography.Text>
            <Select
              size="small"
              value={selectedTable}
              onChange={setSelectedTable}
              style={{ width: "100%" }}
              options={TABLE_OPTIONS}
            />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      {/* Field Categories - Different for each chart type */}
      <div className="field-categories">
        {getAvailableFields().map((fieldKey) => {
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

                {/* Add button inside each category - check specific category rules */}
                {allowsAddingFieldsToCategory(fieldKey) && (
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
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
