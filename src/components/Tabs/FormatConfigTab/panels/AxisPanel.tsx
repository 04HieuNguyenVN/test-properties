import React from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Select,
  InputNumber,
  Switch,
  Input,
  Button,
  Slider,
} from "antd";
import { Bold, Italic, Underline } from "lucide-react";
import { BAR_CHART_TYPES } from "../../../../constants";
import { CustomColorPicker } from "../../../common/CustomColorPicker";
import ConfigSection from "../common/ConfigSection";
import FontControls from "../common/FontControls";

type Props = {
  axis: "x" | "y";
  chartType: ChartType;
  cfg: any;
  expanded: any;
  onToggle: (k: string) => void;
  onUpdate: (section: string, key: string, value: any) => void;
  isBar: boolean;
};

type ChartType =
  | "stackedColumn"
  | "clusteredColumn"
  | "lineAndColumn"
  | "pie"
  | "line"
  | "stackedBar"
  | "clusteredBar";

const AxisPanel: React.FC<Props> = ({
  axis,
  chartType,
  cfg,
  expanded,
  onToggle,
  onUpdate,
  isBar,
}) => {
  const { t } = useTranslation("formatTab");
  const sectionKey = axis === "x" ? "xAxis" : "yAxis";
  const isLineOrColumn = [
    "stackedColumn",
    "clusteredColumn",
    "line",
    "lineAndColumn",
  ].includes(chartType);

  // Branch A: column/line (x = categories, y = numeric)
  if (!isBar && isLineOrColumn) {
    return (
      <div className="properties-container">
        {/* Range (only for Y in column/line) */}
        {axis === "y" && (
          <ConfigSection
            title={t("axis.range", "Range")}
            isExpanded={expanded.yAxisRange || false}
            onToggle={() => onToggle("yAxisRange")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.minimum", "Minimum")}
                </Typography.Text>
                <div className="range-input-group">
                  <Input
                    size="small"
                    value={cfg.rangeMin || t("axis.displayUnitsAuto", "Auto")}
                    style={{ width: 100 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.maximum", "Maximum")}
                </Typography.Text>
                <div className="range-input-group">
                  <Input
                    size="small"
                    value={cfg.rangeMax || t("axis.displayUnitsAuto", "Auto")}
                    style={{ width: 100 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="checkbox-label">
                    {t("axis.logarithmicScale", "Logarithmic scale")}
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={cfg.logarithmicScale || false}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="checkbox-label">
                    {t("axis.invertRange", "Invert range")}
                  </Typography.Text>
                  <Switch size="small" checked={cfg.invertRange || false} />
                </div>
              </div>
            </div>
          </ConfigSection>
        )}

        {/* Values */}
        <ConfigSection
          title={t("axis.values", "Values")}
          isExpanded={
            (axis === "x" ? expanded.xAxisValues : expanded.yAxisValues) ||
            false
          }
          onToggle={() =>
            onToggle(axis === "x" ? "xAxisValues" : "yAxisValues")
          }
          hasToggle
          toggleValue={cfg.valuesEnabled !== false}
        >
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">
                {t("axis.font", "Font")}
              </Typography.Text>
              <div className="font-controls">
                <Select
                  size="small"
                  value={cfg.valuesFont || "Segoe UI"}
                  style={{ width: 120 }}
                >
                  <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                  <Select.Option value="Arial">Arial</Select.Option>
                  <Select.Option value="DIN">DIN</Select.Option>
                </Select>
                <InputNumber
                  size="small"
                  value={cfg.valuesFontSize || 9}
                  min={8}
                  max={72}
                  style={{ width: 60 }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="text-format-buttons">
                <Button
                  size="small"
                  icon={<Bold size={12} />}
                  title={t("axis.bold", "Bold")}
                />
                <Button
                  size="small"
                  icon={<Italic size={12} />}
                  title={t("axis.italic", "Italic")}
                />
                <Button
                  size="small"
                  icon={<Underline size={12} />}
                  title={t("axis.underline", "Underline")}
                />
              </div>
            </div>

            {axis === "x" && (
              <>
                <CustomColorPicker
                  label={t("axis.color", "Color")}
                  value={cfg.valuesColor}
                  onChange={(c) => onUpdate("xAxis", "valuesColor", c)}
                />
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.maxHeight", "Maximum height")}
                  </Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      value={cfg.maxHeight || 25}
                      min={0}
                      max={100}
                      formatter={(v) => `${v}%`}
                      parser={(v) =>
                        Number((v ?? "").toString().replace("%", ""))
                      }
                      style={{ width: 60 }}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={cfg.maxHeight || 25}
                      style={{ flex: 1, marginLeft: 8 }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      {t("axis.concatenateLabels", "Concatenate labels")}
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={cfg.concatenateLabels || false}
                    />
                  </div>
                </div>
              </>
            )}

            {axis === "y" && (
              <>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.color", "Color")}
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={cfg.valuesColor || "#1677FF"}
                      onChange={(c) => onUpdate("yAxis", "valuesColor", c)}
                      size="small"
                      showLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.displayUnits", "Display units")}
                  </Typography.Text>
                  <Select
                    size="small"
                    value={cfg.displayUnits || "Auto"}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Auto">
                      {t("axis.displayUnitsAuto", "Auto")}
                    </Select.Option>
                    <Select.Option value="None">
                      {t("axis.displayUnitsNone", "None")}
                    </Select.Option>
                    <Select.Option value="Thousands">
                      {t("axis.displayUnitsThousands", "Thousands")}
                    </Select.Option>
                    <Select.Option value="Millions">
                      {t("axis.displayUnitsMillions", "Millions")}
                    </Select.Option>
                    <Select.Option value="Billions">
                      {t("axis.displayUnitsBillions", "Billions")}
                    </Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.valueDecimalPlaces", "Value decimal places")}
                  </Typography.Text>
                  <Select
                    size="small"
                    value={cfg.valueDecimalPlaces || "Auto"}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Auto">
                      {t("axis.valueDecimalPlacesAuto", "Auto")}
                    </Select.Option>
                    <Select.Option value="0">0</Select.Option>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                  </Select>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      {t("axis.switchAxisPosition", "Switch axis position")}
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={cfg.switchAxisPosition || false}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </ConfigSection>

        {/* Title */}
        <ConfigSection
          title={t("axis.title", "Title")}
          isExpanded={
            (axis === "x" ? expanded.xAxisTitle : expanded.yAxisTitle) || false
          }
          onToggle={() => onToggle(axis === "x" ? "xAxisTitle" : "yAxisTitle")}
          hasToggle
          toggleValue={cfg.titleEnabled !== false}
        >
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">
                {t("axis.titleText", "Title text")}
              </Typography.Text>
              <Input
                size="small"
                value={cfg.titleText || t("axis.displayUnitsAuto", "Auto")}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group">
              <Typography.Text className="form-label">
                {t("axis.style", "Style")}
              </Typography.Text>
              <Select
                size="small"
                value={
                  cfg.titleStyle || t("axis.showTitleOnly", "Show title only")
                }
                style={{ width: "100%" }}
              >
                <Select.Option value="Show title only">
                  {t("axis.showTitleOnly", "Show title only")}
                </Select.Option>
                <Select.Option value="Show title and units">
                  {t("axis.showTitleAndUnits", "Show title and units")}
                </Select.Option>
              </Select>
            </div>
            <div className="form-group">
              <Typography.Text className="form-label">
                {t("axis.font", "Font")}
              </Typography.Text>
              <div className="font-controls">
                <Select
                  size="small"
                  value={cfg.titleFont || "DIN"}
                  style={{ width: 120 }}
                >
                  <Select.Option value="DIN">DIN</Select.Option>
                  <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                  <Select.Option value="Arial">Arial</Select.Option>
                </Select>
                <InputNumber
                  size="small"
                  value={cfg.titleFontSize || 12}
                  min={8}
                  max={72}
                  style={{ width: 60 }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="text-format-buttons">
                <Button
                  size="small"
                  icon={<Bold size={12} />}
                  title={t("axis.bold", "Bold")}
                />
                <Button
                  size="small"
                  icon={<Italic size={12} />}
                  title={t("axis.italic", "Italic")}
                />
                <Button
                  size="small"
                  icon={<Underline size={12} />}
                  title={t("axis.underline", "Underline")}
                />
              </div>
            </div>
            {axis === "x" ? (
              <CustomColorPicker
                label={t("axis.color", "Color")}
                value={cfg.titleColor}
                onChange={(c) => onUpdate("xAxis", "titleColor", c)}
              />
            ) : (
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.color", "Color")}
                </Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={cfg.titleColor || "#1677FF"}
                    onChange={(c) => onUpdate("yAxis", "titleColor", c)}
                    size="small"
                    showLabel={false}
                  />
                </div>
              </div>
            )}
          </div>
        </ConfigSection>

        {/* Layout (only x in column/line) */}
        {axis === "x" && (
          <ConfigSection
            title={t("axis.layout", "Layout")}
            isExpanded={expanded.xAxisLayout || false}
            onToggle={() => onToggle("xAxisLayout")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.minCategoryWidth", "Minimum category width")}
                </Typography.Text>
                <div className="transparency-control">
                  <InputNumber
                    size="small"
                    value={cfg.minCategoryWidth || 20}
                    min={0}
                    max={100}
                    formatter={(v) => `${v}px`}
                    parser={(v) =>
                      Number((v ?? "").toString().replace("px", ""))
                    }
                    style={{ width: 60 }}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={cfg.minCategoryWidth || 20}
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        )}
      </div>
    );
  }

  // Branch B: Bar charts
  if (isBar || BAR_CHART_TYPES.includes(chartType)) {
    return (
      <div className="properties-container">
        {axis === "x" && (
          <ConfigSection
            title={t("axis.range", "Range")}
            isExpanded={expanded.xAxisRange || false}
            onToggle={() => onToggle("xAxisRange")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.minimum", "Minimum")}
                </Typography.Text>
                <div className="range-input-group">
                  <Input
                    size="small"
                    value={cfg.rangeMin || t("axis.displayUnitsAuto", "Auto")}
                    style={{ width: 100 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.maximum", "Maximum")}
                </Typography.Text>
                <div className="range-input-group">
                  <Input
                    size="small"
                    value={cfg.rangeMax || t("axis.displayUnitsAuto", "Auto")}
                    style={{ width: 100 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="checkbox-label">
                    {t("axis.logarithmicScale", "Logarithmic scale")}
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={cfg.logarithmicScale || false}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        )}

        <ConfigSection
          title={t("axis.values", "Values")}
          isExpanded={
            (axis === "x" ? expanded.xAxisValues : expanded.yAxisValues) ||
            false
          }
          onToggle={() =>
            onToggle(axis === "x" ? "xAxisValues" : "yAxisValues")
          }
          hasToggle
          toggleValue={cfg.valuesEnabled !== false}
        >
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">
                {t("axis.font", "Font")}
              </Typography.Text>
              <div className="font-controls">
                <Select
                  size="small"
                  value={cfg.valuesFont || "Segoe UI"}
                  style={{ width: 120 }}
                >
                  <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                  <Select.Option value="Arial">Arial</Select.Option>
                  <Select.Option value="DIN">DIN</Select.Option>
                </Select>
                <InputNumber
                  size="small"
                  value={cfg.valuesFontSize || 9}
                  min={8}
                  max={72}
                  style={{ width: 60 }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="text-format-buttons">
                <Button
                  size="small"
                  icon={<Bold size={12} />}
                  title={t("axis.bold", "Bold")}
                />
                <Button
                  size="small"
                  icon={<Italic size={12} />}
                  title={t("axis.italic", "Italic")}
                />
                <Button
                  size="small"
                  icon={<Underline size={12} />}
                  title={t("axis.underline", "Underline")}
                />
              </div>
            </div>

            {axis === "x" ? (
              <>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.color", "Color")}
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={cfg.valuesColor || "#1677FF"}
                      onChange={(c) => onUpdate("xAxis", "valuesColor", c)}
                      size="small"
                      showLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.units", "Units")}
                  </Typography.Text>
                  <Select
                    size="small"
                    value={cfg.valuesUnits || "Auto"}
                    style={{ width: "100%" }}
                    options={[
                      {
                        label: t("axis.displayUnitsAuto", "Auto"),
                        value: "Auto",
                      },
                      {
                        label: t("axis.displayUnitsNone", "None"),
                        value: "None",
                      },
                      {
                        label: t("axis.unitsHundreds", "Hundreds"),
                        value: "Hundreds",
                      },
                      {
                        label: t("axis.displayUnitsThousands", "Thousands"),
                        value: "Thousands",
                      },
                      {
                        label: t("axis.displayUnitsMillions", "Millions"),
                        value: "Millions",
                      },
                      {
                        label: t("axis.displayUnitsBillions", "Billions"),
                        value: "Billions",
                      },
                      {
                        label: t("axis.unitsTrillions", "Trillions"),
                        value: "Trillions",
                      },
                    ]}
                  />
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.precision", "Precision")}
                  </Typography.Text>
                  <InputNumber
                    size="small"
                    value={cfg.precision || 0}
                    min={0}
                    max={4}
                    onChange={(v) => onUpdate("xAxis", "precision", v)}
                    style={{ width: "100%" }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.color", "Color")}
                  </Typography.Text>
                  <div className="color-picker-row">
                    <CustomColorPicker
                      label=""
                      value={cfg.valuesColor || "#1677FF"}
                      onChange={(c) => onUpdate("yAxis", "valuesColor", c)}
                      size="small"
                      showLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Typography.Text className="form-label">
                    {t("axis.maxHeight", "Maximum height")}
                  </Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      value={cfg.maxHeight || 25}
                      min={0}
                      max={100}
                      formatter={(v) => `${v}%`}
                      parser={(v) =>
                        Number((v ?? "").toString().replace("%", ""))
                      }
                      style={{ width: 60 }}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={cfg.maxHeight || 25}
                      style={{ flex: 1, marginLeft: 8 }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox-row">
                    <Typography.Text className="checkbox-label">
                      {t("axis.concatenateLabels", "Concatenate labels")}
                    </Typography.Text>
                    <Switch
                      size="small"
                      checked={cfg.concatenateLabels || false}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </ConfigSection>

        {/* Layout (only y in bar branch) */}
        {axis === "y" && (
          <ConfigSection
            title={t("axis.layout", "Layout")}
            isExpanded={expanded.yAxisLayout || false}
            onToggle={() => onToggle("yAxisLayout")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  {t("axis.minCategoryWidth", "Minimum category width")}
                </Typography.Text>
                <div className="transparency-control">
                  <InputNumber
                    size="small"
                    value={cfg.minCategoryWidth || 20}
                    min={0}
                    max={100}
                    formatter={(v) => `${v}px`}
                    parser={(v) =>
                      Number((v ?? "").toString().replace("px", ""))
                    }
                    style={{ width: 60 }}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={cfg.minCategoryWidth || 20}
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        )}

        {/* Title */}
        <ConfigSection
          title="Title"
          isExpanded={
            (axis === "x" ? expanded.xAxisTitle : expanded.yAxisTitle) || false
          }
          onToggle={() => onToggle(axis === "x" ? "xAxisTitle" : "yAxisTitle")}
          hasToggle
          toggleValue={cfg.titleEnabled !== false}
        >
          <div className="section-content">
            <div className="form-group">
              <Typography.Text className="form-label">
                Title text
              </Typography.Text>
              <Input
                size="small"
                value={cfg.titleText || "Auto"}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group">
              <Typography.Text className="form-label">Style</Typography.Text>
              <Select
                size="small"
                value={cfg.titleStyle || "Show title only"}
                style={{ width: "100%" }}
              >
                <Select.Option value="Show title only">
                  Show title only
                </Select.Option>
                <Select.Option value="Show title and units">
                  Show title and units
                </Select.Option>
              </Select>
            </div>
            <FontControls
              config={cfg}
              section={sectionKey}
              onUpdate={onUpdate}
            />
          </div>
        </ConfigSection>
      </div>
    );
  }

  return (
    <div className="section-content">
      <FontControls config={cfg} section={sectionKey} onUpdate={onUpdate} />
    </div>
  );
};

export default AxisPanel;
