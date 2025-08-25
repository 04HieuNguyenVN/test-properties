import React from "react";
import { Card, Typography, Space, Tooltip, Button } from "antd";
import { Database, Send } from "lucide-react";

const { Title } = Typography;

type ProcessedDataPanelProps = {
  chartType: string;
  data: any[]; // dữ liệu đã xử lý/chuẩn hoá ban đầu từ Provider
  config?: any; // optional chart config (xField, yFields, legendField...)
  onUseInChart: (nextData: any[]) => void; // callback đẩy dữ liệu lên Chart
  processSummary?: { key: string; value: number }[]; // các kết quả action (sum/count/etc)
};

import "../styles/processed-data-panel.css";

const ProcessedDataPanel: React.FC<ProcessedDataPanelProps> = ({
  chartType,
  data,
  config,
  onUseInChart,
  processSummary = [],
}) => {
  const [processed, setProcessed] = React.useState<any[]>(data);
  // Build formatted JSON for display according to user's requested shapes
  const formattedForDisplay = React.useMemo(() => {
    const rows = Array.isArray(processed) ? processed : [];
    if (rows.length === 0) return [];

    const cfg = config || {};
    const hasLegend = Boolean(cfg.legendField || cfg.seriesField);

    // Guess x / series / value keys
    const sample = rows[0] as Record<string, any>;
    const allKeys = Object.keys(sample || {});
    const xKey =
      cfg.xField ||
      allKeys.find((k) => /^(x|category|month|region|type)$/i.test(k)) ||
      allKeys[0];
    const seriesKey =
      cfg.seriesField ||
      cfg.legendField ||
      (allKeys.includes("series") ? "series" : undefined);
    const valueKey =
      cfg.valueField || (allKeys.includes("value") ? "value" : undefined);

    // Determine candidate yKeys (wide-form)
    const yKeys =
      Array.isArray(cfg.yFields) && cfg.yFields.length
        ? cfg.yFields
        : allKeys.filter(
            (k) => k !== xKey && k !== seriesKey && k !== valueKey
          );

    // If legend is selected, ALWAYS emit [{type, name, value}, ...] with no aggregation
    if (hasLegend) {
      // LONG form: rows already contain series & value
      if (
        xKey &&
        seriesKey &&
        valueKey &&
        sample[xKey] !== undefined &&
        sample[seriesKey] !== undefined
      ) {
        return rows.map((r) => ({
          type: r[xKey],
          name: r[seriesKey],
          value: String(r[valueKey] ?? ""),
        }));
      }

      // WIDE form: expand each yKey to a row
      if (xKey && yKeys.length > 0) {
        const out: any[] = [];
        for (const r of rows) {
          for (const y of yKeys) {
            // skip if y equals x or series
            if (y === xKey || y === seriesKey) continue;
            const val = Number(r[y] ?? 0);
            // only include if value is non-zero (avoid showing empty series)
            if (val === 0) continue;
            out.push({ type: r[xKey], name: y, value: String(val) });
          }
        }
        return out;
      }

      // Fallback: if we cannot find series/value columns, try to pick numeric key as value
      if (xKey) {
        const out: any[] = [];
        for (const r of rows) {
          const numKey = allKeys.find(
            (k) => k !== xKey && typeof r[k] === "number"
          );
          const val = Number(r[numKey ?? valueKey] ?? 0);
          if (val === 0) continue; // skip zero entries
          out.push({
            type: r[xKey],
            name: String(r[seriesKey] ?? numKey ?? ""),
            value: String(val),
          });
        }
        return out;
      }
    }

    // No legend: show aggregated totals per x (type,value)
    if (xKey) {
      // If valueKey exists use it; else sum yKeys
      if (valueKey) {
        const map = new Map<string, number>();
        for (const r of rows) {
          const k = String(r[xKey]);
          const v = Number(r[valueKey]) || 0;
          map.set(k, (map.get(k) || 0) + v);
        }
        return Array.from(map.entries()).map(([type, value]) => ({
          type,
          value: String(value),
        }));
      }
      if (yKeys && yKeys.length > 0) {
        return rows.map((r) => {
          const sum = yKeys.reduce(
            (s: number, k: string) => s + (Number(r[k]) || 0),
            0
          );
          return { type: r[xKey], value: String(sum) };
        });
      }
    }

    return rows;
  }, [processed, config]);

  // Reset khi chartType/data gốc đổi
  React.useEffect(() => {
    setProcessed(data);
  }, [data, chartType]);

  // Tự động đẩy dữ liệu đã xử lý cho Chart mỗi khi processed thay đổi
  React.useEffect(() => {
    onUseInChart(processed);
  }, [processed, onUseInChart]);

  return (
    <Card className="data-panel processed-data-panel">
      <div className="panel-header">
        <Space>
          <Tooltip title="Xem dữ liệu đã xử lý, tổng hợp (COUNT, SUM, ...)">
            <Database size={16} />
          </Tooltip>
          <Title level={5} className="panel-title">
            PROCESSED DATA → CHART
          </Title>
          <Tooltip title="Dùng dữ liệu này cho biểu đồ">
            <Button
              size="small"
              type="primary"
              icon={<Send size={14} />}
              onClick={() => onUseInChart(processed)}
            >
              Use in chart
            </Button>
          </Tooltip>
        </Space>
      </div>

      {processSummary && processSummary.length > 0 && (
        <div className="process-summary-wrapper">
          <Card size="small" title="Process Summary">
            <ul className="process-summary-list">
              {processSummary.map((p) => (
                <li key={p.key}>
                  <strong>{p.key}:</strong> {p.value}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <div className="panel-content">
        <div className="json-display">
          <pre>{JSON.stringify(formattedForDisplay, null, 2)}</pre>
        </div>
      </div>
    </Card>
  );
};

export default ProcessedDataPanel;
