import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chart";
import chartData from "../data/chartData.json";
import { setRawChartDataForChart } from "../store/chart";

import type { CategoryFields, FieldItem } from "./Tabs/DataTab/types";
import { CHART_AVAILABLE_FIELDS, DEFAULT_AVAILABLE_FIELDS } from "../constants";
import { getTableName } from "./Tabs/DataTab/utils/getTableName";

/** Cấu hình DataTab được lưu/đồng bộ (per-chart) */
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
    /** Dữ liệu đã xử lý theo cấu hình ở DataTab */
    data: any[];
    /** Cấu hình hiện tại của DataTab (để DataTab hiển thị lại) */
    dataConfig: DataConfigState;
    /** Cho phép DataTab báo thay đổi cấu hình lên Provider */
    onDataConfigChange: (next: DataConfigState) => void;
    /** Danh sách bảng dữ liệu có sẵn */
    availableTables: string[];
    /** Tóm tắt kết quả các action (sum/count/avg...) trên field đã chọn */
    processSummary: { key: string; value: number }[];
    /** Mapped chart config (xField, yFields, legendField, valueField) */
    chartConfig: {
      xField?: string;
      yFields?: string[];
      legendField?: string;
      valueField?: string;
    };
  }) => React.ReactNode;
}

/* -------------------- Helpers -------------------- */

const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
const firstField = (items?: FieldItem[]) =>
  items && items.length > 0 ? items[0] : undefined;
const groupBy = (arr: any[], key: string) =>
  arr.reduce((acc: Record<string, any[]>, it) => {
    const k = String(it?.[key]);
    (acc[k] ||= []).push(it);
    return acc;
  }, {});

/** Áp dụng phép gộp (sum/avg/min/max/count) an toàn */
const applyAgg = (
  rows: any[],
  field: string,
  action: string | undefined
): number => {
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
  return nums.reduce((s, v) => s + v, 0); // sum mặc định
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

/** Tính dữ liệu processed theo cấu hình DataTab */
const computeProcessed = (
  chartType: string,
  rawData: any[],
  cfg: CategoryFields
): any[] => {
  if (!rawData || rawData.length === 0) return [];
  if (!hasAnySelectedField(cfg)) return []; // ⬅️ chưa chọn gì ⇒ trả rỗng

  // PIE: dùng `detail` làm nhãn lát, `values[0]` làm giá trị
  if (chartType === "pie") {
    const detail =
      firstField(cfg.detail)?.field || firstField(cfg.legend)?.field;
    const val = firstField(cfg.values);
    if (!detail || !val?.field) return [];
    const g = groupBy(rawData, detail);
    return Object.entries(g).map(([k, rows]) => ({
      name: k,
      value: applyAgg(rows, val.field, val.action),
    }));
  }

  // XY Chart: Line/Column/Bar/Stacked/Clustered/Line&Column...
  const x = firstField(cfg.xAxis)?.field;
  const legend = firstField(cfg.legend)?.field;
  const yItems =
    (cfg.yAxis?.length ? cfg.yAxis : cfg.values) ||
    cfg.columnY || // (lineAndColumn) cột
    [];
  if (!x || !yItems.length) return [];

  // Có legend → pivot theo legend (mỗi giá trị legend thành một cột)
  if (legend) {
    const gByX = groupBy(rawData, x);
    const y = firstField(yItems); // dùng trường Y đầu tiên khi có legend
    const out: any[] = [];
    Object.entries(gByX).forEach(([xKey, rows]) => {
      const gByLegend = groupBy(rows, legend);
      const row: any = { [x]: xKey };
      Object.entries(gByLegend).forEach(([lg, lgRows]) => {
        row[lg] = y?.field
          ? applyAgg(lgRows, y.field, y.action)
          : lgRows.length;
      });
      out.push(row);
    });
    return out;
  }

  // Không legend → gộp theo X và tính cho từng Y
  const g = groupBy(rawData, x);
  return Object.entries(g).map(([xKey, rows]) => {
    const row: any = { [x]: xKey };
    yItems.forEach((it) => {
      row[it.field] = applyAgg(rows, it.field, it.action);
    });
    return row;
  });
};

/** Tính tóm tắt kết quả action (sum/count...) cho panel ProcessedData */
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

/** Map từ DataTab → chartConfig cơ bản (xField, yFields, legendField, valueField) */
const buildChartConfigFromDataConfig = (cfg: DataConfigState) => {
  const xField = firstField(cfg.categoryFields.xAxis)?.field;
  const legendField = firstField(cfg.categoryFields.legend)?.field;
  const yFields =
    (cfg.categoryFields.yAxis &&
      cfg.categoryFields.yAxis.map((f) => f.field)) ||
    (cfg.categoryFields.values &&
      cfg.categoryFields.values.map((f) => f.field)) ||
    [];
  const valueField = firstField(cfg.categoryFields.values)?.field;
  return { xField, yFields, legendField, valueField };
};

/* -------------------- Provider -------------------- */

const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({
  children,
}) => {
  const { chartType, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;
  const config = chartConfigs[chartType]?.format;

  // Mỗi chartType có một cấu hình DataTab riêng (controlled)
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
    tableName: undefined, // khởi tạo: chưa chọn table
  });
  const [dataConfigByChart, setDataConfigByChart] = React.useState<
    Record<string, DataConfigState>
  >(() => ({}));
  const dataConfig: DataConfigState =
    dataConfigByChart[chartType] ?? makeDefaultConfig(chartType);

  // Chọn nguồn raw theo tableName (nếu người dùng chọn), fallback theo chartType
  const selectedTableName = dataConfig?.tableName;
  const rawData: any[] =
    selectedTableName && (chartData as any)[selectedTableName]
      ? (chartData as any)[selectedTableName]
      : chartType === "pie"
      ? (chartData as any).categories
      : chartType === "stackedBar"
      ? (chartData as any).stackedData
      : (chartData as any).monthlyData;

  // State dữ liệu/summary/config tính từ DataTab
  const [processed, setProcessed] = React.useState<any[]>([]);
  const [processSummary, setProcessSummary] = React.useState<
    { key: string; value: number }[]
  >([]);
  const [chartConfigMap, setChartConfigMap] = React.useState<any>({});

  // Dùng khoá chuỗi để theo dõi nội dung cấu hình (tránh lệ thuộc reference)
  const cfgKey = React.useMemo(() => JSON.stringify(dataConfig), [dataConfig]);

  // Tính lại processed + summary + chartConfig mỗi khi chartType/rawData/cấu hình đổi
  React.useEffect(() => {
    const next = computeProcessed(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    setProcessed(next && next.length ? next : []); // KHÔNG fallback về rawData

    const summary = computeProcessSummary(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    setProcessSummary(summary);

    const cfgMap = buildChartConfigFromDataConfig(dataConfig);

    // ✅ Nếu có legend ⇒ dữ liệu đã pivot wide → yFields = các cột thực tế trong processed
    if (cfgMap.legendField && cfgMap.xField && next && next.length) {
      const set = new Set<string>();
      for (const row of next) {
        Object.keys(row || {}).forEach((k) => {
          if (k !== cfgMap.xField) set.add(k);
        });
      }
      const derived = Array.from(set);
      if (derived.length) {
        cfgMap.yFields = derived; // đồng bộ với dữ liệu sau pivot
        (cfgMap as any).seriesField = undefined; // wide-mode
      }
    }

    setChartConfigMap(cfgMap);
  }, [chartType, rawData, cfgKey]);

  // Đẩy rawData vào Redux (nếu bạn cần dùng nơi khác)
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setRawChartDataForChart({
        chartType,
        data: Array.isArray(rawData) ? rawData : [],
      })
    );
  }, [dispatch, rawData]);

  // Nhận thay đổi từ DataTab, lưu theo chartType
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
        data: processed, // ⬅️ Chart chỉ nhận data này
        dataConfig,
        onDataConfigChange: handleDataConfigChange,
        availableTables,
        processSummary,
        chartConfig: chartConfigMap, // ⬅️ ChartRenderer sẽ dùng xField/yFields/legendField
      })}
    </>
  );
};

export default DashboardDataProvider;
