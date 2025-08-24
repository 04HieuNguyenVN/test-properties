// Quick test harness to validate computeProcessed logic used by DashboardDataProvider
// Run with: node scripts/check_data_mappings.js

const groupBy = (arr, key) =>
  arr.reduce((acc, it) => {
    const k = String(it?.[key]);
    (acc[k] ||= []).push(it);
    return acc;
  }, {});

const applyAgg = (rows, field, action) => {
  const nums = rows.map((r) => r?.[field]).filter((v) => typeof v === "number");
  const op = (action || "sum").toLowerCase();
  if (op === "average" || op === "avg" || op === "mean")
    return nums.length ? nums.reduce((s, v) => s + v, 0) / nums.length : 0;
  if (op === "count") return nums.length;
  if (op === "min") return nums.length ? Math.min(...nums) : 0;
  if (op === "max") return nums.length ? Math.max(...nums) : 0;
  return nums.reduce((s, v) => s + v, 0);
};

const firstField = (items) =>
  items && items.length > 0 ? items[0] : undefined;
const hasAnySelectedField = (cfg) => {
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

const computeProcessed = (chartType, rawData, cfg) => {
  if (!rawData || rawData.length === 0) return [];
  if (!hasAnySelectedField(cfg)) return [];

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

  const x = firstField(cfg.xAxis)?.field;
  const legend = firstField(cfg.legend)?.field;
  const yItems =
    (cfg.yAxis?.length ? cfg.yAxis : cfg.values) || cfg.columnY || [];
  if (!x || !yItems.length) return [];

  if (legend) {
    const gByX = groupBy(rawData, x);
    const y = firstField(yItems);
    const out = [];
    Object.entries(gByX).forEach(([xKey, rows]) => {
      const gByLegend = groupBy(rows, legend);
      const row = { [x]: xKey };
      Object.entries(gByLegend).forEach(([lg, lgRows]) => {
        row[lg] = y?.field
          ? applyAgg(lgRows, y.field, y.action)
          : lgRows.length;
      });
      out.push(row);
    });
    return out;
  }

  const g = groupBy(rawData, x);
  return Object.entries(g).map(([xKey, rows]) => {
    const row = { [x]: xKey };
    yItems.forEach((it) => {
      row[it.field] = applyAgg(rows, it.field, it.action);
    });
    return row;
  });
};

// Sample datasets
const monthly = [
  { month: "Jan", visitors: 10, revenue: 100, sales: 5 },
  { month: "Jan", visitors: 5, revenue: 50, sales: 2 },
  { month: "Feb", visitors: 20, revenue: 200, sales: 8 },
  { month: "Feb", visitors: 10, revenue: 80, sales: 3 },
  { month: "Mar", visitors: 15, revenue: 150, sales: 6 },
];

const categories = [
  { category: "A", value: 30 },
  { category: "B", value: 70 },
  { category: "A", value: 20 },
  { category: "C", value: 50 },
];

const stackedSample = [
  { category: "Q1", series: "S1", value: 5 },
  { category: "Q1", series: "S2", value: 3 },
  { category: "Q2", series: "S1", value: 4 },
  { category: "Q2", series: "S2", value: 6 },
  { category: "Q1", series: "S1", value: 1 },
];

console.log("=== LINE/COLUMN (group by x, multiple y) ===");
const cfgLine = {
  xAxis: [{ id: 1, field: "month" }],
  yAxis: [
    { id: 1, field: "visitors" },
    { id: 2, field: "revenue" },
  ],
};
console.log(computeProcessed("line", monthly, cfgLine));

console.log("\n=== CLUSTERED (legend present) ===");
const cfgClustered = {
  xAxis: [{ field: "month" }],
  legend: [{ field: "series" }],
  yAxis: [{ field: "value" }],
};
console.log(computeProcessed("clusteredColumn", stackedSample, cfgClustered));

console.log("\n=== STACKED (legend present - pivot) ===");
console.log(computeProcessed("stackedColumn", stackedSample, cfgClustered));

console.log("\n=== PIE (detail + values) ===");
const cfgPie = {
  detail: [{ field: "category" }],
  values: [{ field: "value", action: "sum" }],
};
console.log(computeProcessed("pie", categories, cfgPie));

console.log("\n=== EDGE CASES: missing fields should return [] ===");
console.log("no selection:", computeProcessed("line", monthly, {}));
console.log(
  "missing x:",
  computeProcessed("line", monthly, { yAxis: [{ field: "visitors" }] })
);
console.log(
  "missing values for pie:",
  computeProcessed("pie", categories, { detail: [{ field: "category" }] })
);

console.log("\nAll tests finished.");
