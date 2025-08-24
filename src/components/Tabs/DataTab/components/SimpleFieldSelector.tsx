import React from "react";
import { Select, Tooltip } from "antd";
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
  onRemove: (category: string, fieldId: number) => void; // ✨ mới
  options?: { label: string; value: string }[];
};

const SimpleFieldSelector: React.FC<Props> = ({
  field,
  category,
  onUpdate,
  onRemove,
  options,
}) => {
  const { t } = useTranslation("dataTab");
  return (
    <div className="simple-field-selector">
      <div
        className="selector-row"
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <div className="selector-group" style={{ flex: 1 }}>
          <Select
            title={t("selectField", "Chọn trường dữ liệu")}
            size="small"
            value={field.field || undefined} // trống khi "", undefined
            onChange={(value) => onUpdate(category, field.id, "field", value)}
            style={{ width: "100%" }}
            placeholder={t("selectField", "Select field")}
            options={(options || FIELD_OPTIONS).map(
              (opt: { label: string; value: string }) => ({
                ...opt,
                label: t(`fieldOptions.${opt.value}`, opt.label || opt.value),
              })
            )}
            allowClear
          />
        </div>
        <div className="selector-group" style={{ flex: 1 }}>
          <Select
            title={t("selectAction", "Chọn hành động cho trường")}
            size="small"
            value={field.action || undefined} // trống khi "", undefined
            onChange={(value) => onUpdate(category, field.id, "action", value)}
            style={{ width: "100%" }}
            options={FIELD_ACTION_OPTIONS.map((opt) => ({
              ...opt,
              label: t(`actionOptions.${opt.value}`, opt.label || opt.value),
            }))}
            placeholder={t("selectAction", "Select action")}
            allowClear
          />
        </div>

        {/* Nút xoá ✕ */}
        <div className="selector-actions">
          <Tooltip title={t("removeField", "Xóa trường này")}>
            <button
              type="button"
              className="remove-button"
              aria-label={t("removeField", "Xóa trường này")}
              onClick={() => onRemove(category, field.id)}
            >
              ✕
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SimpleFieldSelector;
