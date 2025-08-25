import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chart";
import chartData from "../data/chartData.json";
import { setRawChartDataForChart } from "../store/chart";
import type { CategoryFields, FieldItem } from "./Tabs/DataTab/types";
import { CHART_AVAILABLE_FIELDS, DEFAULT_AVAILABLE_FIELDS } from "../constants";
import { getTableName } from "./Tabs/DataTab/utils/getTableName";

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
    /** Tóm tắt kết quả các action (sum/count/avg) trên các field đã chọn */
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

/** Lấy phần tử đầu tiên trong nhóm trường */
const firstField = (items?: FieldItem[]) =>
  items && items.length > 0 ? items[0] : undefined;

/** Gom nhóm theo khóa */
const groupBy = (arr: any[], key: string) =>
  arr.reduce((acc: Record<string, any[]>, it) => {
    const k = String(it?.[key]);
    (acc[k] ||= []).push(it);
    return acc;
  }, {});

/** Áp dụng phép gộp cho 1 trường số */
const applyAgg = (
  rows: any[],
  field: string,
  action: string | undefined
): number => {
  const op = (action || "sum").toLowerCase();

  // count: count non-null/undefined values (works for strings, numbers, etc.)
  if (op === "count") {
    return rows.filter((r) => r && typeof r === "object" && r[field] != null)
      .length;
  }

  // For numeric aggregations, coerce to numbers and ignore non-numeric
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

  // default: sum
  return nums.reduce((s, v) => s + v, 0);
};

/** Có bất kỳ field nào được chọn chưa? */
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

/** Tính toán data theo cấu hình của DataTab */
const computeProcessed = (
  chartType: string,
  rawData: any[],
  cfg: CategoryFields
): any[] => {
  if (!rawData || rawData.length === 0) return [];
  if (!hasAnySelectedField(cfg)) return []; // ⬅️ quan trọng: chưa chọn gì ⇒ trả rỗng

  // PIE: dùng `detail` làm nhãn lát, `values[0]` làm giá trị (mặc định sum)
  if (chartType === "pie") {
    const detail =
      firstField(cfg.detail)?.field || firstField(cfg.legend)?.field;
    const val = firstField(cfg.values);
    if (!detail || !val?.field) return []; // ⬅️ không đủ cấu hình ⇒ rỗng
    const g = groupBy(rawData, detail);
    return Object.entries(g).map(([k, rows]) => ({
      name: k,
      value: applyAgg(rows, val.field, val.action),
    }));
  }

  // LINE / COLUMN / BAR / STACKED / CLUSTERED / (và hầu hết các loại khác)
  const x = firstField(cfg.xAxis)?.field;
  const legend = firstField(cfg.legend)?.field;
  // Ưu tiên yAxis hoặc values; lineAndColumn có thể cung cấp columnY/lineY
  const yItems =
    (cfg.yAxis?.length ? cfg.yAxis : cfg.values) ||
    cfg.columnY || // for lineAndColumn (cột)
    [];

  if (!x || !yItems.length) return []; // ⬅️ không đủ cấu hình ⇒ rỗng

  // Có legend -> pivot theo legend (mỗi giá trị legend trở thành một cột series)
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

  // Không có legend -> gộp theo X và tính cho từng Y
  const g = groupBy(rawData, x);
  return Object.entries(g).map(([xKey, rows]) => {
    const row: any = { [x]: xKey };
    yItems.forEach((it) => {
      row[it.field] = applyAgg(rows, it.field, it.action);
    });
    return row;
  });
};

const computeProcessSummary = (
  chartType: string,
  rawData: any[],
  cfg: CategoryFields
): { key: string; value: number }[] => {
  if (!rawData || rawData.length === 0) return [];
  const out: { key: string; value: number }[] = [];

  // Determine category order to match DataTab UI
  const categoryOrder: string[] =
    (CHART_AVAILABLE_FIELDS[chartType] && CHART_AVAILABLE_FIELDS[chartType]) ||
    Object.keys(cfg || {}).length
      ? Object.keys(cfg || {})
      : DEFAULT_AVAILABLE_FIELDS;

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

  // ...existing code...

  // State cấu hình DataTab: duy trì một cấu hình cho mỗi chartType
  const defaultTable = getTableName(chartType).name;
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
    // start without a table selected by default
    tableName: undefined,
  });

  const [dataConfigByChart, setDataConfigByChart] = React.useState<
    Record<string, DataConfigState>
  >(() => ({}));

  // current config for active chartType (fallback to default)
  const dataConfig: DataConfigState =
    dataConfigByChart[chartType] ?? makeDefaultConfig(chartType);

  // Nguồn dữ liệu gốc: nếu user chọn tableName trong dataConfig, ưu tiên dùng
  const selectedTableName = dataConfig?.tableName;
  const rawData: any[] =
    selectedTableName && (chartData as any)[selectedTableName]
      ? (chartData as any)[selectedTableName]
      : chartType === "pie"
      ? (chartData as any).categories
      : chartType === "stackedBar"
      ? (chartData as any).stackedData
      : (chartData as any).monthlyData;

  // Dữ liệu sau xử lý theo cấu hình — KHỞI TẠO RỖNG
  const [processed, setProcessed] = React.useState<any[]>([]);
  const [processSummary, setProcessSummary] = React.useState<
    { key: string; value: number }[]
  >([]);
  const [chartConfigMap, setChartConfigMap] = React.useState<any>({});

  // Dùng khóa chuỗi để chỉ phụ thuộc nội dung cấu hình (tránh phụ thuộc theo reference)
  const cfgKey = React.useMemo(() => JSON.stringify(dataConfig), [dataConfig]);

  // Tính lại processed khi chartType/rawData/cấu hình đổi
  React.useEffect(() => {
    const next = computeProcessed(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    // ⬇️ KHÔNG Fallback về rawData nữa
    setProcessed(next && next.length ? next : []);
    // compute process summary and chartConfig
    const summary = computeProcessSummary(
      chartType,
      rawData,
      dataConfig.categoryFields
    );
    setProcessSummary(summary);
    const cfgMap = buildChartConfigFromDataConfig(dataConfig);
    setChartConfigMap(cfgMap);
  }, [chartType, rawData, cfgKey]);

  // Dispatch rawData into Redux from a single place (Provider)
  const dispatch = useDispatch();

  // Temporary debug: log dataConfig at init / whenever it changes
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug("[DashboardDataProvider] dataConfig:", dataConfig);
  }, [dataConfig]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug(
      "[DashboardDataProvider] rawData length:",
      Array.isArray(rawData) ? rawData.length : 0
    );
    dispatch(
      setRawChartDataForChart({
        chartType,
        data: Array.isArray(rawData) ? rawData : [],
      })
    );
  }, [dispatch, rawData]);

  // Nhận thay đổi từ DataTab, lưu vào map theo chartType
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
        data: processed, // ⬅️ chart nhận rỗng khi chưa chọn field
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
