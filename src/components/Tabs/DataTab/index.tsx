import React, { useEffect, useRef } from "react";
import { Divider } from "antd";
import { DataTabProps, DataConfigState } from "./types";
import { useCategoryFields } from "./hooks/useCategoryFields";
import DataSourceSelector from "./components/DataSourceSelector";
import FieldCategoryBlock from "./components/FieldCategoryBlock";
import SimpleFieldSelector from "./components/SimpleFieldSelector";
import { getTableName } from "./utils/getTableName";
import { getFieldOptionsForTable } from "../../../constants";
import { chartData as chartDataCollection } from "../../../data";
import { useTranslation } from "react-i18next";

// ✅ tiện ích so sánh sâu nhanh gọn
const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

export const DataTab: React.FC<DataTabProps> = ({
  chartType,
  rawData,
  data,
  value,
  onChange,
  tableNames, // thêm
}) => {
  const { t } = useTranslation();

  const {
    dataSource,
    setDataSource,
    categoryFields,
    setCategoryFields,
    getAvailableFields,
    getFieldDisplayName,
    allowsAddingFieldsToCategory,
    addFieldToCategory,
    updateFieldInCategory,
    removeFieldFromCategory,
    detectAndSetFields,
  } = useCategoryFields(chartType, rawData, false);

  // ✅ Đồng bộ từ "value" (nếu chạy controlled) nhưng CHỈ khi khác hiện tại
  useEffect(() => {
    if (!value) return;
    if (value.dataSource !== dataSource) {
      setDataSource(value.dataSource);
    }
    // Chỉ đồng bộ categoryFields nếu provider thực sự có trường được chọn
    const hasAnySelectedFieldFromValue = (cfg?: typeof categoryFields) => {
      if (!cfg) return false;
      return Object.values(cfg).some(
        (arr) =>
          Array.isArray(arr) &&
          arr.some((f) =>
            Boolean(f && f.field && String(f.field).trim() !== "")
          )
      );
    };

    if (
      hasAnySelectedFieldFromValue(value.categoryFields) &&
      !deepEqual(value.categoryFields, categoryFields)
    ) {
      setCategoryFields(value.categoryFields || {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); // cố ý chỉ phụ thuộc vào "value"

  const tableInfo = getTableName(chartType);
  // Nếu tableNames không được truyền, thử lấy từ một object chứa nhiều bảng (nếu parent truyền toàn bộ chartData)
  const computedTableNames =
    tableNames && tableNames.length > 0
      ? tableNames
      : // fallback: nếu `data` là object chứa nhiều bảng (hiếm), dùng Object.keys(data)
      Array.isArray(data) && data.length === 0
      ? []
      : // fallback khác: dùng tên mặc định từ getTableName
        [tableInfo.name];

  // selected table state (key, e.g. 'monthlyData')
  // Start with no table selected by default (undefined)
  const [selectedTable, setSelectedTable] = React.useState<string | undefined>(
    (value && value.tableName) || undefined
  );

  // Sync incoming controlled value.tableName (also when it's empty) and
  // reset when chartType changes so the Select doesn't keep the previous
  // chart's table value when switching charts.
  useEffect(() => {
    const incomingTable = (value && value.tableName) || undefined;
    if (incomingTable !== selectedTable) {
      setSelectedTable(incomingTable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, chartType]);

  // Compute available field options for the selected table
  const fieldOptions = React.useMemo(() => {
    if (!selectedTable) return [] as { label: string; value: string }[];
    // data may be an object of named tables (chartData) or a single array
    // Prefer using the canonical chartData collection to compute field options
    try {
      return getFieldOptionsForTable(chartDataCollection as any, selectedTable);
    } catch (e) {
      // fallback to using provided `data` if chartData isn't available
      if (data && !Array.isArray(data) && typeof data === "object") {
        try {
          return getFieldOptionsForTable(data as any, selectedTable);
        } catch (e2) {
          return [];
        }
      }
      return [];
    }
    if (Array.isArray(data) && data.length > 0) {
      return Object.keys(data[0] || {}).map((k) => ({ label: k, value: k }));
    }
    // fallback: use available field keys suggested by chart type
    return getAvailableFields().map((f) => ({ label: f, value: f }));
  }, [selectedTable, data, getAvailableFields]);
  // ✅ Chỉ phát onChange khi khác "value" (tránh ping-pong với Provider)
  const didMount = useRef(false);

  // Reset the mount-skip flag whenever the chart type changes so that
  // switching charts will not immediately emit an onChange from stale state
  // and cause a ping-pong with the Provider.
  useEffect(() => {
    didMount.current = false;
  }, [chartType]);

  useEffect(() => {
    if (!onChange) return;
    const next: DataConfigState = {
      dataSource,
      categoryFields,
      tableName: selectedTable,
    };

    // Skip the very first render to avoid mount-time ping-pong with Provider
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (!value || !deepEqual(value, next)) {
      onChange(next);
    }
  }, [dataSource, categoryFields, selectedTable, value, onChange]);

  // Truyền tableNames xuống DataSourceSelector
  return (
    <div className="data-config-tab">
      <DataSourceSelector
        dataSource={dataSource}
        onChange={setDataSource}
        // tableName phải là key (vd: 'monthlyData'), không phải chuỗi dịch
        tableName={selectedTable}
        tableNames={computedTableNames}
        onTableChange={(tbl) => {
          // update selected table
          setSelectedTable(tbl);
          // Reset all selected fields whenever the table changes so the
          // DataTab starts empty for the newly selected table. The user can
          // then run explicit detection or pick fields manually.
          setCategoryFields({});
          // Do not auto-detect fields here to avoid cross-chart side effects.
          // If tbl is falsy (cleared), we've already reset fields above.
        }}
      />

      <Divider style={{ margin: "12px 0" }} />

      <div className="field-categories">
        {getAvailableFields().map((fieldKey) => {
          const fieldsForCategory = categoryFields[fieldKey] || [];
          return (
            <FieldCategoryBlock
              key={fieldKey}
              fieldKey={fieldKey}
              title={t(
                `dataTab.fieldCategory.${fieldKey}`,
                getFieldDisplayName(fieldKey)
              )}
              fields={fieldsForCategory}
              canAdd={allowsAddingFieldsToCategory(fieldKey)}
              onAdd={() => addFieldToCategory(fieldKey)}
              renderField={(field) => (
                <SimpleFieldSelector
                  key={field.id}
                  field={field}
                  category={fieldKey}
                  onUpdate={updateFieldInCategory}
                  onRemove={removeFieldFromCategory}
                  options={fieldOptions}
                />
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DataTab;
