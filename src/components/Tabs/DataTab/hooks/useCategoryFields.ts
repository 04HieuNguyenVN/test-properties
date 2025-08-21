import { useEffect, useMemo, useState } from "react";
import {
  CHART_AVAILABLE_FIELDS,
  DEFAULT_AVAILABLE_FIELDS,
  SIMPLE_CHART_TYPES,
  SINGLE_FIELD_TYPES,
  FIELD_RESTRICTIONS,
  FIELD_DISPLAY_NAMES,
  loadFieldOptions,
} from "../../../../constants";
import { useTranslation } from "react-i18next";
import type { CategoryFields } from "../types";

export function useCategoryFields(chartType: string, rawData: any[]) {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState("API");
  const [categoryFields, setCategoryFields] = useState<CategoryFields>({
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

  // Auto-detect & preload field options when rawData/chartType changes
  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    // expose rawData to FIELD_OPTIONS pool (giữ nguyên hành vi cũ)
    loadFieldOptions({ temp: rawData }, "temp");

    const keys = Object.keys(rawData[0] || {});
    const pick = (predicate: (k: string) => boolean, fallbackIdx = 0) =>
      keys.find((k) => predicate(k.toLowerCase())) ??
      keys[fallbackIdx] ??
      keys[0];

    const xField = pick(
      (s) =>
        s.includes("name") || s.includes("category") || s.includes("month"),
      0
    );
    const yField = pick(
      (s) =>
        s.includes("value") || s.includes("population") || s.includes("series"),
      1
    );
    const legendField = pick(
      (s) => s.includes("series") || s.includes("type") || s.includes("legend"),
      2
    );

    if (chartType === "pie") {
      const valueField = pick(
        (s) =>
          s.includes("value") ||
          s.includes("percentage") ||
          s.includes("count"),
        1
      );
      const detailField = pick(
        (s) =>
          s.includes("name") || s.includes("label") || s.includes("category"),
        0
      );
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
      return;
    }

    if (chartType === "lineAndColumn") {
      const yKeys = keys.filter((k) => {
        const s = k.toLowerCase();
        return (
          s.includes("sales") ||
          s.includes("profit") ||
          s.includes("value") ||
          s.includes("amount")
        );
      });
      const columnYField = yKeys[0] ?? keys[1] ?? keys[0];
      const lineYField = yKeys[1] ?? yKeys[0] ?? keys[2] ?? keys[1] ?? keys[0];

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
      return;
    }

    setCategoryFields((prev) => ({
      ...prev,
      xAxis: xField ? [{ id: 1, field: xField, action: "no-action" }] : [],
      yAxis: yField ? [{ id: 2, field: yField, action: "sum" }] : [],
      legend: legendField
        ? [{ id: 3, field: legendField, action: "no-action" }]
        : [],
    }));
  }, [rawData, chartType]);

  const getAvailableFields = useMemo(
    () => () => CHART_AVAILABLE_FIELDS[chartType] || DEFAULT_AVAILABLE_FIELDS,
    [chartType]
  );

  const allowsAddingFields = useMemo(
    () => () => !SIMPLE_CHART_TYPES.includes(chartType),
    [chartType]
  );

  const allowsAddingFieldsToCategory = (fieldKey: string) => {
    if (!allowsAddingFields()) return false;

    const onlyOne =
      SINGLE_FIELD_TYPES.includes(fieldKey) ||
      (fieldKey === "yAxis" && FIELD_RESTRICTIONS.yAxis.includes(chartType)) ||
      (fieldKey === "xAxis" && FIELD_RESTRICTIONS.xAxis.includes(chartType)) ||
      (fieldKey === "legend" &&
        FIELD_RESTRICTIONS.legend.includes(chartType)) ||
      (fieldKey === "columnY" &&
        FIELD_RESTRICTIONS.columnY.includes(chartType)) ||
      (fieldKey === "lineY" && FIELD_RESTRICTIONS.lineY.includes(chartType)) ||
      (fieldKey === "columnLegend" &&
        FIELD_RESTRICTIONS.columnLegend.includes(chartType)) ||
      FIELD_RESTRICTIONS.allFields.includes(chartType);

    const fieldsForCategory = categoryFields[fieldKey] || [];
    return onlyOne ? fieldsForCategory.length === 0 : true;
  };

  const getFieldDisplayName = (fieldKey: string) =>
    FIELD_DISPLAY_NAMES[fieldKey] || fieldKey;

  const addFieldToCategory = (category: string) => {
    setCategoryFields((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        { id: Date.now(), field: "", action: "" },
      ],
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
        prev[category]?.map((f) =>
          f.id === fieldId ? { ...f, [key]: value } : f
        ) || [],
    }));
  };

  return {
    dataSource,
    setDataSource,
    categoryFields,
    setCategoryFields,
    getAvailableFields,
    getFieldDisplayName,
    allowsAddingFieldsToCategory,
    addFieldToCategory,
    updateFieldInCategory,
  };
}
