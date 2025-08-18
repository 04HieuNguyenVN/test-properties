import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Select, Dropdown, Menu, Space } from "antd";
import { ChevronDown, X, Plus } from "lucide-react";
import { RootState } from "../../store/store";
import {
  removeDataItem,
  updateFieldType,
  toggleSection,
} from "../../store/chartSlice";
import { DataField, ChartType } from "../../types/interfaces";
import ConfigSection from "../Common/ConfigSection";

const DataConfigTab: React.FC = () => {
  const dispatch = useDispatch();
  const { expandedSections, chartConfigs, chartType, data } = useSelector(
    (state: RootState) => state.chart
  );

  const dataConfig = chartConfigs[chartType].data;

  const getAvailableSections = (chartType: ChartType): string[] => {
    switch (chartType) {
      case "column":
      case "stackedColumn":
      case "clusteredColumn":
        return ["yAxis", "xAxis", "legend", "drillThrough"];
      case "bar":
      case "stackedBar":
      case "clusteredBar":
        return ["yAxis", "xAxis", "legend", "drillThrough"];
      case "line":
        return ["xAxis", "yAxis", "legend", "drillThrough"];
      case "lineAndColumn":
        return ["xAxis", "yAxis", "secondaryYAxis", "legend", "drillThrough"];
      case "pie":
        return ["legend", "values", "drillThrough"];
      default:
        return ["xAxis", "columnY", "lineY", "columnLegend", "drillThrough"];
    }
  };

  const getSectionDisplayName = (sectionKey: string): string => {
    const displayNames: { [key: string]: string } = {
      yAxis: "Y-Axis",
      xAxis: "X-Axis",
      legend: "Legend",
      values: "Values",
      tooltips: "Tooltips",
      smallMultiples: "Small multiples",
      secondaryYAxis: "Secondary Y-Axis",
      columnY: "Column Y-Axis",
      lineY: "Line Y-Axis",
      columnLegend: "Column Legend",
      drillThrough: "Drill through",
    };
    return displayNames[sectionKey] || sectionKey;
  };

  const availableFields = [
    "Khu vực",
    "Tỉnh",
    "Sum of GDPGRDP 20...",
    "Sum of Dân số (người)",
    "Sum of Diện tích (km²)",
    "Population",
    "GDP",
    "Revenue",
    "Growth",
    "Temperature",
    "Humidity",
  ];

  const renderFieldItem = (field: DataField, category: string) => {
    const typeMenu = (
      <Menu
        onClick={({ key }) => {
          dispatch(
            updateFieldType({
              fieldName: field.name,
              newType: key as "sum" | "count" | "average",
              category,
            })
          );
        }}
      >
        <Menu.Item key="sum">Sum</Menu.Item>
        <Menu.Item key="count">Count</Menu.Item>
        <Menu.Item key="average">Average</Menu.Item>
      </Menu>
    );

    return (
      <div key={field.name} className="field-item">
        <div className="field-content">
          <Typography.Text className="field-name">{field.name}</Typography.Text>
          <div className="field-actions">
            <Dropdown overlay={typeMenu} trigger={["click"]}>
              <Button size="small" className="field-type-btn">
                {field.type} <ChevronDown size={12} />
              </Button>
            </Dropdown>
            <Button
              size="small"
              icon={<X size={12} />}
              onClick={() =>
                dispatch(removeDataItem({ category, fieldName: field.name }))
              }
              className="remove-field-btn"
            />
          </div>
        </div>
      </div>
    );
  };

  const addFieldMenu = (category: string) => (
    <Menu
      onClick={({ key }) => {
        // Add logic to add field to category
        console.log(`Adding ${key} to ${category}`);
      }}
    >
      {availableFields.map((field) => (
        <Menu.Item key={field}>{field}</Menu.Item>
      ))}
    </Menu>
  );

  const renderSectionContent = (sectionKey: string) => {
    const fields = (dataConfig as any)[sectionKey] as DataField[];

    if (sectionKey === "drillThrough") {
      return (
        <div className="section-content">
          <div className="drill-through-content">
            <div className="form-group">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={dataConfig.drillThrough.crossReport}
                  onChange={(e) => {
                    // Handle cross report change
                  }}
                />
                <Typography.Text>Cross report drill through</Typography.Text>
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={dataConfig.drillThrough.keepAllFilters}
                  onChange={(e) => {
                    // Handle keep all filters change
                  }}
                />
                <Typography.Text>Keep all filters</Typography.Text>
              </label>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="section-content">
        <div className="fields-container">
          {fields && fields.length > 0 ? (
            fields.map((field) => renderFieldItem(field, sectionKey))
          ) : (
            <div className="empty-state">
              <Typography.Text type="secondary">
                Add data fields by dragging them here or use the + button
              </Typography.Text>
            </div>
          )}
          <Dropdown overlay={addFieldMenu(sectionKey)} trigger={["click"]}>
            <Button
              type="dashed"
              icon={<Plus size={16} />}
              className="add-field-btn"
              block
            >
              Add data field
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <div className="data-config-container">
      {getAvailableSections(chartType).map((sectionKey) => (
        <ConfigSection
          key={sectionKey}
          title={getSectionDisplayName(sectionKey)}
          isExpanded={expandedSections[sectionKey] || false}
          onToggle={() => dispatch(toggleSection(sectionKey))}
        >
          {renderSectionContent(sectionKey)}
        </ConfigSection>
      ))}
    </div>
  );
};

export default DataConfigTab;
