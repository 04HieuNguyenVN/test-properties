import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  ChartState,
  toggleSection,
  updateFormatConfig,
} from "../../../store/chart";
import { BAR_CHART_TYPES } from "../../../constants";
import { Button } from "antd";
import { RotateCcw } from "lucide-react";

import ConfigSection from "./common/ConfigSection";
import LegendPanel from "./panels/LegendPanel";
import GridlinesPanel from "./panels/GridlinesPanel";
import SlicesPanel from "./panels/SlicesPanel";
import RotationPanel from "./panels/RotationPanel";
import AxisPanel from "./panels/AxisPanel";

const FormatConfigTab: React.FC = () => {
  const { t } = useTranslation("formatTab");
  const dispatch = useDispatch();
  const { chartType, expandedSections, chartConfigs } = useSelector(
    (s: RootState) => s.chart
  ) as ChartState;

  const formatConfig = chartConfigs[chartType].format;
  const handleToggle = (k: string) => dispatch(toggleSection(k));
  const handleUpdate = (section: string, key: string, value: any) =>
    dispatch(updateFormatConfig({ section, key, value }));

  const getAvailable = () => {
    const common = ["legend"];
    switch (chartType) {
      case "stackedColumn":
      case "clusteredColumn":
      case "stackedBar":
      case "clusteredBar":
      case "line":
      case "lineAndColumn":
        return [...common, "xAxis", "yAxis", "dataLabels", "gridlines"];
      case "pie":
        return [...common, "dataLabels", "slices", "rotation"];
      default:
        return [...common, "xAxis", "yAxis", "dataLabels", "gridlines"];
    }
  };

  const available = getAvailable();

  return (
    <div className="format-config-tab visual-tab">
      <div className="config-sections">
        {available.includes("legend") && (
          <ConfigSection
            title={t("legend.title", "Legend")}
            isExpanded={expandedSections.legend}
            onToggle={() => handleToggle("legend")}
            hasToggle
            toggleValue={formatConfig?.legend?.enabled !== false}
            onToggleChange={(v) => handleUpdate("legend", "enabled", v)}
          >
            <LegendPanel
              cfg={formatConfig.legend || {}}
              expanded={expandedSections}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </ConfigSection>
        )}

        {available.includes("gridlines") && (
          <ConfigSection
            title={t("gridlines.title", "Gridlines")}
            isExpanded={expandedSections.gridlines}
            onToggle={() => handleToggle("gridlines")}
            hasToggle
            toggleValue={formatConfig?.gridlines?.enabled !== false}
            onToggleChange={(v) => handleUpdate("gridlines", "enabled", v)}
          >
            <GridlinesPanel
              cfg={formatConfig.gridlines || {}}
              onUpdate={handleUpdate}
            />
          </ConfigSection>
        )}

        {available.includes("slices") && (
          <ConfigSection
            title={t("slices.title", "Slices")}
            isExpanded={expandedSections.slices}
            onToggle={() => handleToggle("slices")}
            hasToggle
            toggleValue={formatConfig?.slices?.enabled !== false}
            onToggleChange={(v) => handleUpdate("slices", "enabled", v)}
          >
            <SlicesPanel
              cfg={formatConfig.slices || {}}
              onUpdate={handleUpdate}
            />
          </ConfigSection>
        )}

        {available.includes("rotation") && (
          <ConfigSection
            title={t("rotation.title", "Rotation")}
            isExpanded={expandedSections.rotation}
            onToggle={() => handleToggle("rotation")}
            hasToggle
            toggleValue={formatConfig?.rotation?.enabled !== false}
            onToggleChange={(v) => handleUpdate("rotation", "enabled", v)}
          >
            <RotationPanel
              cfg={formatConfig.rotation || {}}
              onUpdate={handleUpdate}
            />
          </ConfigSection>
        )}

        {available.includes("xAxis") && (
          <ConfigSection
            title={t("axis.x", "X-axis")}
            isExpanded={expandedSections.xAxis}
            onToggle={() => handleToggle("xAxis")}
          >
            <AxisPanel
              axis="x"
              chartType={chartType}
              cfg={formatConfig.xAxis || {}}
              expanded={expandedSections}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              isBar={BAR_CHART_TYPES.includes(chartType)}
            />
          </ConfigSection>
        )}

        {available.includes("yAxis") && (
          <ConfigSection
            title={t("axis.y", "Y-axis")}
            isExpanded={expandedSections.yAxis}
            onToggle={() => handleToggle("yAxis")}
          >
            <AxisPanel
              axis="y"
              chartType={chartType}
              cfg={formatConfig.yAxis || {}}
              expanded={expandedSections}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              isBar={BAR_CHART_TYPES.includes(chartType)}
            />
          </ConfigSection>
        )}
      </div>

      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
        >
          {t("reset", "Reset to default")}
        </Button>
      </div>
    </div>
  );
};

export default FormatConfigTab;
