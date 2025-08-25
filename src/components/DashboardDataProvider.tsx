import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chart";
import chartData from "../data/chartData.json";
import { setRawChartDataForChart } from "../store/chart";
import type { CategoryFields, FieldItem } from "./Tabs/DataTab/types";
import { CHART_AVAILABLE_FIELDS, DEFAULT_AVAILABLE_FIELDS } from "../constants";
import { getTableName } from "./Tabs/DataTab/utils/getTableName";

/** ---- Types ---- */
interface DataConfigState {
  dataSource: string;
  categoryFields: CategoryFields;
  tableName?: string;
}

interface DashboardDataProviderProps {
  children: (data: {
    chartType: string;
    config: any;
    rawData: any[];
    data: any[]; // dữ liệu đã xử lý
    dataConfig: DataConfigState;
    onDataConfigChange: (next: DataConfigState) => void;
    availableTables: string[];
    processSummary: { key: string; value: number }[];
    chartConfig: {
      xField?: string;
      yFields?: string[];
      legendField?: string;
      valueField?: string;
    };
  }) => React.ReactNode;
}

/** ---- Helpers chung ---- */
const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
const firstField = (items?: FieldItem[]) =>
  items && items.length > 0 ? items[0] : undefined;
const groupBy = (arr: any[], key: string) =>
  arr.reduce((acc: Record<string, any[]>, it) => {
    const k = String(it?.[key]);
    (acc[k] ||= []).push(it);
    return acc;
  }, {});

/** xác định field có “có vẻ” là số (dựa trên sample ≤ 50) */
const isLikelyNumeric = (rows: any[], field?: string) => {
  if (!field) return false;
  let seen = 0,
    ok = 0;
  for (let i = 0; i < rows.length && seen < 50; i++) {
    const v = rows[i]?.[field];
    if (v == null) continue;
    seen++;
    const n = typeof v === "number" ? v : Number(v);
    if (Number.isFinite(n)) ok++;
  }
  return seen > 0 && ok / seen >= 0.6;
};

/** Áp dụng phép gộp (sum/avg/min/max/count) an toàn */
const applyAgg = (rows: any[], field: string, action?: string): number => {
  const op = (action || "sum").toLowerCase();
  if (op === "count") {
    return rows.filter((r) => r && typeof r === "object" && r[field] != null)
      .length;
  }
  const nums = rows
    .map((r) => {
      const v = r?.[field];
      const n = typeof v === "number" ? v : Number(v);
      return Number.isFinite(n) ? n : null;
    })
    .filter((v) => v != null) as number[];
  if (op === "average" || op === "avg" || op === "mean")
    return nums.length ? nums.reduce((s, v) => s + v, 0) / nums.length : 0;
  if (op === "min") return nums.length ? Math.min(...nums) : 0;
  if (op === "max") return nums.length ? Math.max(...nums) : 0;
  return nums.reduce((s, v) => s + v, 0); // mặc định sum
};

const hasAnySelectedField = (cfg?: CategoryFields) => {
  if (!cfg) return false;
  const count =
    (cfg.xAxis?.length ?? 0) +
    (cfg.yAxis?.length ?? 0) +
    (cfg.values?.length ?? 0) +
    (cfg.legend?.length ?? 0) +
    (cfg.columnY?.length ?? 0) +
    (cfg.lineY?.length ?? 0);
  return count > 0;
};

const isBarChart = (t: string) => t === "clusteredBar" || t === "stackedBar";

/** ---- Tính dữ liệu processed theo DataTab ---- */
const computeProcessed = (
  chartType: string,
  rawData: any[],
  cfg: CategoryFields
): any[] => {
  if (!rawData || rawData.length === 0) return [];
  if (!hasAnySelectedField(cfg)) return [];

  // PIE
  if (chartType === "pie") {
    const detail =
      firstField(cfg.detail)?.field || firstField(cfg.legend)?.field;
    const val = firstField(cfg.values);
    if (!detail || !val?.field) return [];
    const g = groupBy(rawData, detail);
    return Object.entries(g).map(([k, rows]) => ({
      name: k,
      value: applyAgg(
        rows,
        val.field,
        val.action || (isLikelyNumeric(rows, val.field) ? "sum" : "count")
      ),
    }));
  }

  /** ---- BAR CHART (ngang): Y là danh mục, X là số đo ---- */
  if (isBarChart(chartType)) {
    const categoryKey =
      firstField(cfg.yAxis)?.field || firstField(cfg.xAxis)?.field; // ưu tiên Y làm danh mục
    const legendKey = firstField(cfg.legend)?.field || undefined;
    // Measure: ưu tiên Values; nếu trống → dùng X‑Axis (trường hợp bạn chọn Area ở X)
    const measureItems =
      (cfg.values && cfg.values.length ? cfg.values : cfg.xAxis) || [];
    const measure = firstField(measureItems);
    if (!categoryKey || !measure?.field) return [];

    if (legendKey) {
      // PIVOT theo legend: mỗi giá trị legend → 1 cột
      const gByCat = groupBy(rawData, categoryKey);
      const out: any[] = [];
      Object.entries(gByCat).forEach(([cat, rows]) => {
        const gByLegend = groupBy(rows, legendKey);
        const row: any = { [categoryKey]: cat };
        Object.entries(gByLegend).forEach(([lg, lgRows]) => {
          const inferred =
            measure.action ||
            (isLikelyNumeric(lgRows, measure.field) ? "sum" : "count");
          row[lg] = applyAgg(lgRows, measure.field, inferred);
        });
        out.push(row);
      });
      return out;
    }

    // Không legend → mỗi measure là một series (WIDE)
    const g = groupBy(rawData, categoryKey);
    return Object.entries(g).map(([cat, rows]) => {
      const row: any = { [categoryKey]: cat };
      measureItems.forEach((m) => {
        const inferred =
          m.action || (isLikelyNumeric(rows, m.field) ? "sum" : "count");
        row[m.field] = applyAgg(rows, m.field, inferred);
      });
      return row;
    });
  }

  /** ---- Các chart khác (column/line/…): X là danh mục, Y là số đo ---- */
  const x = firstField(cfg.xAxis)?.field;
  const legend = firstField(cfg.legend)?.field;
  const yItems =
    (cfg.yAxis?.length ? cfg.yAxis : cfg.values) || cfg.columnY || [];
  if (!x || !yItems.length) return [];

  if (legend) {
    // PIVOT theo legend (mỗi giá trị legend → 1 cột)
    const gByX = groupBy(rawData, x);
    const y = firstField(yItems);
    const out: any[] = [];
    Object.entries(gByX).forEach(([xKey, rows]) => {
      const gByLegend = groupBy(rows, legend);
      const row: any = { [x]: xKey };
      Object.entries(gByLegend).forEach(([lg, lgRows]) => {
        const inferred =
          y?.action ||
          (y?.field
            ? isLikelyNumeric(lgRows, y.field)
              ? "sum"
              : "count"
            : "count");
        row[lg] = y?.field
          ? applyAgg(lgRows, y.field, inferred)
          : lgRows.length;
      });
      out.push(row);
    });
    return out;
  }

  const g = groupBy(rawData, x);
  return Object.entries(g).map(([xKey, rows]) => {
    const row: any = { [x]: xKey };
    yItems.forEach((it) => {
      const inferred =
        it.action || (isLikelyNumeric(rows, it.field) ? "sum" : "count");
      row[it.field] = applyAgg(rows, it.field, inferred);
    });
    return row;
  });
};

/** Kết quả action để hiển thị ở ProcessedDataPanel */
const computeProcessSummary = (
  chartType: string,
  rawData: any[],
  cfg: CategoryFields
): { key: string; value: number }[] => {
  if (!rawData || rawData.length === 0) return [];
  const out: { key: string; value: number }[] = [];
  const categoryOrder: string[] =
    (CHART_AVAILABLE_FIELDS[chartType] && CHART_AVAILABLE_FIELDS[chartType]) ||
    (Object.keys(cfg || {}).length
      ? Object.keys(cfg || {})
      : DEFAULT_AVAILABLE_FIELDS);

  categoryOrder.forEach((cat) => {
    const fields = cfg[cat] || [];
    fields.forEach((fi) => {
      if (!fi || !fi.field) return;
      const action = (fi.action || "no-action").toLowerCase();
      if (!action || action === "no-action") return;
      const key = `${
        action[0].toUpperCase() + action.slice(1)
      }${fi.field.replace(/[^a-zA-Z0-9]/g, "")}`;
      const value = applyAgg(rawData, fi.field, action);
      out.push({ key, value });
    });
  });
  return out;
};

/** Map DataTab → chartConfig cơ bản (phần “định tuyến kênh” cho ChartRenderer) */
const buildChartConfigFromDataConfig = (
  chartType: string,
  cfg: DataConfigState
) => {
  const legendField = firstField(cfg.categoryFields.legend)?.field;

  if (isBarChart(chartType)) {
    // ⬅️ BAR: Y là danh mục → map vào xField của chart component (chart sẽ vẽ yField="category")
    const categoryKey =
      firstField(cfg.categoryFields.yAxis)?.field ||
      firstField(cfg.categoryFields.xAxis)?.field;
    const measureItems =
      (cfg.categoryFields.values && cfg.categoryFields.values.length
        ? cfg.categoryFields.values
        : cfg.categoryFields.xAxis) || [];
    const yFields = measureItems.map((f) => f.field); // khi không legend
    const valueField = firstField(cfg.categoryFields.values)?.field;
    return { xField: categoryKey, yFields, legendField, valueField };
  }

  // Mặc định (column/line …): X là danh mục
  const xField = firstField(cfg.categoryFields.xAxis)?.field;
  const yFields =
    (cfg.categoryFields.yAxis &&
      cfg.categoryFields.yAxis.map((f) => f.field)) ||
    (cfg.categoryFields.values &&
      cfg.categoryFields.values.map((f) => f.field)) ||
    [];
  const valueField = firstField(cfg.categoryFields.values)?.field;
  return { xField, yFields, legendField, valueField };
};

/** ---- Provider ---- */
const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({
  children,
}) => {
  const { chartType, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;
  const config = chartConfigs[chartType]?.format;

  const makeDefaultConfig = (ct: string): DataConfigState => ({
    dataSource: "API",
    categoryFields: {
      yAxis: [],
      xAxis: [],
      legend: [],
      values: [],
      secondaryYAxis: [],
      detail: [],
      columnY: [],
      lineY: [],
      columnLegend: [],
    },
    tableName: undefined,
  });

  const [dataConfigByChart, setDataConfigByChart] = React.useState<
    Record<string, DataConfigState>
  >(() => ({}));
  const dataConfig: DataConfigState =
    dataConfigByChart[chartType] ?? makeDefaultConfig(chartType);

  // Xác định rawData theo tableName (nếu đã chọn)
  const selectedTableName = dataConfig?.tableName;
  const rawData: any[] =
    selectedTableName && (chartData as any)[selectedTableName]
      ? (chartData as any)[selectedTableName]
      : chartType === "pie"
      ? (chartData as any).categories
      : chartType === "stackedBar"
      ? (chartData as any).stackedData
      : (chartData as any).monthlyData;

  const [processed, setProcessed] = React.useState<any[]>([]);
  const [processSummary, setProcessSummary] = React.useState<
    { key: string; value: number }[]
  >([]);
  const [chartConfigMap, setChartConfigMap] = React.useState<any>({});

  const cfgKey = React.useMemo(() => JSON.stringify(dataConfig), [dataConfig]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const next = computeProcessed(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    setProcessed(next && next.length ? next : []); // không fallback

    const summary = computeProcessSummary(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    setProcessSummary(summary);

    const cfgMap = buildChartConfigFromDataConfig(chartType, dataConfig);

    // ✅ Đồng bộ yFields theo dữ liệu đã pivot/aggregate
    if (cfgMap?.xField && next && next.length) {
      const set = new Set<string>();
      for (const row of next)
        Object.keys(row || {}).forEach((k) => {
          if (k !== cfgMap.xField) set.add(k);
        });
      const derived = Array.from(set);
      if (derived.length) {
        cfgMap.yFields = derived; // ví dụ: ["Bắc Bộ","Trung Bộ","Nam Bộ"] hoặc ["Area","Population"]
        (cfgMap as any).seriesField = undefined; // chạy WIDE mode
      }
    }

    setChartConfigMap(cfgMap);
  }, [chartType, rawData, cfgKey]);

  // Đưa raw vào Redux nếu nơi khác cần
  React.useEffect(() => {
    dispatch(
      setRawChartDataForChart({
        chartType,
        data: Array.isArray(rawData) ? rawData : [],
      })
    );
  }, [dispatch, rawData]);

  const handleDataConfigChange = React.useCallback(
    (next: DataConfigState) => {
      setDataConfigByChart((prev) => {
        if (deepEqual(prev[chartType] ?? makeDefaultConfig(chartType), next))
          return prev;
        return { ...prev, [chartType]: next };
      });
    },
    [chartType]
  );

  const availableTables = React.useMemo(() => Object.keys(chartData || {}), []);

  return (
    <>
      {children({
        chartType,
        config,
        rawData: Array.isArray(rawData) ? rawData : [],
        data: processed,
        dataConfig,
        onDataConfigChange: handleDataConfigChange,
        availableTables,
        processSummary,
        chartConfig: chartConfigMap,
      })}
    </>
  );
};

export default DashboardDataProvider;
