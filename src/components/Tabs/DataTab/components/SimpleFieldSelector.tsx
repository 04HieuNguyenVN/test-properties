import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { FIELD_OPTIONS, FIELD_ACTION_OPTIONS } from "../../../../constants";
import type { FieldItem } from "../types";

type Props = {
  field: FieldItem;
  category: string;
  onUpdate: (
    category: string,
    fieldId: number,
    key: string,
    value: string
  ) => void;
};

const SimpleFieldSelector: React.FC<Props> = ({
  field,
  category,
  onUpdate,
}) => {
  const { t } = useTranslation();
  return (
    <div className="simple-field-selector">
      <div className="selector-row">
        <div className="selector-group">
          <Select
            title={t("dataTab.fieldSelector.fieldTitle", "Chọn trường dữ liệu")}
            size="small"
            value={field.field || undefined}
            onChange={(value) => onUpdate(category, field.id, "field", value)}
            style={{ width: "100%" }}
            placeholder={t(
              "dataTab.fieldSelector.fieldPlaceholder",
              "Select field"
            )}
            options={FIELD_OPTIONS.map((opt) => ({
              ...opt,
              label: t(
                `dataTab.fieldSelector.options.${opt.value}`,
                opt.label || opt.value
              ),
            }))}
            allowClear
          />
        </div>
        <div className="selector-group">
          <Select
            title={t(
              "dataTab.fieldSelector.actionTitle",
              "Chọn hành động cho trường"
            )}
            size="small"
            value={field.action || undefined}
            onChange={(value) => onUpdate(category, field.id, "action", value)}
            style={{ width: "100%" }}
            options={FIELD_ACTION_OPTIONS.map((opt) => ({
              ...opt,
              label: t(
                `dataTab.fieldSelector.actionOptions.${opt.value}`,
                opt.label || opt.value
              ),
            }))}
            placeholder={t(
              "dataTab.fieldSelector.actionPlaceholder",
              "Select action"
            )}
            allowClear
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleFieldSelector;
